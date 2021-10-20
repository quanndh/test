import { ProductDto } from '@/dtos/products.dto';
import { ProductPaginationArgs } from '@dtos/products.args';
import { ProductService } from '@services/products.service';
import { NextFunction, Request, Response } from 'express';

export class ProductController {
  private readonly productService = new ProductService();

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const args: ProductPaginationArgs = req.query;
      const data = await this.productService.pagination(args);
      res.status(200).json({
        message: 'success',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input: ProductDto = req.body;
      const data = await this.productService.create(input);
      res.status(200).json({
        message: 'success',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input: ProductDto = req.body;
      const { id } = req.params;
      const data = await this.productService.update(Number(id), input);
      res.status(200).json({
        message: 'success',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = await this.productService.delete(Number(id));
      res.status(200).json({
        message: 'success',
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
