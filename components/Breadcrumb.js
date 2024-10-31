import Link from 'next/link';
import { useRouter } from 'next/router';
import en from '../locales/en.json';
import ja from '../locales/ja.json';

export default function Breadcrumbs() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'ja' ? ja : en;

  // パスを分割して階層ごとに生成
  const pathArray = router.asPath.split('/').filter(path => path);

  // パス配列に基づいてリンクを生成
  const breadcrumbs = pathArray.map((path, index) => {
    const href = `/${pathArray.slice(0, index + 1).join('/')}`;
    const isLast = index === pathArray.length - 1; // 最後の要素かどうか
    return (
      <span key={href} className="flex items-center">
        {!isLast ? (
          <Link href={href}>
            <span className="text-blue-600 hover:underline">{t[path] || path}</span>
          </Link>
        ) : (
          <span className="text-gray-500">{t[path] || path}</span>
        )}
        {!isLast && <span className="mx-2">/</span>} {/* セパレータ */}
      </span>
    );
  });

  return (
    <nav aria-label="Breadcrumb" className="text-gray-500 text-sm mb-6">
      <ol className="flex items-center space-x-2">
        {/* Homeのリンクを先頭に追加 */}
        <li>
          <Link href="/">
            <span className="text-blue-600 hover:underline">{t.home || 'Home'}</span>
          </Link>
          {pathArray.length > 0 && <span className="mx-2">/</span>}
        </li>
        {breadcrumbs}
      </ol>

      <style jsx>{`
        nav {
          font-family: 'Fira Mono', monospace;
          border-bottom: double 3px #ccc;
        }
      `}</style>
    </nav>
  );
}
