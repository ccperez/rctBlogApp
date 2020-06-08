import { useEffect } from 'react';
import Router from 'next/routes';
import { isAuth } from '../../actions/auth';

export default function Admin({ children }) {
  useEffect(() => {
    const redirectURL = (isAuth()) `/` : `/signin`;
    Router.push(redirectURL);
  }, []);
  
  return <React.Fragment>{ children }</React.Fragment>
}