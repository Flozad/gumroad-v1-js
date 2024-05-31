import Cookies from 'js-cookie';

class Flash {
  private cookieName: string;
  private msg: any;

  constructor(cookieName: string = 'flash') {
    this.cookieName = cookieName;
    this.load();
  }

  private load() {
    const cookieVal = Cookies.get(this.cookieName);
    if (cookieVal) {
      this.msg = JSON.parse(cookieVal);
      Cookies.remove(this.cookieName);
    } else {
      this.msg = null;
    }
  }

  set message(value: any) {
    this.msg = value;
    Cookies.set(this.cookieName, JSON.stringify(value));
  }

  get message() {
    return this.msg;
  }

  noCacheHeaders() {
    return [
      { key: 'Expires', value: 'Tue, 03 Jul 2001 06:00:00 GMT' },
      { key: 'Last-Modified', value: new Date().toUTCString() },
      { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0' },
      { key: 'Pragma', value: 'no-cache' }
    ];
  }
}

const flash = new Flash();
export default flash;
