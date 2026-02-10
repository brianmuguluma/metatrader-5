import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./history/history.page').then((m) => m.HistoryPage),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: 'quotes',
    loadComponent: () =>
      import('./quotes/quotes.page').then((m) => m.QuotesPage),
  },
  {
    path: 'trade',
    loadComponent: () => import('./trade/trade.page').then((m) => m.TradePage),
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./history/history.page').then((m) => m.HistoryPage),
  },
  {
    path: 'chart',
    loadComponent: () => import('./chart/chart.page').then((m) => m.ChartPage),
  },
];
