import icon from '../assets/images/rn_static_01.png';

// TODO: actions option for service workers
class Notifications {
  notification: Notification | undefined;
  permission: string;
  constructor(permission?: string) {
    this.notification = undefined;
    this.permission = permission || 'default';

    if (this.checkPermission() !== 'granted') {
      this.requestPermission();
    }
  }
  checkPermission() {
    this.permission = Notification.permission;
    return this.permission;
  }
  async requestPermission() {
    this.permission = await Notification.requestPermission();
  }
  createNotification(time: string, name: string) {
    const title = name + '@' + time;
    const body = 'A reminder to take your medicine';

    this.notification = new Notification(title, { body, icon });
    this.notification.onclick = () => window.parent.focus();
  }
}

export default new Notifications();
