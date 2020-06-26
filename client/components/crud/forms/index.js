import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Cookie } from '../../../actions/auth';

export default function FormPage({frmLabel, frmData, getData, createData, removeData}) {

	const [values, setValues] = useState({
		name 		 : '',
		error 	 : false,
		success  : false,
		removed  : false,
		reload   : false,
		formData : frmData
	});

	const { name, error, success, formData, removed, reload } = values;
	const token = Cookie('get','token');

	useEffect(() => loadData(), [reload]);

	const loadData = () => {
		getData().then(data => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setValues({ ...values, formData: data })
			}
		});
	};	
	
	const showDataForm = () => {
		return formData.map((dta, i) => {
			return(
				<button
					onDoubleClick={() => deleteConfirm(dta.slug)}
					title="Double clieck to delete"
					key={i}
					className="btn btn-outline-primary mr-1 ml-1 mt-3"
				>
					{dta.name}
				</button>
			)
		})
	}

	const deleteConfirm = slug => {
		let answer = window.confirm(`Are you sure you want to delete this ${frmLabel}?`)
		if (answer) deleteData(slug);
	}

	const deleteData = slug => {
		// console.log('delete', slug);
		removeData(slug, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
			}
		});
	};


	const clickSubmit = e => {
		e.preventDefault();
		// console.log(`create ${frmData}`, name);
		createData({ name }, token).then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error, success: false });
			} else {
				setValues({ ...values, error: false, success: true, name: '', removed: !removed, reload: !reload });
			}
		});
	};

	const handleChange = e => {
		setValues({ ...values, name: e.target.value, error: false, success: false, removed: false });
	};

	const showNotification = () => {
		let notification;
		const msgClass = success ? 'success' : 'danger';

		if (success) notification = `${frmLabel} is created!`;
		if ( error ) notification = `${frmLabel} already exist!`;
		if (removed) notification = `${frmLabel} is removed!`;

		return <p className={'text-'+msgClass}>{notification}</p>;
	}

	const mouseMoveHandler = e => {
			setValues({ ...values, error: false, success: false, removed: false });
	};	

	const newDataForm = () => (
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
			<br />
			{ showNotification() }
			<div onMouseMove={mouseMoveHandler}>
				{ newDataForm()  }
				{ showDataForm() }
			</div>
		</React.Fragment>
	);
};
