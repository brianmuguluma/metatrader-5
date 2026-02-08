import { Injectable } from '@angular/core';
import { Device as Dev } from '@capacitor/device';

@Injectable({
  providedIn: 'root',
})
export class Device {
  async getId() {
    return await Dev.getId();
  }

  async getInfo() {
    return await Dev.getInfo();
  }

  async getBatteryInfo() {
    return await Dev.getBatteryInfo();
  }

  async getLanguageCode() {
    return await Dev.getLanguageCode();
  }

  async getLanguageTag() {
    return await Dev.getLanguageTag();
  }
}
