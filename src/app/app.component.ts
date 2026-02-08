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

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  device = inject(Device);

  route = signal<string>('home');
  balance = signal({ available: 17329, pending: 459 });
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

  // Formatting

  currencyFormatOptions = computed<Intl.NumberFormatOptions>(() => ({
    style: this.currency() ? 'currency' : undefined,
    notation: 'compact',
    currency: this.currency(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }));

  unitsFormatOptions = computed<Intl.NumberFormatOptions>(() => ({
    notation: 'compact',
    maximumFractionDigits: 1,
  }));
  private lastTransactionID = signal<string | undefined>(undefined);

  interval = signal(1000);

  async ngOnInit() {
    await this.getAccount();
    this.getInstruments();
    this.pollAccount();
    setInterval(() => this.pollAccount(), this.interval());
  }

  async getInstruments() {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${this.account()?.id}/instruments`,
    };
    const { data, status } = await CapacitorHttp.get(options);
    if (status === 200) {
      const { instruments } = data;
      this.instruments.set(instruments);
    }
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
