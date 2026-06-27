import Head from 'next/head';
import path from 'path';
import { promises as fs } from 'fs';
import useTranslation from 'next-translate/useTranslation';
import Breadcrumb from '../../components/Breadcrumb';
import EnclosureList from '../../components/EnclosureList';

const DEFAULT_FALLBACK_YEAR = 1970;

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'enclosures.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const enclosures = JSON.parse(jsonData);

  return {
    props: {
      enclosures,
    },
  };
}

const groupByBrandAndSortByRelease = (enclosures) => {
  const grouped = enclosures.reduce((brands, enclosure) => {
    const brand = enclosure.brand;
    if (!brands[brand]) {
      brands[brand] = [];
    }
    brands[brand].push(enclosure);
    return brands;
  }, {});

  Object.keys(grouped).forEach((brand) => {
    grouped[brand] = grouped[brand].sort((a, b) => {
      const releaseA = parseInt(a.release?.slice(0, 4), 10) || DEFAULT_FALLBACK_YEAR;
      const releaseB = parseInt(b.release?.slice(0, 4), 10) || DEFAULT_FALLBACK_YEAR;
      return releaseB - releaseA;
    });
  });

  return grouped;
};

export default function EnclosuresAllList({ enclosures }) {
  const { t } = useTranslation('common');
  const groupedEnclosures = groupByBrandAndSortByRelease(enclosures);

  return (
    <section>
      <Head>
        <title>{t('enclosures_dir.title')} - {t('title')}</title>
      </Head>
      <Breadcrumb />

      <h2 className="mt-4 mb-4 text-2xl text-center font-bold text-gray-900 tracking-wide">
        {t('enclosures_dir.title')}
      </h2>
      <p className="mb-4">{t('enclosures_dir.abst')}</p>

      {Object.keys(groupedEnclosures).map((brand) => (
        <div key={brand} className="rounded-lg bg-gray-100 py-5 px-3 mb-10">
          <h3 className="mb-4 text-4xl font-bold text-blue-900 text-center">{brand}</h3>
          <EnclosureList enclosures={groupedEnclosures[brand]} />
        </div>
      ))}

      <style jsx>{`
        h3 {
          font-family: 'Fira Mono', monospace;
        }
      `}</style>
    </section>
  );
}
