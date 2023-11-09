class Notifications {
  constructor(permission) {
    this.notification = undefined;
    this.permission = permission || 'default';
  }
  checkPermission() {
    this.permission = Notification.permission;
    return this.permission;
  }
  async requestPermission() {
    this.permission = await Notification.requestPermission();
  }
  createNotification(title, body, icon) {
    this.notification = new Notification(title, { body, icon });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Notifications();
