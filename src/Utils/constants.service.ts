import { Injectable } from '@nestjs/common';
import  moment from 'moment';

const getEnv: any = () => process.env.NODE_ENV ?? 'local';
const getCookieConfig = () => {
  return {
    secure: getEnv() !== ConstantsService.NODE_ENV.LOCAL,
    httpOnly: true,
    expires: moment().add(1, 'h').toDate(),
  };
};

@Injectable()
export class ConstantsService {
  static readonly NODE_ENV = {
    LOCAL: 'local',
    DEV: 'dev',
    UAT: 'uat',
    PROD: 'prod',
  };

 static readonly CORS = {
  ALLOWED_HEADERS: ['Content-Type', 'Authorization'],
  EXPOSED_HEADERS: ['token'],          // ✅ array is safer than a plain string
  METHODS: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],  // ✅ array form is more reliable
};
}
