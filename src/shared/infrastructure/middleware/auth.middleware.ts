import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { TokenPayloadType } from "src/auth/domain/types/token_payload.type";
import { RequestContextService } from "src/modules/context/domain/interfaces/context.service.interface";
import { UserService } from "src/user/domain/interfaces/user.service.interface";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject("RequestContext")
    private readonly contextService: RequestContextService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject("UserService") private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get("SECRET_JWT"),
      });
      this.contextService.set<TokenPayloadType>("payload", payload);
      const currentCompany = payload.companies.filter(
        (company) => company.active
      )?.[0]?._id;
      this.contextService.set<string | undefined>("company", currentCompany);
      const user = await this.userService.findById(payload._id);
      if (!payload._id || !user) {
        throw new UnauthorizedException();
      }
      request["user"] = { ...user, password: undefined };
      const valid = !!user;
      return valid;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
