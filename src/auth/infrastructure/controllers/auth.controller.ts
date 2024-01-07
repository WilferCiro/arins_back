import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  UseGuards,
} from "@nestjs/common";
import { LoginAuthDto } from "src/auth/application/dto/auth.login.dto";
import { AuthService } from "src/auth/domain/interfaces/auth.service.interface";
import { ApiKeyGuard } from "src/shared/infrastructure/middleware/api_key.middleware";
import { AuthGuard } from "src/shared/infrastructure/middleware/auth.middleware";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject("AuthService") private readonly authService: AuthService
  ) {}

  @Post("/login")
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  async login(@Body() auth: LoginAuthDto): Promise<{ token: string | null }> {
    const token = await this.authService.login(auth);
    return { token };
  }

  @Post("/signup")
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  async signup(@Body() auth: LoginAuthDto): Promise<{ token: string | null }> {
    //const token = await this.authService.login(auth);
    //return { token };
    return null;
  }

  @Post("/refetch")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async refetch(
    @Body() { company_id }: { company_id?: string }
  ): Promise<{ token: string | null }> {
    const token = await this.authService.refetchToken(company_id);
    return { token };
  }
}
