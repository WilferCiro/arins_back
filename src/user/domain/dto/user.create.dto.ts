export class DomainCreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  cellphone?: string;
  active: boolean;
  password?: string;
  shangePassword?: boolean;
}
