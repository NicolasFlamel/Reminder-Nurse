import icon from '../assets/images/rn_static_01.png';

// TODO: actions option for service workers
class Notifications {
  constructor(permission) {
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
  createNotification(time, name) {
    const title = name + '@' + time;
    const body = 'A reminder to take your medicine';

    this.notification = new Notification(title, { body, icon });
    this.notification.onclick = (e) => window.parent.focus();
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Notifications();
