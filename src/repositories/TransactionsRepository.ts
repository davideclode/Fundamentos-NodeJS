import Transaction from '../models/Transaction';

// Criando interface para transactionRepository
interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // Pegando os valores de income para somar
    const TotalIncome = this.transactions.reduce((soma, transaction) => {
      if (transaction.type === 'income') {
        /* Eu que preferi converter o tipo aqui */
        return soma + Number(transaction.value);
      }
      return soma;
    }, 0);
    // Pegando os valores de outcome para somar
    const TotalOutcome = this.transactions.reduce((soma, transaction) => {
      if (transaction.type === 'outcome') {
        /* Eu que preferi converter o tipo aqui */
        return soma + Number(transaction.value);
      }
      return soma;
    }, 0);

    // Pegando os valores de income e de outcome para poder retorná-las
    const balance = {
      income: TotalIncome,
      outcome: TotalOutcome,
      total: TotalIncome - TotalOutcome,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    if (type === 'outcome') {
      // Recebendo o tipo para verificar se é válido
      const balance = this.getBalance();
      // Verificando se o tipo tem valor válido
      if (balance.total < value) {
        throw Error(' Sorry!!! The balance can not be negative ');
      }
    }
    // Colocamos/salvamos o "transaction" dentro de "transactions"
    this.transactions.push(transaction);

    // Agora enviamos a transação efetuada/criada
    return transaction;
  }
}

export default TransactionsRepository;
