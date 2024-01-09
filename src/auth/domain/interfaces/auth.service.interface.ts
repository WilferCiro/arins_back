import { LoginAuthDto } from "src/auth/application/dto/auth.login.dto";
import { SignUpAuthDto } from "src/auth/application/dto/auth.signup.dto";
import { DomainSignUpAuthDto } from "../dto/signup.dto";

export interface AuthService {
  login(auth: LoginAuthDto): Promise<string | null>;
  signup(data: DomainSignUpAuthDto): Promise<string | null>;

  refetchToken(company_id?: string): Promise<string | null>;
}
