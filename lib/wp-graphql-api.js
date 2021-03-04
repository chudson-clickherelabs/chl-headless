const API_URL = (process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://chlheadless.wpengine.com') + '/graphql';

export async function fetchQuery(query, fetchMenu = true) {
  if (fetchMenu === true) {
    query = query.replace(/[ \t]*\}\s*$/, menuQuery + '$&');
  }
  
  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query
    }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
};

const menuQuery = `
  menu(id: "Primary Menu", idType: NAME) {
    menuItems {
      nodes {
        id
        label
        path
      }
    }
  }
`;

export async function fetchMenu() {
  const menuQuery = `
    query MenuQuery {
      menu(id: "Primary Menu", idType: NAME) {
        menuItems {
          nodes {
            id
            label
            path
          }
        }
      }
    }
  `;
  const data = await fetchQuery(menuQuery);
  return data.menu;
};
