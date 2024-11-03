import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  transacoes: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  sortOrderData: 'asc' | 'desc' = 'desc';
  errorMessage: string | null = null;
  displayedColumns: string[] = [
    'tipo',
    'valor',
    'data',
    'categoria',
    'actions',
  ];

  totalReceitas: number = 0;
  totalDespesas: number = 0;
  quantidadeTransacoes: number = 0;

  constructor(
    private transactionService: TransactionService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTransaction();
  }

  getTransaction(orderData: 'asc' | 'desc' = 'desc'): void {
    this.transactionService.getTransacoes(orderData).subscribe((data) => {
      this.transacoes = data.map((transacao: Transaction) => ({
        ...transacao,
        valor: transacao.valor,
      }));
      this.calculaTotais();
    });
  }

  toggleSortOrderByDate(): void {
    this.sortOrderData = this.sortOrderData === 'desc' ? 'asc' : 'desc';
    this.getTransaction(this.sortOrderData);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.transacoes.push(result);
        this.getTransaction();
      }
    });
  }

  calculaTotais(): void {
    this.totalReceitas = 0;
    this.totalDespesas = 0;
    this.quantidadeTransacoes = this.transacoes.length;

    this.transacoes.forEach((transacao) => {
      const valorNumerico = parseFloat(transacao.valor);

      console.log('Transação: ', transacao);
      if (transacao.tipo.descricao === 'Receita') {
        this.totalReceitas += valorNumerico;
      } else if (transacao.tipo.descricao === 'Despesa') {
        this.totalDespesas += valorNumerico;
      }
    });

    console.log('Total Receitas: ', this.totalReceitas);
    console.log('Total Despesas: ', this.totalDespesas);
  }

  deleteTransaction(id: number) {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      this.transactionService.deleteTransaction(id).subscribe(
        () => {
          this.transacoes = this.transacoes.filter((t) => t.id !== id); // Atualiza a lista localmente
        },
        (error) => {
          this.errorMessage = 'Erro ao excluir a transação';
          console.error('Erro ao excluir transação:', error);
        }
      );
    }
  }
}
