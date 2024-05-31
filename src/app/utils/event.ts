type Callback = (...args: any[]) => void;

interface EventSubscription {
  event: string;
  callback: Callback;
  args: any[];
}

class Event {
  private events: EventSubscription[] = [];

  subscribe(event: string, callback: Callback, args: any[] = []) {
    const subscription = { event, callback, args };
    if (!this.events.some(e => e.event === event && e.callback === callback)) {
      this.events.push(subscription);
    }
    return true;
  }

  unsubscribe(event: string, callback: Callback, args: any[] = []) {
    this.events = this.events.filter(e => !(e.event === event && e.callback === callback));
    return true;
  }

  fireEvent(event: string) {
    this.events.forEach(e => {
      if (e.event === event) {
        e.callback(...e.args);
      }
    });
    return true;
  }
}

export default new Event();
