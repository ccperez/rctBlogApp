import { useState } from 'react';
import FormPage from './forms'
import { create, getCategories, removeCategory } from '../../actions/category';

export default function Category() {

	return(
		<FormPage 
			frmLabel 	 = { 'Category' }
			frmData 	 = { [] }
			getData 	 = { getCategories }
			createData = { create }
			removeData = { removeCategory }
		/>
	)
	
};