import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation'

export default function Breadcrumbs() {
  const router = useRouter();
  const { t } = useTranslation('common'); // 'common' は翻訳キーのセクションを指定

  // パスを分割して階層ごとに生成
  const pathArray = router.asPath.split('/').filter(path => path);

  // パス配列に基づいてリンクを生成
  const breadcrumbs = pathArray.map((path, index) => {
    const href = `/${pathArray.slice(0, index + 1).join('/')}`;
    const isLast = index === pathArray.length - 1; // 最後の要素かどうか
    const translationKey = `breadcrumbs.${path}`;

    // `breadcrumbs.{path}`が存在するか確認し、なければ`path`を直接表示
    const label = t(translationKey) !== translationKey ? t(translationKey) : path;

    return (
      <span key={href} className="flex items-center">
        {!isLast ? (
          <Link href={href}>
            <span className="text-blue-600 hover:underline">{label}</span>
          </Link>
        ) : (
          <span className="text-gray-500">{label}</span>
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
            <span className="text-blue-600 hover:underline">{t('breadcrumbs.home') || 'HOME'}</span>
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
