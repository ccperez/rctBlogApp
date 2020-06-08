import { useState } from 'react';
import InputForm from './forms/InputForm';
import { signup } from '../../actions/auth';

export default function SignupComponent() {
	const [values, setValues] = useState({
		name 			: 'Ryan',
		email 		: 'ryan@gmail.com',
		password 	: 'rrrrrr',
		error 		: '',
		loading 	: false,
		message 	: '',
		showForm 	: true
	});

	const { name, email, password, error, loading, message, showForm } = values;

	const handleSubmit = e => {
		e.preventDefault();
		// console.table({ name, email, password, error, loading, message, showForm });
		setValues({ ...values, loading: true, error: false });
		const user = { name, email, password };

		signup(user).then(data => {
			
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
			} else {
				setValues({
					...values,
					name      : '',
					email     : '',
					password  : '',
					error     : '',
					loading   : false,
					message   : data.message,
					showForm  : false
				});
			}

		});

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

	const showAlert = () => {
		const alertMsg = error ? error : loading ? 'Loading...' : message;
		const nameClass = error ? 'danger' : 'info';

		return alertMsg ? <div className={'alert alert-'+nameClass}>{alertMsg}</div> : '';
	}

	const signupItems = [
	{ id: 1, type: 'text',     name: 'name',     value: name     },
	{ id: 2, type: 'email',    name: 'email',    value: email    },
	{ id: 3, type: 'password', name: 'password', value: password }
	]

	const signupElements = signupItems.map((signup) =>
		<InputForm
			key			 = { signup.id    } 
			field		 = { signup.name  }
			type		 = { signup.type  }
			value		 = { signup.value }
			onChange = { handleChange }
		/>
	);

	const signupForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				{ signupElements }
				<div>
					<button className="btn btn-primary">Signup</button>
				</div>
			</form>
		);
	};

	return <React.Fragment>
		{ showAlert() }
		{ showForm && signupForm() }
	</React.Fragment>;
};
