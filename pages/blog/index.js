import Link from 'next/link';
import Layout from '../../components/layout';
import { fetchQuery } from '../../lib/wp-graphql-api';

export default function Blog({ menuItems, page, posts }) {
  return (
    <Layout title={page.title} menuItems={menuItems}>
      <div>
        <h2>{page.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
        {posts.map(post => (
          <article key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <a><h2>{post.title}</h2></a>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </article>
        ))}
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const query = `
    query BlogQuery {
      page(id: "blog", idType: URI) {
        title
        content
      }
#      categories {
#        nodes {
#          name
#          slug
#        }
#      }
#      posts(first: 10, after: "", where: {categoryName: "technology"}) {
      posts(first: 10, after: "") {
        nodes {
          id
          slug
          title
          excerpt
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  `;

  const data = await fetchQuery(query);

  return {
    props: {
      menuItems: data.menu.menuItems.nodes,
      page: data.page,
      posts: data.posts.nodes
    }
  };
};
