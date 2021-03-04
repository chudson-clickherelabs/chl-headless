import Link from 'next/link';
import Layout from '../components/layout';
import { fetchQuery } from '../lib/wp-graphql-api';

export default function Home({ menuItems, page }) {
  return (
    <Layout menuItems={menuItems}>
      <div>
        <h2>{page.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const query = `
    query HomeQuery {
      page(id: "home", idType: URI) {
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
