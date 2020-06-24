import fetch from 'isomorphic-fetch';
import { HOST } from '../config';

const fetchAPI = (method, api, data=null, token=null) => {
	switch(method) {
		case 'GET':
			api = data ? api+'/'+data : api
			return fetch(HOST+'/'+api, {
				method: method
			})
			.then(resp => resp.json())
			.catch(err => console.log(err));			

		case 'POST':
			return fetch(`${HOST}/${api}`, {
				method: method,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			})
			.then(resp => resp.json())
			.catch(err => console.log(err));

		case 'DELETE':
			return fetch(`${HOST}/${api}/${data}`, {
				method: method,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			})
			.then(resp => resp.json())
			.catch(err => console.log(err));
	}
}

export const create = (category, token) =>
	fetchAPI('POST', 'category', category, token)

export const getCategories = () =>
	fetchAPI('GET', 'categories')

export const singleCategory = slug =>
	fetchAPI('GET', 'category', slug)

export const removeCategory = (slug, token) =>
	fetchAPI('DELETE', 'category', slug, token)
