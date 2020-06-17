import Layout from '../../components/Layout';
import Admin from '../../components/auth/admin';
import Link from 'next/link';

export default function AdminIndex() {
		return (
				<Layout>
						<Admin>
							<div className="container-fluid">
								<h2>Admin Dashboard</h2>
							</div>
						</Admin>
				</Layout>
		);
};