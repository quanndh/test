import { CreateTransactionDto } from '@/dtos/transaction.dto';
import { TransactionService } from '@/services/transaction.service';
import { NextFunction, Request, Response } from 'express';

export class TransactionController {
  private readonly transactionService = new TransactionService();

  makeOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input: CreateTransactionDto = req.body;
      const transaction = await this.transactionService.makeOrder(input);
      res.status(201).json({
        message: 'success',
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  };
}
