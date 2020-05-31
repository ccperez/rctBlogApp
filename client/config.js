import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { APP_NAME, PRODUCTION, API_DEVELOPMENT, API_PRODUCTION } = publicRuntimeConfig;

export const API = PRODUCTION ? API_PRODUCTION : API_DEVELOPMENT;
		
export const APPNAME = APP_NAME;
