import { useRouter } from 'next/router';
import Head from 'next/head';
import path from 'path';
import { promises as fs } from 'fs';
import en from '../../locales/en.json';
import ja from '../../locales/ja.json';

import SpeakerList from '../../components/SpeakerList';

export async function getStaticProps() {
  // JSONファイルのパスを取得
  const filePath = path.join(process.cwd(), 'public', 'speakers.json');
  // JSONファイルの内容を読み込む
  const jsonData = await fs.readFile(filePath, 'utf8');
  // JSONデータをオブジェクトに変換
  const speakers = JSON.parse(jsonData);

  const data = {};

  return {
    props: {
      data,
      speakers
    }
  };
}

// ±3mm以内の値を持つスピーカーをグループ化し、各グループをバッフル経が小さい順、リリース年が新しい順に並べ替える
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
  const sortedGroups = groupedSpeakers.sort((a, b) =>
    a[0].otherParameters.baffleHoleDiameter.value - b[0].otherParameters.baffleHoleDiameter.value
  );

  // 各グループ内をリリース年（または年月）が新しい順に並べ替える
  sortedGroups.forEach(group => {
    group.sort((a, b) => {
      const releaseA = a.release || '1970';  // releaseがない場合は古いデフォルトの年
      const releaseB = b.release || '1970';

      const yearA = releaseA.slice(0, 4);  // 年を取り出す
      const yearB = releaseB.slice(0, 4);

      return yearB - yearA;  // 新しい年が先に来るようにソート
    });
  });

  return sortedGroups;
};

export default function BackloadedHornSpeakers({ data, speakers }) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'ja' ? ja : en;

  // スピーカーをbaffleHoleDiameterの値でグループ化
  const groupedSpeakers = groupSpeakersByBaffleHoleDiameter(speakers);

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
          <SpeakerList speakers={group} />
        </div>
      ))}

      <style jsx>{`
      `}</style>
    </section>
  );
}
