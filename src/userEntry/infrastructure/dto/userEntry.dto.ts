export interface UserEntryDto {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  cellphone: string;
  shangePassword: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
