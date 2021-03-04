import Link from 'next/link';
import Layout from '../../components/layout';
import { fetchQuery } from '../../lib/wp-graphql-api';

export default function Post({ menuItems, post }) {
  return (
    <Layout title={post.title} menuItems={menuItems}>
      <div>
        <h2>{post.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const query = `
    query PostPaths {
      posts(first: 10000) {
        nodes {
          slug
        }
      }
    }
  `;
  const data = await fetchQuery(query);
  const paths = data.posts.nodes.map(node => ({
    params: { slug: node.slug }
  }));
  return { paths, fallback: true };
};

export async function getStaticProps({ params }) {
  const query = `
    query PostQuery {
      post(id: "${params.slug}", idType: SLUG) {
        id
        slug
        title
        content
      }
    }
  `;
  const data = await fetchQuery(query);
  return {
    props: {
      menuItems: data.menu.menuItems.nodes,
      post: data.post
    }
  };
};
