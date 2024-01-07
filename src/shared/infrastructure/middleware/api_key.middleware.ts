import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import * as crypto from "crypto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private usedKeys = [];
  constructor(private configService: ConfigService) {}

  decryptWithPrivateKey(encryptedData) {
    const privateKey = this.configService.get("PRIVATE_KEY");
    const bufferPrivateKey = Buffer.from(privateKey, "utf8");
    const bufferEncryptedData = Buffer.from(encryptedData, "base64");

    const decryptedData = crypto.privateDecrypt(
      {
        key: bufferPrivateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      bufferEncryptedData
    );

    return decryptedData.toString("utf8");
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (this.usedKeys.includes(token)) {
        throw new UnauthorizedException();
      }
      this.usedKeys.unshift(token);
      this.usedKeys = this.usedKeys.slice(0, 20);
      const decryptedToken = this.decryptWithPrivateKey(token);
      const keyword = this.configService.get("KEY_KEYWORD");
      const check = `${keyword}-${new Date().getMinutes()}`;
      const check2 = `${keyword}-${new Date().getMinutes() - 1}`; // posible desface con el cliente
      return check === decryptedToken || check2 === decryptedToken;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const api_key = request.headers["x-api-key"] as string | undefined;
    return api_key;
  }
}
