import { CreateTransactionDto } from '@/dtos/transaction.dto';
import { Product } from '@/entity/products.entity';
import { Transaction } from '@/entity/transaction.entity';
import { User } from '@/entity/users.entity';
import { HttpException } from '@/exceptions/HttpException';
import { getConnection, getRepository } from 'typeorm';

export class TransactionService {
  private readonly transactions = Transaction;

  makeOrder = async (input: CreateTransactionDto) => {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    try {
      const { productId, userId, buyPrice } = input;
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const [product, user] = await Promise.all([getRepository(Product).findOne(productId), getRepository(User).findOne(userId)]);
      if (!product || !user) throw new HttpException(404, 'not found');

      const newTransaction = queryRunner.manager.create(Transaction, { product, user, buyPrice });
      const savedTransaction = await queryRunner.manager.save(newTransaction);
      await queryRunner.commitTransaction();
      return savedTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(500, error);
    } finally {
      await queryRunner.release();
    }
  };
}
