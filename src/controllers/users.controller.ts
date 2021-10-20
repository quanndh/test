import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import userService from '@services/users.service';
import { User } from '@/entity/users.entity';
import { PaginationArgs } from '@/interfaces/pagination';

class UsersController {
  public userService = new userService();

  getUserTransactionn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const args: PaginationArgs = req.query;
      const { id } = req.params;
      const userTransaction = await this.userService.getUserTransaction(Number(id), args);

      res.status(200).json({ data: userTransaction, message: 'findAllTrannsaction' });
    } catch (error) {
      next(error);
    }
  };

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
