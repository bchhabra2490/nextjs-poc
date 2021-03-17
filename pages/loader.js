import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const PostLoader = () => (
  <div className="inner">
    <article className="post-full post">
      <header className="post-full-header">
        <section className="post-full-meta">
          <Skeleton
            animation="wave"
            height={15}
            width="30%"
            variant="rect"
            style={{ marginBottom: 6 }}
          />
        </section>
        <h1 className="post-full-title">
          <Skeleton
            animation="wave"
            height={15}
            variant="rect"
            style={{ marginBottom: 6 }}
          />
        </h1>
      </header>
      <figure className="post-full-image d-flex-center">
        <Skeleton
          variant="rect"
          width={700}
          height={300}
          style={{ marginBottom: 60 }}
        />
      </figure>
      <section className="post-full-content">
        <Skeleton
          animation="wave"
          height={15}
          width="100%"
          variant="rect"
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          animation="wave"
          height={15}
          width="80%"
          variant="rect"
          style={{ marginBottom: 6 }}
        />
        <div style={{ paddingBottom: 70 }}>
          <Skeleton
            variant="rect"
            width="100%"
            height={800}
            style={{ marginBottom: 10 }}
          />
        </div>
      </section>
      <footer>
        <ul>
          <li>
            <Skeleton
              variant="rect"
              width={55}
              height={33}
              style={{ borderRadius: 10 }}
            />
          </li>
          <li>
            <Skeleton
              variant="rect"
              width={55}
              height={33}
              style={{ borderRadius: 10 }}
            />
          </li>
          <li>
            <Skeleton
              variant="rect"
              width={55}
              height={33}
              style={{ borderRadius: 10 }}
            />
          </li>
          <li>
            <Skeleton
              variant="rect"
              width={55}
              height={33}
              style={{ borderRadius: 10 }}
            />
          </li>
        </ul>
      </footer>
    </article>
  </div>
);

export default PostLoader;
