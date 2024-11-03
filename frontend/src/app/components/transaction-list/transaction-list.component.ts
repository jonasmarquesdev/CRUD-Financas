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
  transacoesValues: Transaction[] = [];
  tipos: any[] = [
    { id: 0, descricao: 'Nennhum' },
    { id: 1, descricao: 'Receita' },
    { id: 2, descricao: 'Despesa' },
  ];
  selectedTipoId: number | undefined = undefined;
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
    this.getTransactionsValues();
    this.getTransaction();
  }

  getTransaction(orderData: 'asc' | 'desc' = 'desc'): void {
    this.transactionService
      .getTransacoes(orderData, this.selectedTipoId)
      .subscribe((data) => {
        this.transacoes = data.map((transacao: Transaction) => ({
          ...transacao,
          valor: transacao.valor,
        }));
        this.calculaTotais();
      });
  }

  getTransactionsValues(): void {
    this.transactionService.getTransacoes().subscribe((data) => {
      this.transacoesValues = data.map((transacao: Transaction) => ({
        ...transacao,
        valor: transacao.valor,
      }));
      this.calculaTotais();
    });
  }

  onFilterChange() {
    this.getTransaction();
  }

  openDialog(transacao?: Transaction): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '600px',
      data: transacao,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (transacao) {
          const index = this.transacoes.findIndex((t) => t.id === result.id);
          if (index > -1) {
            this.transacoes[index] = result;
          }
        } else {
          this.transacoes.push(result);
        }
        this.getTransaction();
      }
    });
  }

  calculaTotais(): void {
    this.totalReceitas = 0;
    this.totalDespesas = 0;
    this.quantidadeTransacoes = this.transacoes.length;

    this.transacoesValues.forEach((transacao) => {
      const valorNumerico = parseFloat(transacao.valor);

      if (transacao.tipo.descricao === 'Receita') {
        this.totalReceitas += valorNumerico;
      } else if (transacao.tipo.descricao === 'Despesa') {
        this.totalDespesas += valorNumerico;
      }
    });
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
