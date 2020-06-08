import { userState } from 'react';
import { signup } from '../../actions/auth';
import Router from 'next/router';

export default function SigninComponent() {
	const [values, setValues] = userState({
		email 		: 'ryan@gmail.com',
		password 	: 'rrrrrr',
		error 		: '',
		loading 	: false,
		message 	: '',
		showForm 	: true
	});

	const { email, password, error, loading, message, showForm } = values;

	const handleSubmit = e => {
		e.preventDefault();
		console.table({ name, email, password, error, loading, message, showForm });
	};

	const handleChange = e => {
		const { name, value } = e.target
		setValues({ ...values, error: false, [name]: value });
	};

	const showLoading = () => (
		loading ? <div className="alert alert-info">Loading...</div> : ''
	);

	const showError = () => (
		error ? <div className="alert alert-danger">{error}</div> : ''
	);

	const showMessage = () => (
		message ? <div className="alert alert-info">{message}</div> : ''
	);

	const showAlert = () => (
		const = alertMsg = error ? error : loading ? 'Loading...' : message;
		<div className="'alert alert-' + { error ? 'danger' : 'info'}">{alertMsg}</div>
	)



}