import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = () => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        router.push('/')
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <SEO title="404: Not found" />
      <div className="not-found-container">
        <img
          src="/img/not_found.png"
          alt="Not Found"
        />
        <h1 className="title">No such page found</h1>
      </div>

    </Layout>
  );
};

export default NotFoundPage;
