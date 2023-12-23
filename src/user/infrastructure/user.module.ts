// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from '@nestjs/common';
import { UserController } from '../application/controllers/user.controller';
import { UserServiceImpl } from '../application/services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './mongodb/schemas/user.schema';
import { UserRepositoryImpl } from './mongodb/repositories/user.repository';

const providers: Provider[] = [
  {
    provide: 'UserRepository',
    useClass: UserRepositoryImpl,
  },
  {
    provide: 'UserService',
    useClass: UserServiceImpl,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: providers,
})
export class UsersModule {}
