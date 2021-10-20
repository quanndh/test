import { ProductDto } from '@/dtos/products.dto';
import { HttpException } from '@/exceptions/HttpException';
import { ProductPaginationArgs } from '@dtos/products.args';
import { Product } from '@entity/products.entity';
import { createPaginationObject } from '@interfaces/pagination';
import { getRepository } from 'typeorm';

export class ProductService {
  private readonly products = Product;

  pagination = async (args: ProductPaginationArgs) => {
    const { search, limit = 10, page = 1 } = args;

    const productRepository = getRepository(this.products);
    const query = productRepository.createQueryBuilder('products');

    if (search && search.trim()) {
      query.andWhere('products.name = :search', { search });
    }

    const [items, total] = await query
      .take(limit)
      .skip(limit * (page - 1))
      .orderBy('products.createdAt', 'DESC')
      .getManyAndCount();

    return createPaginationObject(items, total, page, limit);
  };

  create = async (input: ProductDto) => {
    const productRepository = getRepository(this.products);
    const product = await productRepository.create(input);
    return await productRepository.save(product);
  };

  update = async (id: number, input: ProductDto) => {
    const productRepository = getRepository(this.products);
    const product = await productRepository.findOne(id);
    if (!product) throw new HttpException(404, 'not found');
    const updatedRes = await productRepository.update(id, { ...product, ...input });
    return updatedRes.affected === 1;
  };

  delete = async (id: number) => {
    const productRepository = getRepository(this.products);
    const product = await productRepository.findOne(id);
    if (!product) throw new HttpException(404, 'not found');
    const updatedRes = await productRepository.softDelete(id);
    return updatedRes.affected === 1;
  };
}
