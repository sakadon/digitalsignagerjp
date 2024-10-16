import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import path from 'path';
import { promises as fs } from 'fs';
import en from '../../locales/en.json';
import ja from '../../locales/ja.json';

import SpeakerList from '../../components/SpeakerList';
import SpeakerModal from '../../components/SpeakerModal';

export async function getStaticProps() {
  // JSONファイルのパスを取得
  const filePath = path.join(process.cwd(), 'public', 'speakers.json');
  // JSONファイルの内容を読み込む
  const jsonData = await fs.readFile(filePath, 'utf8');
  // JSONデータをオブジェクトに変換
  const speakers = JSON.parse(jsonData);

  return {
    props: {
      speakers
    }
  };
}

// JSONデータをbrandでグループ化する関数
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
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const { locale } = useRouter();
  const t = locale === 'ja' ? ja : en;

  // スピーカーをbrandごとにグループ化
  const groupedSpeakers = groupByBrand(speakers);

  const handleClick = (speaker) => {
    setSelectedSpeaker(speaker);
  };

  return (
    <section>
      <Head>
        <title>{t.backloadedhorn_speakers.title} - Digital Signager</title>
      </Head>
      <h2 className="mt-4 mb-4 text-2xl text-center font-bold text-gray-900 tracking-wide">{t.backloadedhorn_speakers.title}</h2>

      {/* ブランドごとにスピーカーリストを表示 */}
      {Object.keys(groupedSpeakers).map((brand) => (
        <div key={brand}>
          <h3 className="mt-8 mb-4 text-4xl font-bold text-green-600 text-center">{brand}</h3>
          <SpeakerList speakers={groupedSpeakers[brand]} onSelect={handleClick} />
        </div>
      ))}

      <SpeakerModal speaker={selectedSpeaker} onClose={() => setSelectedSpeaker(null)} />

      <style jsx>{`
      `}</style>
    </section>
  );
}
