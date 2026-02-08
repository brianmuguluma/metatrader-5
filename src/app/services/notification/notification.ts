import { Injectable } from '@angular/core';
import {
  LocalNotifications,
  ScheduleOptions,
} from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root',
})
export class Notifications {
  async schedule(options: ScheduleOptions) {
    await LocalNotifications.requestPermissions();
    LocalNotifications.schedule(options);
  }
}
