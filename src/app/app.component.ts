import { Component, computed, inject, signal } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Device } from './services/device/device';

import {
  Account,
  AccountPoll,
  AccountResponse,
  Instrument,
} from './interfaces/oanda';
import {
  CapacitorHttp,
  HttpHeaders,
  HttpOptions,
  HttpResponse,
} from '@capacitor/core';
import { RateLimiter } from 'limiter';
import { environment } from 'src/environments/environment.prod';
import { OandaService } from './services/oanda/oanda';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  device = inject(Device);
  oanda = inject(OandaService);

  // balance = signal({ available: 2734.77, pending: 459 });
  deposit = signal(1000);
  balance = computed(
    () => this.deposit() + Math.abs(Number(this.account()?.pl) ?? 0)
  );
  currency = signal('GBP');

  platform = computed(async () => (await this.device.getInfo()).platform);

  isPaperTrading = signal(true);
  oandaRateLimit = signal(
    new RateLimiter({
      tokensPerInterval: 120,
      interval: 'second',
    })
  );

  // Accounts
  account = signal<Account | undefined>(undefined);
  accountId = signal(environment.oanda.accountId);
  poll = signal<AccountPoll | undefined>(undefined);
  instruments = signal<Instrument[] | undefined>(undefined);

  private lastTransactionID = signal<string | undefined>(undefined);

  interval = signal(50);
  price = signal(0);

  async ngOnInit() {
    await this.getAccount();
    // setInterval(() => this.pollAccount(), this.interval());
  }

  filterInstruments(name: string) {
    return this.instruments()?.filter(
      (instrument) => instrument.name === name
    )[0];
  }

  async getAccount() {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${this.accountId()}`,
    };

    const { data, status } = await CapacitorHttp.get(options);

    if (status !== 200) return;

    const { account, lastTransactionID } = data as AccountResponse;
    this.account.set(account);
    this.lastTransactionID.set(lastTransactionID);
    this.pollAccount();
  }

  async pollAccount() {
    const changes = await this.getAccountChanges();
    const { data, status } = await this.oanda.getCandlesticks('XAU_USD', {
      count: '1',
      granularity: 'S5',
    });

    if (status === 200) {
      this.price.set(data.candles[0].mid.c);
    }

    if (changes?.status !== 200) return;

    const poll = changes?.data as AccountPoll;
    this.poll.set(poll);
    this.lastTransactionID.set(poll.lastTransactionID);

    if (this.isNewTransaction()) await this.getAccount();
  }

  isNewTransaction() {
    return this.account()?.lastTransactionID !== this.poll()?.lastTransactionID;
  }

  private getApiKey(): string | undefined {
    return environment.oanda.apiKey;
  }

  /**
   *
   * @returns Endpoint used to poll an Account for its current state and changes since a specified TransactionID.
   */
  private async getAccountChanges(): Promise<HttpResponse | undefined> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      params: { sinceTransactionID: this.lastTransactionID()! },
      url: `${this.getBaseUrl()}/accounts/${this.accountId()}/changes`,
    };

    return await CapacitorHttp.get(options);
  }

  getBaseUrl() {
    return `https://api-fxpractice.oanda.com/v3`;
  }

  getHeaders(): HttpHeaders {
    return {
      Authorization: `Bearer ${this.getApiKey()}`,
    };
  }
}
