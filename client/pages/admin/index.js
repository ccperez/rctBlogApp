import Layout from '../../components/Layout';
import Admin from '../../components/auth/admin';
import Link from 'next/link';

const AdminIndex = () => {
    return (
        <Layout>
            <admin>
              <h2>Admin Dashboard</h2>
            </admin>
        </Layout>
    );
};

export default AdminIndex;
