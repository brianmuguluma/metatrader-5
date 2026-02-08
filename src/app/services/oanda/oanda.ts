import { inject, Injectable } from '@angular/core';
import {
  CapacitorHttp,
  HttpHeaders,
  HttpOptions,
  HttpParams,
  HttpResponse,
} from '@capacitor/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class OandaService {
  isPaperTrading(): boolean | undefined {
    return true;
  }

  getBaseUrl() {
    return environment.oanda.apiUrl;
  }

  getApiKey(): string | undefined {
    return environment.oanda.apiKey;
  }

  getHeaders() {
    return { Authorization: `Bearer ${this.getApiKey()}` };
  }

  /**
   * @returns Get a list of all Accounts authorized for the provided token.
   */
  async getAccounts() {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts`,
    };
    return await CapacitorHttp.get(options);
  }

  /**
   * @returns Get a list of all Accounts authorized for the provided token.
   */
  async getAccount(accountID: string): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${accountID}`,
    };
    return await CapacitorHttp.get(options);
  }

  /**
   * @returns Get a list of all Accounts authorized for the provided token.
   */
  async getAccountSummary(): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${
        environment.oanda.accountId
      }/summary`,
    };
    return await CapacitorHttp.get(options);
  }

  /** */
  async getOrders(params: HttpParams): Promise<HttpResponse> {
    const options: HttpOptions = {
      params,
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${
        environment.oanda.accountId
      }/orders`,
    };
    return await CapacitorHttp.get(options);
  }

  /**
   * @param orderSpecifier The Order Specifier
   *
   * @returns Get details for a single Order in an Account
   */
  async getOrder(orderSpecifier: string): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${
        environment.oanda.accountId
      }/orders/${orderSpecifier}`,
    };
    return await CapacitorHttp.get(options);
  }

  /**
   * @param state The state to filter the requested Trades by.
   * @param count The maximum number of Trades to return. [default=50, maximum=500]
   *
   * @returns Get a list of Trades for an Account.
   */
  async getTrades(params: HttpParams): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${
        environment.oanda.accountId
      }/trades`,
      params,
    };

    return await CapacitorHttp.get(options);
  }

  /**
   * @param tradeSpecifier Specifier for the Trade
   *
   * @returns Get the details of a specific Trade in an Account
   */
  async getTrade(tradeSpecifier: string): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${
        environment.oanda.accountId
      }/trades/${tradeSpecifier}`,
    };
    return await CapacitorHttp.get(options);
  }

  /**
   * @param instrument Name of the Instrument
   * @returns Fetch candlestick data for an instrument.
   */
  async getCandlesticks(
    instrument: string,
    params: HttpParams
  ): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      params,
      url: `${this.getBaseUrl()}/instruments/${instrument}/candles`,
    };
    // await this.app.oandaRateLimit().removeTokens(1);
    return await CapacitorHttp.get(options);
  }

  /**
   * @param transactionID A Transaction ID
   * @returns Get the details of a single Account Transaction.
   */
  async getTransaction(transactionID: string): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url: `${this.getBaseUrl()}/accounts/${
        environment.oanda.accountId
      }/transactions/${transactionID}`,
    };
    return await CapacitorHttp.get(options);
  }

  /**
   * @returns Get a list of Transactions pages that satisfy a time-based Transaction query.
   */
  async getTransactions(params: HttpParams): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      params,
      url: `${this.getBaseUrl()}/accounts/${
        environment.oanda.accountId
      }/transactions`,
    };
    // await this.app.oandaRateLimit().removeTokens(1);
    return await CapacitorHttp.get(options);
  }

  /**
   * @returns Get a range of Transactions for an Account based on the Transaction IDs.
   */
  async getTransactionsIDRange(url: string): Promise<HttpResponse> {
    const options: HttpOptions = {
      headers: this.getHeaders(),
      url,
    };
    // await this.app.oandaRateLimit().removeTokens(1);
    return await CapacitorHttp.get(options);
  }
}
