import Cookies from 'cookies';
import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { session as sessionConfig } from '../config/settingsDefault';

interface SessionData {
  keyname: string;
  content: any;
  model?: any;
  dirty?: boolean;
  deleted?: boolean;
}

class Session {
  cookieName: string;
  sessionExpireTime: number;
  integrateFlash: boolean;
  checkIp: boolean;
  checkUserAgent: boolean;
  setCookieExpires: boolean;
  sessionTokenTtl: number;
  lastActivityUpdate: number;
  writer: string;
  sid: string | null = null;
  session: Record<string, any> | null = null;
  cache: Record<string, any> = {};
  cookie: Cookies;
  outputCookie: Cookies;
  cookieVals: Record<string, any> = {};

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.cookieName = sessionConfig.COOKIE_NAME;
    this.sessionExpireTime = sessionConfig.SESSION_EXPIRE_TIME;
    this.integrateFlash = sessionConfig.INTEGRATE_FLASH;
    this.checkIp = sessionConfig.CHECK_IP;
    this.checkUserAgent = sessionConfig.CHECK_USER_AGENT;
    this.setCookieExpires = sessionConfig.SET_COOKIE_EXPIRES;
    this.sessionTokenTtl = sessionConfig.SESSION_TOKEN_TTL;
    this.lastActivityUpdate = sessionConfig.UPDATE_LAST_ACTIVITY;
    this.writer = sessionConfig.WRITER;

    this.cookie = new Cookies(req, res);
    this.outputCookie = new Cookies(req, res);
    const stringCookie = this.cookie.get(this.cookieName);
    if (stringCookie) {
      this.cookieVals = JSON.parse(stringCookie);
    }

    if (this.writer !== 'cookie') {
      this.initSession();
    }

    if (this.setCookieExpires && !this.outputCookie.get(`${this.cookieName}_data`)) {
      this.outputCookie.set(`${this.cookieName}_data`, '', { expires: new Date(0), path: sessionConfig.DEFAULT_COOKIE_PATH });
    }
  }

  private initSession() {
    const sid = this.cookie.get(this.cookieName);
    if (sid) {
      this.sid = sid;
      // TODO: Fetch session from storage
      this.session = {}; // Placeholder for session fetching logic
    } else {
      this.startNewSession();
    }

    if (this.shouldCleanSessions()) {
      this.cleanOldSessions();
    }
  }

  private startNewSession() {
    this.sid = this.newSid();
    this.session = { sid: [this.sid], ua: '', ip: '', lastActivity: new Date() };
    if (this.checkUserAgent) {
      this.session.ua = '';
    }
    if (this.checkIp) {
      this.session.ip = '';
    }
    // TODO: Save session to storage
    this.outputCookie.set(this.cookieName, this.sid, { path: sessionConfig.DEFAULT_COOKIE_PATH });
  }

  private newSid() {
    const sessionKey = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('md5').update(`${Date.now()}${Math.random()}`).digest('hex');
    return `${sessionKey}_${hash}`;
  }

  private shouldCleanSessions() {
    return Math.random() * 100 < sessionConfig.CLEAN_CHECK_PERCENT;
  }

  private cleanOldSessions() {
    // TODO: Implement session cleaning logic
  }

  public get(keyname: string) {
    if (this.cache[keyname]) {
      return this.cache[keyname];
    }
    if (this.cookieVals[keyname]) {
      return this.cookieVals[keyname];
    }
    // TODO: Fetch from session storage if necessary
    throw new Error(`Key ${keyname} not found`);
  }

  public set(keyname: string, value: any) {
    this.cache[keyname] = value;
    this.cookieVals[keyname] = value;
    this.outputCookie.set(`${this.cookieName}_data`, JSON.stringify(this.cookieVals), { path: sessionConfig.DEFAULT_COOKIE_PATH });
  }

  public delete(keyname: string) {
    delete this.cache[keyname];
    delete this.cookieVals[keyname];
    this.outputCookie.set(`${this.cookieName}_data`, JSON.stringify(this.cookieVals), { path: sessionConfig.DEFAULT_COOKIE_PATH });
  }

  public clear() {
    this.cache = {};
    this.cookieVals = {};
    this.outputCookie.set(`${this.cookieName}_data`, '', { expires: new Date(0), path: sessionConfig.DEFAULT_COOKIE_PATH });
  }

  public getSessionId() {
    return this.sid;
  }

  public getAll() {
    return this.cache;
  }
}

export default Session;
