import { ProductController } from '../controllers/product.controller';
import { Routes } from '../interfaces/routes.interface';
import { Router } from 'express';

class ProductRoute implements Routes {
  public path = '/products';
  public router = Router();
  private readonly productController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.productController.getProducts);
    this.router.post(`${this.path}`, this.productController.create);
    this.router.put(`${this.path}/:id`, this.productController.update);
    this.router.delete(`${this.path}/:id`, this.productController.delete);
  }
}

export default ProductRoute;
