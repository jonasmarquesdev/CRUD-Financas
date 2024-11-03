import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Método para listar todas as transações
  getTransacoes(orderData: 'asc' | 'desc' = 'desc'): Observable<Transaction[]> {
    const params = new HttpParams().set('orderData', orderData);
    return this.http.get<any>(this.apiUrl, { params });
  }

  putTransacao(transacao: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, transacao);
  }

  deleteTransaction(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Transação com id ${id} excluída`)),
      catchError((error) => {
        console.error('Erro ao excluir a transação:', error);
        return of(null);
      })
    );
  }
}
