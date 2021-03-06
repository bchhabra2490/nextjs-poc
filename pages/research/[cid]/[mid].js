import React, { useState, useEffect } from 'react';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, gql, createHttpLink } from '@apollo/client';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
import { DiscussionEmbed } from 'disqus-react';
import ReactMarkdown from 'react-markdown';
import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import BlogHeader from '../../../components/NewHeader/BlogHeader';
import { HTMLContent } from '../../../components/content';

const uri = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
console.log('API URL: ', uri);

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

const BlogPostTemplate = ({
  id,
  slug,
  description,
  content,
  postDate,
  date,
  tags,
  image,
  title,
}) => {
  let disqusConfig = {};
  let location = {
    href: ''
  };
  if (typeof window != 'undefined') {
   location = window.location;
  }  
  React.useEffect(() => {
    disqusConfig = {
      url: `${location.origin}/${location.pathname}}`,
      identifier: id,
      title,
    };
  }, [id]);
  


  const publishedDate = postDate || Number(date);
  return (
    <div className="inner">
      <article className="post-full post">
        <header className="post-full-header">
          <section className="post-full-meta">
            <time className="post-full-meta-date" dateTime={publishedDate}>
              {moment(publishedDate).format('DD MMMM YYYY')}
            </time>
          </section>
          <h1 className="post-full-title">{title}</h1>
        </header>
        <figure className="post-full-image">
          {image && (
          <img src={image} alt="tejimandi" className="default-image" />
          )}
          {!image && (
          <div className="default-image-container">
            <img
              src="/img/logo.png"
              alt="tejimandi"
              className="default-image"
            />
          </div>
          )}
        </figure>
        <section className="post-full-content">
          <p className="post-description">
            <em dangerouslySetInnerHTML={{ __html: description }} />
          </p>
          <div className="post-content">
            <ReactMarkdown source={content} />
          </div>
        </section>
        {/* <footer>
          <ul>
            {tags.map((tag) => (
              <li key={`${tag}tag`}>
                <Link to={`/topics/${kebabCase(tag)}/`}>{tag}</Link>
              </li>
            ))}
          </ul>
        </footer> */}
      </article>
      <div className="disqus-container">
        <DiscussionEmbed config={disqusConfig} />
      </div>
    </div>
  );
};

const Post = ({posts, params, loading }) => {
  let message = posts[0];
  let location = {
    href: ''
  };
  if (typeof window != 'undefined') {
   location = window.location;
  }  

  const content = (message.content && JSON.parse(message.content)) || {};
  const meta = [
    {
      property: 'article:published_time',
      content: message.createdOn,
    },
    {
      property: 'article:modified_time',
      content: message.createdOn,
    },
    {
      property: 'twitter:url',
      content: location.href,
    },
    {
      property: 'twitter:site',
      content: '@tejimandi',
    },
    {
      property: 'twitter:label1',
      content: 'Category',
    },
    {
      property: 'og:image:width',
      content: 800,
    },
  ];

  return (
    <Layout showLinks={false}>

      {loading && <PostLoader />}
      {!loading && (
        <>
          {content && content !== {} && (
          <SEO
            type="article"
            title={content.title}
            description={content.shortDesc}
            image={(content.image && content.image) || ''}
            meta={meta}
          />
          )}
          <BlogPostTemplate
            id={message.ID}
            content={content.description}
            postDate={content.postDate}
            contentComponent={HTMLContent}
            description={content.shortDesc}
            date={message.createdOn}
            tags={[content.sentiment]}
            image={content.image}
            title={content.title}
          />
        </>
      )}
      <BlogHeader title={content.title} />
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const query = gql`
query getMessages ($getMessageData: GetMessageData!) {
  getMessages (messages: [$getMessageData]) {
      ID
      communityID
      content
      creator {
        ID
        username
        fullname
        gender
        verified
        profilePic
        followStatus
      }
      createdOn
      messageType
      lastUpdated
      status
      statusMessage
      __typename
  }
}
`;

const httpLink = createHttpLink({
uri: uri,
});

const authLink = setContext((_, { headers }) => {
return {
  headers: {
    ...headers,
    'api-version': 2,
  }
}
});

const client = new ApolloClient({
link: authLink.concat(httpLink),
cache: new InMemoryCache()
});

let loading = true;

const { data } = await client.query({

query:query,
variables: { getMessageData: {
  ID: params.mid,
  communityID: params.cid,
},}
});
if(data){
  loading= false;
}
return {
props: {
  posts: data.getMessages,
  params: params,
  loading: loading
}
}
}


export default Post;
