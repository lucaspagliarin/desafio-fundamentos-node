import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      const isHigherThenBalance = value > balance.total;

      if (isHigherThenBalance) {
        throw Error('Insuficient Balance');
      }
    }

    const transaction = this.transactionsRepository.create({
      value,
      title,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
