import Layout from '../components/Layout';
import AuthComponent from '../components/auth/AuthComponent';

export default function Signin() {
	return (
		<Layout>
			<h2 className="text-center pt-4 pb-4">Signin</h2>
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<AuthComponent api = 'signin' />
				</div>
			</div>
		</Layout>
	);
};
