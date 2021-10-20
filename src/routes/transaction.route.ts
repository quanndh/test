import { TransactionController } from '@/controllers/transaction.controller';
import { Router } from 'express';

export class TransactionRoute {
  public path = '/transactions';
  public router = Router();
  private readonly transactionController = new TransactionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.transactionController.makeOrder);
  }
}
