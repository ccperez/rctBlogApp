import { useState } from 'react';
import FormPage from './forms';
import { create, getTags, removeTag } from '../../actions/tag';

export default function Tag() {

	return(
		<FormPage 
			frmLabel 	 = { 'Tag' }
			frmData 	 = { [] }
			getData 	 = { getTags }
			createData = { create }
			removeData = { removeTag }
		/>
	)

}