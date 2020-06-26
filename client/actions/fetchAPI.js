import fetch from 'isomorphic-fetch';
import { HOST } from '../config';

function headers(token) {
	return {
		'Accept'				: 'application/json',
		'Content-Type'	: 'application/json',
		'Authorization'	: `Bearer ${token}`
	}
}

export const fetchAPI = (method, api, data=null, token=null) => {
	let apiURL, sendData;
	switch(method) {
		case 'GET':
			api      = data ? `${api}/${data}` : api;
			apiURL   = `${HOST}/${api}`;
			sendData = { method: method }
			break;
		case 'POST':
			apiURL   = `${HOST}/${api}`;
			sendData = {
				method 	: method,
				headers : headers(token),
				body 		: JSON.stringify(data)
			}
			break;
		case 'DELETE':
			apiURL   = `${HOST}/${api}/${data}`;
			sendData = { method: method, headers: headers(token) }
			break;
	}

	return fetch(apiURL, sendData)
		.then(resp => resp.json())
		.catch(err => console.log(err));

}