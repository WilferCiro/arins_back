import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/auth/domain/interfaces/auth.service.interface";
import { LoginAuthDto } from "src/auth/application/dto/auth.login.dto";
import { UserService } from "src/user/domain/interfaces/user.service.interface";
import { PasswordHelper } from "src/shared/infrastructure/helpers/PasswordHelper";
import { User } from "src/user/domain/entities/user.type";
import { CompanyService } from "src/company/domain/interfaces/company.service.interface";
import { RequestContextService } from "src/modules/context/domain/interfaces/context.service.interface";
import { TokenPayloadType } from "src/auth/domain/types/token_payload.type";
import { DomainSignUpAuthDto } from "src/auth/domain/dto/signup.dto";

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject("UserService") private readonly userService: UserService,
    @Inject("CompanyService") private readonly companiesService: CompanyService,
    private jwtService: JwtService,
    private passwordHelper: PasswordHelper,
    @Inject("RequestContext")
    private readonly contextService: RequestContextService
  ) {}

  async login(auth: LoginAuthDto): Promise<string | null> {
    const user = await this.userService.getByEmail(auth.email);
    if (!user) {
      throw new UnauthorizedException("El correo no existe");
    }
    const isMatch = await this.passwordHelper.compare(
      auth.password,
      user?.password
    );
    if (!isMatch) {
      throw new UnauthorizedException("La contraseña no coinciden");
    }
    const token = this.formatToken(user);
    return token;
  }
  
  async signup(data: DomainSignUpAuthDto): Promise<string | null> {
    const userExists = await this.userService.getByEmail(data.email);
    if(userExists) {
      throw new UnauthorizedException("El email ya existe");
    }
    const password = await this.passwordHelper.encrypt(data.password);
    const user = await this.userService.create({...data, active: true, password, shangePassword: false });
    if (!user) {
      throw new UnauthorizedException("No se pudo realizar el registro");
    }
    const token = this.formatToken(user);
    return token;
  }

  async refetchToken(company_id?: string): Promise<string | null> {
    const payload = this.contextService.get<TokenPayloadType>("payload");
    const user = await this.userService.findById(payload._id);
    if (!user) {
      throw new UnauthorizedException("El usuario no existe");
    }
    const token = this.formatToken(user, company_id);
    return token;
  }

  private formatToken = async (user: User, company_id?: string) => {
    const companies = await this.companiesService.getByAdminId(
      user._id.toString()
    );
    const payload = {
      _id: user?._id,
      sub: user?._id,
      exp: Date.now() + 345600000, // add 4 days
      companies: companies.map((company, index: number) => {
        return {
          _id: company._id.toString(),
          name: company.name,
          active:
            company._id.toString() === company_id ||
            (!company_id && index === 0),
        };
      }),
    };
    const token = await this.jwtService.signAsync(payload);
    return token;
  };
}
