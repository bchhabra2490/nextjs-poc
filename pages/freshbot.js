import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useRouter } from 'next/router'
import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = ({ location }) => {
  const router = useRouter()
  const params = router.query

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        router.push('/');
        
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <SEO title="FreshBot" />
      <div />
    </Layout>
  );
};

export default NotFoundPage;
