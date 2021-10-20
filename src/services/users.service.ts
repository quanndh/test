import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { User } from '@/entity/users.entity';
import { createPaginationObject, PaginationArgs } from '@/interfaces/pagination';
import { Transaction } from '@/entity/transaction.entity';

class UserService {
  public users = User;
  public transactions = Transaction;

  getUserTransaction = async (id: number, args: PaginationArgs) => {
    const { limit = 10, page = 1 } = args;
    const transactionRepository = getRepository(this.transactions);
    const [items, total] = await transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.user', 'user')
      .leftJoinAndSelect('transaction.product', 'product')
      .where('transaction.userId = :id', { id })
      .take(limit)
      .skip(limit * (page - 1))
      .orderBy('transaction.createdAt', 'DESC')
      .getManyAndCount();
    return createPaginationObject(items, total, page, limit);
  };

  public async findAllUser(): Promise<User[]> {
    const userRepository = getRepository(this.users);
    const users: User[] = await userRepository.find();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await userRepository.save({ ...userData, password: hashedPassword });

    return createUserData;
  }
}

export default UserService;
