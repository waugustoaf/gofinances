interface Category {
  name: string;
  icon: string;
}

export interface ITransactionDTO {
  id?: string;
  type: 'negative' | 'positive';
  title: string;
  amount: string;
  category: Category;
  date: string;
}
