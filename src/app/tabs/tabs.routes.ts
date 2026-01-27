import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'quotes',
        loadComponent: () =>
          import('../quotes/quotes.page').then((m) => m.QuotesPage),
      },
      {
        path: 'chart',
        loadComponent: () =>
          import('../chart/chart.page').then((m) => m.ChartPage),
      },
      {
        path: 'trade',
        loadComponent: () =>
          import('../trade/trade.page').then((m) => m.TradePage),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('../history/history.page').then((m) => m.HistoryPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../settings/settings.page').then((m) => m.SettingsPage),
      },
      {
        path: '',
        redirectTo: '/tabs/history',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/history',
    pathMatch: 'full',
  },
];
