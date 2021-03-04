import Link from 'next/link';
import Layout from '../components/layout';
import { fetchQuery } from '../lib/wp-graphql-api';

export default function Page({ menuItems, page }) {
  return (
    <Layout title={page.title} menuItems={menuItems}>
      <div>
        <h2>{page.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const query = `
    query PagePaths {
      pages(first: 10000) {
        nodes {
          slug
        }
      }
    }
  `;
  const data = await fetchQuery(query);
  const paths = data.pages.nodes.map(node => ({
    params: { slug: node.slug }
  }));
  return { paths, fallback: false };
};

export async function getStaticProps({ params }) {
  const query = `
    query PageQuery {
      page(id: "${params.slug}", idType: URI) {
        title
        content
      }
    }
  `;
  const data = await fetchQuery(query);
  return {
    props: {
      menuItems: data.menu.menuItems.nodes,
      page: data.page
    }
  };
};
