import Link from 'next/link';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation'

export default function Home() {
  const { t: tCommon } = useTranslation('common');
  const { t: tIndex } = useTranslation('index');

  return (
    <section>
      <Head>
        <title>{tIndex('title')} - {tCommon('title')}</title>
      </Head>

      <h2 className="mt-4 mb-4 text-3xl font-bold text-gray-900 tracking-wide italic">{tIndex('title')}</h2>

      {Array.isArray(tIndex('content', {}, { returnObjects: true })) && (
        tIndex('content', {}, { returnObjects: true }).map((text, index) => (
          <p className="leading-relaxed mt-4 mb-4" key={index}>{text}</p>
        ))
      )}

      {tCommon('menu') && (
        <nav>
          <ul className="list-decimal ml-6">
            <li>
              <Link className="text-blue-600 hover:text-blue-800 hover:underline" href="/speakers">{tCommon('menu.speaker_components_list')}</Link>
              <ul className="list-[circle] hover:list-disc ml-6">
                <li>
                  <Link className="text-blue-600 hover:text-blue-800 hover:underline" href="/speakers/grouped_by_baffle_hole_diameter">{tCommon('menu.grouped_by_baffle_hole_diameter')}</Link>
                </li>
                <li>
                  <Link className="text-blue-600 hover:text-blue-800 hover:underline" href="/speakers/grouped_by_categories">{tCommon('menu.grouped_by_categories')}</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      )}

      <h3 className="mt-10 mb-4 text-3xl font-bold text-gray-900 tracking-wide italic">{tIndex('disclaimer_title')}</h3>

      {Array.isArray(tIndex('disclaimer', {}, { returnObjects: true })) && (
        tIndex('disclaimer', {}, { returnObjects: true }).map((text, index) => (
          <p
            className="leading-relaxed mt-4 mb-4"
            key={index}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        ))
      )}

    </section>
  );
}
