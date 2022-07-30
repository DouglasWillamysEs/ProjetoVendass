import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StoreSummary } from './store-summary';

@Injectable({
  providedIn: 'root'
})
export class StoreSummaryService {

  getStoreSummary(): Observable<StoreSummary[]> {
    return of([
      { title: "Total de Vendas", value: "9465", isIncrease: true, color: "primary", percentValue: "0.5383", icon: "payments", isCurrency: true },
      { title: "Valor Médio do Pedido", value: "465", isIncrease: false, color: "accent", percentValue: "0.2544", icon: "local_atm", isCurrency: true },
      { title: "Total de Pedidos", value: "243", isIncrease: true, color: "warn", percentValue: "0.4565", icon: "shopping_cart", isCurrency: false },
      { title: "Clientes Recorrentes", value: "35", isIncrease: false, color: "primary", percentValue: "0.8361", icon: "portrait", isCurrency: false }
    ]);
  }

  constructor() { }
}
