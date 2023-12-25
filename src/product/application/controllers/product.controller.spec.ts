import { ProductService } from 'src/product/domain/interfaces/product.service.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
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
import { ProductMapper } from '../mapper/product.mapper';

describe('ProductsController', () => {
  let productsController: ProductController;
  let productsService: ProductService;
  let mapper: ProductMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
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
    mapper = new ProductMapper();
    productsController = module.get<ProductController>(ProductController);
    productsService = module.get<ProductService>('ProductService');
  });

  describe('createProduct', () => {
    it('should return the created product', async () => {
      // Arrange
      const productDto: CreateProductDto = registerCreateDataFake[0];
      const createdProduct = { id: 1, ...productDto };
      jest.spyOn(productsService, 'create').mockResolvedValue(createdProduct);

      // Act
      const result = await productsController.create(productDto);

      // Assert
      expect(result).toEqual({ ...createdProduct, password: undefined });
    });
  });

  describe('getProduct', () => {
    it('should return the requested product by ID', async () => {
      // Arrange
      const product = registerDataFake[0];
      jest.spyOn(productsService, 'findById').mockResolvedValue(product);

      // Act
      const result = await productsController.findById(product.id);
      // Assert
      expect(result).toEqual(mapper.toDto(product));
    });
    it('should return paginated', async () => {
      // Arrange
      jest.spyOn(productsService, 'findPaginated').mockResolvedValue({
        total: registerDataFake.length,
        data: registerDataFake,
      });

      // Act
      const result = await productsController.findPaginated({
        page: 0,
        count: 10,
        sort: '',
        sortOrder: 1,
        search: '',
      });

      // Assert
      expect(result).toEqual({
        total: registerDataFake.length,
        data: registerDataFake.map((r) => mapper.toDto(r)),
      });
    });
  });

  describe('updateProduct', () => {
    it('should return the updated product', async () => {
      // Arrange
      const productId = 1;
      const updatedProductDto = registerUpdateDataFake[0];
      const updatedProduct = registerDataFake[0];
      jest.spyOn(productsService, 'update').mockResolvedValue(updatedProduct);

      // Act
      const result = await productsController.update(productId, updatedProductDto);

      // Assert
      expect(result).toEqual(mapper.toDto(updatedProduct));
    });
  });
});
