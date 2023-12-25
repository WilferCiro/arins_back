export interface UserDto {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  cellphone: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
