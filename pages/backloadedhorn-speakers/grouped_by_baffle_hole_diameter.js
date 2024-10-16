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

// ±3mm以内の値を持つスピーカーをグループ化
// スピーカーをバッフル経が小さい順にグループ化して並べ替える
const groupSpeakersByBaffleHoleDiameter = (speakers) => {
  const groupedSpeakers = speakers.reduce((groups, speaker) => {
    const diameter = speaker.otherParameters.baffleHoleDiameter.value;
    let foundGroup = false;

    for (const group of groups) {
      const referenceDiameter = group[0].otherParameters.baffleHoleDiameter.value;
      if (Math.abs(referenceDiameter - diameter) <= 3) {
        group.push(speaker);
        foundGroup = true;
        break;
      }
    }

    if (!foundGroup) {
      groups.push([speaker]); // 新しいグループを作成
    }

    return groups;
  }, []);

  // グループ全体をバッフル経が小さい順に並べ替え
  return groupedSpeakers.sort((a, b) => a[0].otherParameters.baffleHoleDiameter.value - b[0].otherParameters.baffleHoleDiameter.value);
};



export default function BackloadedHornSpeakers({ data, speakers }) {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const router = useRouter();
  const { locale, query } = router;
  const t = locale === 'ja' ? ja : en;
  const td = locale === 'ja' ? data.ja : data.en;

  // スピーカーをbaffleHoleDiameterの値でグループ化
  const groupedSpeakers = groupSpeakersByBaffleHoleDiameter(speakers);

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
        <title>{`${t.backloadedhorn_speakers.grouped_by_baffle_hole_diameter} / ${t.backloadedhorn_speakers.title} - Digital Signager}`}</title>
      </Head>
      <h2 className="mt-4 mb-4 text-2xl text-center font-bold text-gray-900 tracking-wide">{t.backloadedhorn_speakers.title}</h2>

      <h3 className="mt-8 mb-4 text-4xl font-bold text-green-600 text-center">{t.backloadedhorn_speakers.grouped_by_baffle_hole_diameter}</h3>
      {groupedSpeakers.map((group, groupIndex) => (
        <div key={groupIndex} className="mt-4 mb-8">
          <h4 className="mt-4 mb-4 text-2xl font-bold text-green-800">{t.backloadedhorn_speakers.baffle_hole_diameter}: Φ{group[0].otherParameters.baffleHoleDiameter.value}mm ±3mm</h4>
          <SpeakerList speakers={group} onSelect={handleClick} />
        </div>
      ))}

      <SpeakerModal speaker={selectedSpeaker} onClose={handleClose} />

      <style jsx>{`
      `}</style>
    </section>
  );
}