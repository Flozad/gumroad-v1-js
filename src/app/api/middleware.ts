import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

interface Session {
    token: string | null;
    writer?: string;
    setTestCookie?: () => void;
    testCookieWorked?: () => boolean;
    deleteTestCookie?: () => void;
    save?: () => void;
  }

  interface NextApiRequestWithSession extends NextApiRequest {
  session: Session;
}

class SessionMiddleware {
  static TEST_COOKIE_NAME = 'testcookie';
  static TEST_COOKIE_VALUE = 'worked';

  static processRequest(req: NextApiRequestWithSession) {
    const cookies = new Cookies(req, {} as NextApiResponse);
    const sessionToken = cookies.get('sessionToken');

    if (sessionToken) {
      req.session = { token: sessionToken };
    } else {
      req.session = { token: null, writer: 'cookie' };
    }

    req.session.setTestCookie = SessionMiddleware.setTestCookie.bind(null, req);
    req.session.testCookieWorked = SessionMiddleware.testCookieWorked.bind(null, req);
    req.session.deleteTestCookie = SessionMiddleware.deleteTestCookie.bind(null, req);
    req.session.save = SessionMiddleware.save.bind(null, req);
  }

  static setTestCookie(req: NextApiRequest) {
    const cookies = new Cookies(req, {} as NextApiResponse);
    cookies.set(SessionMiddleware.TEST_COOKIE_NAME, SessionMiddleware.TEST_COOKIE_VALUE);
  }

  static testCookieWorked(req: NextApiRequest) {
    const cookies = new Cookies(req, {} as NextApiResponse);
    return cookies.get(SessionMiddleware.TEST_COOKIE_NAME) === SessionMiddleware.TEST_COOKIE_VALUE;
  }

  static deleteTestCookie(req: NextApiRequest) {
    const cookies = new Cookies(req, {} as NextApiResponse);
    cookies.set(SessionMiddleware.TEST_COOKIE_NAME, '', { expires: new Date(0) });
  }

  static save(req: NextApiRequest) {
    // This is where you would save the session to a datastore if needed
  }

  static processResponse(req: NextApiRequestWithSession, res: NextApiResponse) {
    if (req.session) {
      const cookies = new Cookies(req, res);
      cookies.set('sessionToken', req.session.token);
    }
  }
}

export default SessionMiddleware;
