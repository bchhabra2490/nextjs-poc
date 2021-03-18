import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


export default function Home({posts}) {
  console.log(posts);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          {posts.map(post=>{
            return( <a href={`/post/${post.communityID}/${post.ID}`}><a className={styles.card}>
            <h3>{JSON.parse(post.content).title}</h3>
            <p>{JSON.parse(post.content).shortDesc}</p>
          </a></a>)
          })}
         

          
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  // Code will go here

  const httpLink = createHttpLink({
    uri: 'https://dev-graphql.tejimandi.com/graphql',
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

  const { data } = await client.query({
    
    query:gql`
  query getBlogPosts {
    getBlogPosts {
      ID
      messageType
      content
      communityID
      createdOn
      community {
        title
      }
      __typename
    }
  }
`
  });
  return {
    props: {
      posts: data.getBlogPosts
    }
  }
}