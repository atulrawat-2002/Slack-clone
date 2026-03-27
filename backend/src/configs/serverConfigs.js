import { configDotenv } from 'dotenv';

configDotenv()

export const PORT = process.env.PORT;

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const DEV_DB_URL = process.env.DEV_DB_URL;

export const PROD_DB_URL = process.env.PROD_DB_URL;

export const JWT_SECRET = process.env.JWT_SECRET;

export const JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';

export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';

export const REDIS_PORT = process.env.REDIS_PORT || 6379;

export const MAIL_ADDRESS = process.env.MAIL_ADDRESS;

export const APP_LINK = process.env.APP_LINK || 'http://localhost:8000';

export const ENABLE_EMAIL_VARIFICATION = process.env.ENABLE_EMAIL_VARIFICATION || false;

export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;

export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export const CURRENCY = process.env.CURRENCY;

export const RECIEPT = process.env.RECIEPT;