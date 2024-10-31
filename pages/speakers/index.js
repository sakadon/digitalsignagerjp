import { useRouter } from 'next/router';
import Head from 'next/head';
import path from 'path';
import { promises as fs } from 'fs';
import en from '../../locales/en.json';
import ja from '../../locales/ja.json';
import Breadcrumb from '../../components/Breadcrumb';

import SpeakerList from '../../components/SpeakerList';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'speakers.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const speakers = JSON.parse(jsonData);

  return {
    props: {
      speakers
    }
  };
}

const groupByBrand = (speakers) => {
  return speakers.reduce((brands, speaker) => {
    const brand = speaker.brand;
    if (!brands[brand]) {
      brands[brand] = [];
    }
    brands[brand].push(speaker);
    return brands;
  }, {});
};

export default function BackloadedHornSpeakers({ speakers }) {
  const { locale } = useRouter();
  const tjson = locale === 'ja' ? ja : en;

  const groupedSpeakers = groupByBrand(speakers);


  return (
    <section>
      <Head>
        <title>{JSON.stringify(tjson.speakers.title)}</title>
      </Head>
      <Breadcrumb />
      <h2 className="mt-4 mb-4 text-2xl text-center font-bold text-gray-900 tracking-wide">{JSON.stringify(tjson.speakers.title)}</h2>

      {Object.keys(groupedSpeakers).map((brand) => (
        <div key={brand}>
          <h3 className="mt-8 mb-4 text-4xl font-bold text-green-600 text-center">{brand}</h3>
          <SpeakerList speakers={groupedSpeakers[brand]} />
        </div>
      ))}

      <style jsx>{`
      `}</style>
    </section>
  );
}
