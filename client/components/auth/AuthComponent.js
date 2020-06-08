import { useState, useEffect } from 'react';
import InputForm from './forms/InputForm';
import { auth, authenticate, isAuth } from '../../actions/auth';
import Router from 'next/router';

export default function AuthComponent({ api }) {

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

	useEffect(() => { isAuth() && Router.push(`/`) }, []);
	
	const handleSubmit = e => {
		e.preventDefault();
		setValues({ ...values, loading: true, error: false });

		const user = { name, email, password } 

		auth(api, user).then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
			} else {				
				if (api === 'signup') {
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
				} else {
					// save user token to cookie
					// save user info to localstorage
					// authenticate user
					authenticate(data, () => {
            const redirectURL = (isAuth() && isAuth.role===1) ? `/admin` : `/user`;
            Router.push(redirectURL);
          })
				}
			}
		});
	};

	const handleChange = e => {
		const { name, value } = e.target
		setValues({ ...values, error: false, [name]: value });
	};

	const showNotification = () => {
		const notificationMsg = error ? error : loading ? 'Loading...' : message;
		const msgClass = error ? 'danger' : 'info';

		return notificationMsg ? <div className={'alert alert-'+msgClass}>{notificationMsg}</div> : '';
	}

	const authItems = (api === 'signup')
		? [
				{ id: 1, type: 'text',     name: 'name',     value: name     },
				{ id: 2, type: 'email',    name: 'email',    value: email    },
				{ id: 3, type: 'password', name: 'password', value: password }
			]
		: [
				{ id: 1, type: 'email',    name: 'email',    value: email    },
				{ id: 2, type: 'password', name: 'password', value: password }
			];
	

	const authElements = authItems.map((auth) => 
		<InputForm
			key			 = { auth.id      } 
			field		 = { auth.name    }
			type		 = { auth.type    }
			value		 = { auth.value   }
			onChange = { handleChange }
		/>
	);

	const authForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				{ authElements }
				<div>
					<button className="btn btn-primary">
						{api === 'signup' ? 'Signup' : 'Signin' }
					</button>
				</div>
			</form>
		);
	};

	return <React.Fragment>
		{ showNotification() }
		{ showForm && authForm() }
	</React.Fragment>;
};
