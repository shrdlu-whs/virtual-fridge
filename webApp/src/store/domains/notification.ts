import { observable } from 'mobx';
import moment, { Moment } from 'moment';
import { v4 } from 'uuid';
import {
  INotification,
  NotificationType
} from './../../interfaces/notification.interface';

export class Notification implements INotification {
  uuid: string = v4();
  title: string = '';
  timestamp: Moment = moment();
  description: string = '';
  @observable read: boolean = false;
  type: NotificationType = 'info';
  displayAlert?: boolean;
  stackTrace?: string;
  translateParam?: string;

  constructor(obj?: INotification) {
    Object.assign(this, obj);
  }
}
