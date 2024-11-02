import { useRouter } from 'next/router';
import Head from 'next/head';
import path from 'path';
import { promises as fs } from 'fs';
import en from '../../locales/en.json';
import ja from '../../locales/ja.json';
import Breadcrumb from '../../components/Breadcrumb'; // パンくずリストのインポート

import SpeakerList from '../../components/SpeakerList';

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

// バッフル経±1mmでグループ化し、さらにmountingHolesごとにサブグループ化する関数
const groupSpeakersByBaffleHoleDiameter = (speakers) => {
  // バッフル経±1mmでグループ化
  const groupedSpeakers = speakers.reduce((groups, speaker) => {
    const diameter = speaker.otherParameters?.baffleHoleDiameter?.value || 0;

    let foundGroup = groups.find(group =>
      Math.abs(group.diameter - diameter) <= 1
    );

    if (!foundGroup) {
      foundGroup = {
        diameter,
        speakers: [],
      };
      groups.push(foundGroup);
    }

    foundGroup.speakers.push(speaker);

    return groups;
  }, []);

  // 各バッフル経グループ内でmountingHolesごとにさらにグループ化
  const groupedByBaffleHole = groupedSpeakers.map(group => {
    const subGroups = group.speakers.reduce((subGroups, speaker) => {
      const hole = speaker.otherParameters?.mountingHoles?.value || 0;

      if (!subGroups[hole]) {
        subGroups[hole] = [];
      }

      subGroups[hole].push(speaker);

      return subGroups;
    }, {});

    return {
      diameter: group.diameter,
      subGroups,
    };
  });

  // グループ全体をバッフル経が小さい順に並べ替え
  groupedByBaffleHole.sort((a, b) => a.diameter - b.diameter);

  // 各サブグループ内をリリース年（または年月）が新しい順に並べ替える
  groupedByBaffleHole.forEach(group => {
    Object.values(group.subGroups).forEach(subGroup => {
      subGroup.sort((a, b) => {
        const releaseA = a.release || '1970';
        const releaseB = b.release || '1970';
        return releaseB.slice(0, 4) - releaseA.slice(0, 4);
      });
    });
  });

  return groupedByBaffleHole;
};

export default function BackloadedHornSpeakers({ speakers }) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'ja' ? ja : en;

  // スピーカーをbaffleHoleDiameterの値でグループ化し、さらにmountingHolesでサブグループ化
  const groupedSpeakers = groupSpeakersByBaffleHoleDiameter(speakers);

  return (
    <section>
      <Head>
        <title>{`${t.speakers_dir.grouped_by_baffle_hole_diameter.title} / ${t.speakers_dir.title} - ${t.title}`}</title>
      </Head>
      <Breadcrumb />

      <h2 className="mt-4 mb-4 text-2xl text-center font-bold text-gray-900 tracking-wide">
        <small>{t.speakers_dir.title}</small><br />
        {t.speakers_dir.grouped_by_baffle_hole_diameter.title}
      </h2>

      {groupedSpeakers.map((group, groupIndex) => (
        <div key={groupIndex} className="rounded-lg bg-gray-100 py-5 px-3 mb-10">
          <h3 className="mb-4 text-4xl font-bold text-blue-900 text-center">
            {t.speakers_dir.grouped_by_baffle_hole_diameter.baffle_hole_diameter}: Φ{group.diameter}mm ±1mm
          </h3>
          {Object.entries(group.subGroups).map(([hole, speakers], subGroupIndex) => (
            <div key={subGroupIndex} className="mb-6">
              <h4 className="mb-2 text-2xl font-semibold text-gray-700 text-center">Mounting Holes: {hole}</h4>
              <SpeakerList speakers={speakers} />
            </div>
          ))}
        </div>
      ))}

      <style jsx>{`
        h3,
        h4 {
          font-family: 'Fira Mono', monospace;
        }
      `}</style>
    </section>
  );
}
