export const session = {    
    COOKIE_NAME: "gaeutilities_session",
    DEFAULT_COOKIE_PATH: "/",
    DEFAULT_COOKIE_DOMAIN: false, // Set to false if you do not want this value set on the cookie, otherwise put the domain value you wish used.
    SESSION_EXPIRE_TIME: 7200,    // sessions are valid for 7200 seconds (2 hours)
    INTEGRATE_FLASH: true,        // integrate functionality from flash module?
    SET_COOKIE_EXPIRES: true,     // Set to true to add expiration field to cookie
    WRITER: "datastore",          // Use the datastore writer by default. cookie is the other option.
    CLEAN_CHECK_PERCENT: 50,      // By default, 50% of all requests will clean the datastore of expired sessions
    CHECK_IP: true,               // validate sessions by IP
    CHECK_USER_AGENT: true,       // validate sessions by user agent
    SESSION_TOKEN_TTL: 5,         // Number of seconds a session token is valid for.
    UPDATE_LAST_ACTIVITY: 60,     // Number of seconds that may pass before last_activity is updated
};

export const cache = {
    DEFAULT_TIMEOUT: 3600, // cache expires after one hour (3600 sec)
    CLEAN_CHECK_PERCENT: 50, // 50% of all requests will clean the database
    MAX_HITS_TO_CLEAN: 20, // the maximum number of cache hits to clean
};

export const flash = {
    COOKIE_NAME: "appengine-utilities-flash",
};

export const paginator = {
    DEFAULT_COUNT: 10,
    CACHE: 10,
    DEFAULT_SORT_ORDER: "ASC",
};

export const rotmodel = {
    RETRY_ATTEMPTS: 3,
    RETRY_INTERVAL: 0.2,
};

console.log("Settings Default Loaded");
