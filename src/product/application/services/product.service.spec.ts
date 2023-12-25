import { ProductService } from 'src/product/domain/interfaces/product.service.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductServiceImpl } from '../services/product.service';
import { CreateProductDto } from '../dto/product.create.dto';
import {
  productCreateDataFake as registerCreateDataFake,
  productDataFake as registerDataFake,
  productUpdateDataFake as registerUpdateDataFake,
} from 'src/test/mock/product.sql.fake';
import { PasswordHelper } from 'src/auth/infrastructure/helpers/PasswordHelper';
import { FilesModule } from 'src/files/infrastructure/files.module';
import { MailModule } from 'src/email/infrastructure/email.module';
import { CoreModule } from 'src/shared/core.module';
import { ConfigModule } from '@nestjs/config';
import { EmailProvider } from 'src/shared/infrastructure/email/email.provider';
import { ProductRepositoryImpl } from 'src/product/infrastructure/sql/repositories/product.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/infrastructure/sql/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductRepository } from 'src/product/domain/interfaces/product.repository.interface';

describe('ProductsController', () => {
  let productsService: ProductService;
  let productsRepository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CoreModule,
        ConfigModule,
        EmailProvider,
        FilesModule,
        MailModule,
      ],
      providers: [
        {
          provide: getRepositoryToken(ProductEntity),
          useClass: Repository,
        },
        PasswordHelper,
        {
          provide: 'ProductRepository',
          useClass: ProductRepositoryImpl,
        },
        {
          provide: 'ProductService',
          useClass: ProductServiceImpl,
        },
      ],
    }).compile();

    productsRepository = module.get<ProductRepository>('ProductRepository');
    productsService = module.get<ProductService>('ProductService');
  });

  describe('createProduct', () => {
    it('should return the created product', async () => {
      // Arrange
      const productDto: CreateProductDto = registerCreateDataFake[0];
      const createdProduct = { id: 1, ...productDto };
      jest
        .spyOn(productsRepository, 'create')
        .mockResolvedValue({ ...createdProduct, password: undefined });

      // Act
      const result = await productsService.create(productDto, false);

      // Assert
      expect(result).toEqual({ ...createdProduct, password: undefined });
    });
  });

  describe('getProduct', () => {
    it('should return the requested product by ID', async () => {
      // Arrange
      const product = registerDataFake[0];
      jest.spyOn(productsRepository, 'findById').mockResolvedValue(product);

      // Act
      const result = await productsService.findById(product.id);

      // Assert
      expect(result).toEqual(product);
    });
    it('should return paginated', async () => {
      // Arrange
      jest.spyOn(productsRepository, 'findPaginated').mockResolvedValue({
        total: registerDataFake.length,
        data: registerDataFake,
      });

      // Act
      const result = await productsService.findPaginated({
        page: 0,
        count: 10,
        sort: '',
        sortOrder: 1,
        search: '',
      });

      // Assert
      expect(result).toEqual({
        total: registerDataFake.length,
        data: registerDataFake,
      });
    });
  });

  describe('updateProduct', () => {
    it('should return the updated product', async () => {
      // Arrange
      const productId = 1;
      const updatedProductDto = registerUpdateDataFake[0];
      const updatedProduct = registerDataFake[0];
      jest.spyOn(productsRepository, 'update').mockResolvedValue(updatedProduct);

      // Act
      const result = await productsService.update(productId, updatedProductDto);

      // Assert
      expect(result).toEqual(updatedProduct);
    });
  });
});
