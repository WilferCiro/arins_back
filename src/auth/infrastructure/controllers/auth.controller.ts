import { Body, Controller, HttpCode, Inject, Post } from "@nestjs/common";
import { LoginAuthDto } from "src/auth/application/dto/auth.login.dto";
import { AuthService } from "src/auth/domain/interfaces/auth.service.interface";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject("AuthService") private readonly authService: AuthService
  ) {}

  @Post("/login")
  @HttpCode(200)
  async login(@Body() auth: LoginAuthDto): Promise<{ token: string | null }> {
    const token = await this.authService.login(auth);
    return { token };
  }
}
