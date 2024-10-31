import { useState, useEffect } from 'react';
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

  const data = {
  };

  return {
    props: {
      data,
      speakers
    }
  };
}

export default function GroupedByCategories({ data, speakers }) {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const router = useRouter();
  const { locale, query } = router;
  const t = locale === 'ja' ? ja : en;
  const td = locale === 'ja' ? data.ja : data.en;

  const groupedSpeakers = groupSpeakersByCategories(speakers);

  // ハッシュが指定されていた場合に該当するスピーカーを自動的に選択
  useEffect(() => {
    if (router.isReady) {
      const speakerId = window.location.hash.replace('#', '');
      if (speakerId && speakers) {
        const speaker = speakers.find(s => s.id === speakerId);
        if (speaker) {
          setSelectedSpeaker(speaker);
        }
      }
    }
  }, [router.isReady, speakers]);

  // モーダルを開いたときにURLにハッシュを設定
  const handleClick = (speaker) => {
    setSelectedSpeaker(speaker);
    router.push(`${router.asPath}#${speaker.id}`, undefined, { shallow: true });
  };

  // モーダルを閉じたときにURLからハッシュを消す
  const handleClose = () => {
    setSelectedSpeaker(null);
    router.push(`${router.asPath.split('#')[0]}`, undefined, { shallow: true });
  };


  return (
    <section>
      <Head>
        <title>{`${t.categories.title} / ${t.speakers.title} - Digital Signager}`}</title>
      </Head>
      <h2 className="mt-4 mb-4 text-2xl text-center font-bold text-gray-900 tracking-wide">{t.speakers.title}</h2>

      <h3 className="mt-8 mb-4 text-4xl font-bold text-green-600 text-center">{t.speakers.grouped_by_baffle_hole_diameter}</h3>
      {groupedSpeakers.map((group, groupIndex) => (
        <div key={groupIndex} className="mt-4 mb-8">
          <h4 className="mt-4 mb-4 text-2xl font-bold text-green-800">{t.speakers.baffle_hole_diameter}: Φ{group[0].otherParameters.baffleHoleDiameter.value}mm ±3mm</h4>
          <SpeakerList speakers={group} onSelect={handleClick} />
        </div>
      ))}

      <SpeakerModal speaker={selectedSpeaker} onClose={handleClose} />

      <style jsx>{`
      `}</style>
    </section>
  );
}