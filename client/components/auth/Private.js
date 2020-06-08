import { useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '../../actions/auth';

export default function Private({ children }) {
  useEffect(() => {
    if (!isAuth()) { Router.push(`/signin`); }
  }, []);
  return <React.Fragment>{ children }</React.Fragment>  
}