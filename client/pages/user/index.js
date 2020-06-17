import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import Link from 'next/link';

export default function AdminIndex() {
		return (
				<Layout>
						<Private>
							<div className="container-fluid">
								<h2>User Dashboard</h2>
							</div>
						</Private>
				</Layout>
		);
};