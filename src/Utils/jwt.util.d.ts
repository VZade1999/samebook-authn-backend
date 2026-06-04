declare const jwt: any;
declare const ACCESS_SECRET: string;
declare const REFRESH_SECRET: string;
declare const generateAccessToken: (payload: any) => any;
declare const generateRefreshToken: (payload: any) => any;
declare const verifyAccessToken: (token: any) => any;
declare const verifyRefreshToken: (token: any) => any;
