const withCSS = require('@zeit/next-css');

module.exports = withCSS({
	publicRuntimeConfig: {
		APP_NAME				: 'SEOBLOG',
		API_DEVELOPMENT	: 'http://0.0.0.0:5000/api',
		API_PRODUCTION	: 'http://0.0.0.0:5000/api',
		PRODUCTION			: false
	}
});
