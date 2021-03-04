import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ menuItems, title, children }) {
  return (
    <div className="container">
      <Head>
        <title>{
          title
          ? title + " - "
          : ""
        }Click Here Labs</title>
      </Head>
      <header>
        <h1><Link href="/"><a>Click Here Labs</a></Link></h1>
        <ul className="inline">
          {menuItems.map(menuItem => (
            <li key={menuItem.id}>
              <Link href={menuItem.path}>
                <a>{menuItem.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </header>
        
      <main>
        {children}
      </main>
    </div>
  )
};
