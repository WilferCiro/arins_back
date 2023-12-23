// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { CompanyServiceImpl } from '../application/services/company.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from './mongodb/schemas/company.schema';
import { CompanyRepositoryImpl } from './mongodb/repositories/company.repository';

const providers: Provider[] = [
  {
    provide: 'CompanyRepository',
    useClass: CompanyRepositoryImpl,
  },
  {
    provide: 'CompanyService',
    useClass: CompanyServiceImpl,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Company", schema: CompanySchema }]),
  ],
  controllers: [CompanyController],
  providers: providers,
})
export class CompaniesModule {}
