import { useRouter } from 'next/router'
import { ApolloClient, InMemoryCache, gql, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Head from 'next/head'



export default function Post({params, posts}) {
    const router = useRouter()
    const {cid, mid} = router.query
    console.log(cid, mid, posts);

    const content = JSON.parse(posts[0].content);
    return <div>
      <Head>
        <title>{content.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta data-react-helmet="true" name="description" content={content.shortDesc} />
        <meta
          data-react-helmet="true"
          name="og:title"
          content="Teji Mandi - Stock Investing, Simplified"
        />
        <meta data-react-helmet="true" name="og:description" content={content.shortDesc} />
        <meta data-react-helmet="true" name="og:type" content="article" />
        <meta data-react-helmet="true" name="og:url" content="beta.tejimandi.com" />
        <meta data-react-helmet="true" name="twitter:card" content="summary_large_image" />
        <meta data-react-helmet="true" name="twitter:image" content={content.image} />
        <meta data-react-helmet="true" name="og:image" content={content.image} />
        <meta data-react-helmet="true" name="image" content={content.image} />
        <meta charSet="utf-8" />

        {/* <title>Teji Mandi - Stock Investing, Simplified</title>
      <meta name="title" content="Teji Mandi - Stock Investing, Simplified" />
    <meta name="description" content="Teji Mandi is an app that helps you build a strong portfolio of high-quality stocks. We are a SEBI Registered Investment Advisor and a Motilal Oswal Subsidiary. " /> */}
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content={content.title} />
        <meta property="og:description" content={content.shortDesc} />
        <meta property="og:image" content={content.image} />
        {/* <!-- Twitter --/> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content={content.title} />
        <meta property="twitter:description" content={content.shortDesc} />

        <meta property="twitter:image" content={content.image} />

      </Head>
        <h2>{content.title}</h2>
        <p>{content.shortDesc}</p>
        <img src={content.image}/>
    </div>
  }
  

export async function getStaticPaths() {
  
  const paths =[ {params: { cid: '1266', mid: '21360' }}, {params: { cid: '126', mid: '2130' }}]

  return { paths, fallback: false }
}


  export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    console.log(params);
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
  
  query:query,
  variables: { getMessageData: {
    ID: params.mid,
    communityID: params.cid,
  },}
});
return {
  props: {
    posts: data.getMessages
  }
}
  }