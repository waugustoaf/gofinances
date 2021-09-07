interface Category {
  name: string;
  icon: string;
}

export interface ITransactionDTO {
  id?: string;
  type: 'negative' | 'positive';
  title: string;
  amount: number | string;
  category?: Category;
  category_key: string;
  date: string;
}
