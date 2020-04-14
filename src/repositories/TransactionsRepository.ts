import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const positive = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const negative = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const positiveSum = positive.reduce((accumulator, transaction) => {
      return accumulator + transaction.value;
    }, 0);

    const negativeSum = negative.reduce((accumulator, transaction) => {
      return accumulator + transaction.value;
    }, 0);

    const balanceObject = {
      income: positiveSum,
      outcome: negativeSum,
      total: positiveSum - negativeSum,
    };

    return balanceObject;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
