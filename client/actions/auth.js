import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import { HOST } from '../config';

const fetchAPI = (method, api, data={}) => { 
	switch(method) {
		case 'GET':
			return fetch(`${HOST}/${api}`, {
        method: method
    	})
      .then(resp => console.log('signout success'))
      .catch(err => console.log(err));

		case 'POST':
			return fetch(`${HOST}/${api}`, {
				method: method, 
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then(resp => resp.json())
			.catch(err => console.log(err));
	}
}

export const signup = user => fetchAPI('POST', 'signup', user);
export const signin = user => fetchAPI('POST', 'signin', user);

// Auth: signup | signin
export const auth = (api, user) => fetchAPI('POST', api, user);

export const signout = next => {
	Cookie('remove', 'token');
	LocalStorage('remove', 'user');
	next();

	return fetchAPI('GET', 'signout');
}

// Cookie: set | remove | get
export const Cookie = (type, key, value='') => {
	if (process.browser) {
		if (['get', 'set', 'remove'].includes(type)) {
			switch(type) {
				case 'set': 
					// return console.log('cookie.set({'+key+': '+value+', expires: 1})');
					return cookie.set(key, value, { expires: 1 });
				case 'remove': 
					// return console.log('cookie.remove({'+key+', expires: 1})');
					return cookie.remove(key, { expires: 1 });
				default: 
					// return true;
					return cookie.get(key);
			}
		}
	}
}

// LocalStorage: set | remove
export const LocalStorage = (type, key, value='') => {
	if (process.browser) {
		if (['set', 'remove'].includes(type)) {
			type === 'set'
				? localStorage.setItem(key, JSON.stringify(value))
				: localStorage.removeItem(key);
		}	
	}
}

// authenticate use by pass data to cookie and localstorage
export const authenticate = (data, next) => {
	Cookie('set', 'token', data.token);
	LocalStorage('set', 'user', data.user);
	next();
};

export const isAuth = () => {
	if (process.browser) {
		const cookieChecked = Cookie('get','token');
		if (cookieChecked) {
			const user = localStorage.getItem('user');
			if (user) return JSON.parse(user);
			
			return false;
		}
	}
};
