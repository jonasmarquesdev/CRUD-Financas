export interface Transaction {
  id: number;
  valor: string;
  data: string;
  tipo: { id: number; descricao: string };
  categoria: { id: number; descricao: string };
}
