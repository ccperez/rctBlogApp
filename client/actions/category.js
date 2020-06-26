import { fetchAPI } from './fetchAPI';

export const create         = (category, token)	=> fetchAPI(  'POST', 'category', category, token);
export const getCategories  = ()								=> fetchAPI(   'GET', 'categories');
export const singleCategory = (slug)						=> fetchAPI(   'GET', 'category', slug);
export const removeCategory = (slug, token)			=> fetchAPI('DELETE', 'category', slug, token);