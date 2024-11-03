import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.css'],
})
export class TransactionDialogComponent {
  transactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransactionDialogComponent>,
    private transactionService: TransactionService,
  ) {
    this.transactionForm = this.fb.group({
      valor: ['', [Validators.required, Validators.min(0)]],
      data: ['', Validators.required],
      tipo: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const newTransaction = {
        valor: this.transactionForm.value.valor,
        data: this.formatDate(this.transactionForm.value.data),
        tipo: Number(this.transactionForm.value.tipo),
        categoria: Number(this.transactionForm.value.categoria),
      };

      this.transactionService.putTransacao(newTransaction).subscribe(
        (response) => {
          this.dialogRef.close(newTransaction);
        },
        (error) => {
          console.error('Erro ao adicionar transação', error);
        }
      );
    }
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
