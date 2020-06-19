import { useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '../../actions/auth';

export default function Admin({ children }) {
		useEffect(() => {
				if (!isAuth()) {
						Router.push(`/signin`);
				} else if (isAuth().role !== 1) {
						Router.push(`/`);
				}
		}, []);
		return <React.Fragment>{ children }</React.Fragment>;
};