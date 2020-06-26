import Layout from '../../components/Layout';
import Admin from '../../components/auth/admin';
import Link from 'next/link';

export default function AdminIndex() {
		return (
				<Layout>
						<Admin>
							<div className="container-fluid">
										<div className="row">
												<div className="col-md-12 pt-5 pb-5">
														<h2>Admin Dashboard</h2>
												</div>
												<div className="col-md-4">
														<ul class="list-group">
															{['Category','Tag'].map(name => (
																<li className="list-group-item">
																		<Link href="/admin/crud/category-tag">
																				<a>Create {name}</a>
																		</Link>
																</li>
															))}
														</ul>
												</div>
												<div className="col-md-8">right</div>
										</div>
							</div>
						</Admin>
				</Layout>
		);
};