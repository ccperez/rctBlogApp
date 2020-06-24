import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Cookie } from '../../actions/auth';
import { create, getCategories, removeCategory } from '../../actions/category';

const Category = () => {
	const [values, setValues] = useState({
		name       : '',
		error      : false,
		success    : false,
		categories : [],
		removed    : false,
		reload     : false
	});

	const { name, error, success, categories, removed, reload } = values;
	const token = Cookie('get','token');

	useEffect(() => {
		loadCategories();
	}, [reload]);

	const loadCategories = () => {
		getCategories().then(data => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setValues({ ...values, categories: data })
			}
		});
	};

	const showCategories = () => {
		return categories.map((c, i) => {
			return(
				<button
					onDoubleClick={() => deleteConfirm(c.slug)}
					title="Double clieck to delete"
					key={i}
					className="btn btn-outline-primary mr-1 ml-1 mt-3"
				>
					{c.name}
				</button>
			)
		})
	}

	const deleteConfirm = slug => {
		let answer = window.confirm('Are you sure you want to delete this category?')
		if (answer) deleteCategory(slug);
	}

	const deleteCategory = slug => {
		// console.log('delete', slug);
		removeCategory(slug, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setValues({ ...values, error: false, success: false, name: '', removed: true, reload: !reload });
			}
		});
	};


	const clickSubmit = e => {
		e.preventDefault();
		// console.log('create category', name);
		create({ name }, token).then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error, success: false });
			} else {
				setValues({ ...values, error: false, success: true, name: '', removed: false, reload: !reload });
			}
		});
	};

	const handleChange = e => {
		setValues({ ...values, name: e.target.value, error: false, success: false, removed: false });
	};

	const showNotification = () => {
		let notification;
		const msgClass = success ? 'success' : 'danger';

		if (success) notification = 'Category is created!';
		if ( error ) notification = 'Category already exist!';
		if (removed) notification = 'Category is removed!';

		return <p className={'text-'+msgClass}>{notification}</p>;
	}

	const mouseMoveHandler = e => {
			setValues({ ...values, error: false, success: false, removed: '' });
	};	

	const newCategoryForm = () => (
		<form onSubmit={clickSubmit}>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input type="text" className="form-control" onChange={handleChange} value={name} required />
			</div>
			<div>
				<button type="submit" className="btn btn-primary">
					Create
				</button>
			</div>
		</form>
	);

	return( 
		<React.Fragment>
			{ showNotification() }
			{  newCategoryForm() }
			{   showCategories() }
		</React.Fragment>
	);
};

export default Category;