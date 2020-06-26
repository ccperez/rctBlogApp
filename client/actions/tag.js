import { fetchAPI } from './fetchAPI';

export const create		 = (tag, token)	 => fetchAPI(  'POST', 'tag', tag, token);
export const getTags	 = ()						 => fetchAPI(   'GET', 'tags');
export const singleTag = (slug)				 => fetchAPI(   'GET', 'tag', slug);
export const removeTag = (slug, token) => fetchAPI('DELETE', 'tag', slug, token);