import Head from 'next/head';
import path from 'path';
import { promises as fs } from 'fs';
import useTranslation from 'next-translate/useTranslation'

import Breadcrumb from '../../components/Breadcrumb';
import SpeakerList from '../../components/SpeakerList';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'speakers.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const speakers = JSON.parse(jsonData);
  return {
    props: { speakers }
  };
}

// "for BH" のスピーカーをバッフル径でソートし、さらに Qts の値でグルーピングする関数
const groupSpeakersByCategoriesAndQts = (speakers) => {
  // "for BH" を含むスピーカーのみを抽出
  const forBhSpeakers = speakers
    .filter((speaker) => speaker.category.includes('for BH'))
    .map((speaker) => ({
      ...speaker,
      baffleHoleDiameter: speaker.otherParameters?.baffleHoleDiameter?.value || Infinity, // バッフル径を追加
      Qts: speaker.lossFactors?.Qts?.value || Infinity, // Qts を追加
    }))
    .sort((a, b) => {
      // バッフル径でソート
      if (a.baffleHoleDiameter !== b.baffleHoleDiameter) {
        return a.baffleHoleDiameter - b.baffleHoleDiameter;
      }
      // バッフル径が同じ場合はリリース年でソート
      const releaseYearA = parseInt(a.release?.slice(0, 4), 10) || 1970;
      const releaseYearB = parseInt(b.release?.slice(0, 4), 10) || 1970;
      return releaseYearB - releaseYearA;
    });

  // Qts の値でグルーピング
  const groupedByQts = {};
  forBhSpeakers.forEach((speaker) => {
    const qtsKey = speaker.Qts.toFixed(2); // Qts の値をキーとして使用（小数点以下2桁）
    if (!groupedByQts[qtsKey]) {
      groupedByQts[qtsKey] = [];
    }
    groupedByQts[qtsKey].push(speaker);
  });

  // グルーピング結果を配列に変換して Qts の昇順でソート
  return Object.entries(groupedByQts)
    .sort(([qtsA], [qtsB]) => parseFloat(qtsA) - parseFloat(qtsB))
    .map(([qts, speakers]) => ({
      Qts: parseFloat(qts),
      speakers,
    }));
};

export default function GroupedByCategories({ speakers }) {
  const { t } = useTranslation('common');

  const groupedSpeakers = groupSpeakersByCategoriesAndQts(speakers);

  return (
    <section>
      <Head>
        <title>{t('speakers_dir.grouped_by_categories.title')} / {t('speakers_dir.title')} - {t('title')}</title>
      </Head>
      <Breadcrumb />

      <h2 className="mt-4 mb-4 text-2xl text-center font-bold text-gray-900 tracking-wide">
        <small>{t('speakers_dir.title')}</small><br />
        {t('speakers_dir.for_backloadedhorn.title')}
      </h2>
      <p className="mb-8 leading-7">{t('speakers_dir.for_backloadedhorn.abst')}</p>

      {groupedSpeakers.map((group, groupIndex) => (
        <div key={groupIndex} id={group.category} className="rounded-lg bg-gray-100 py-5 px-3 mb-10">
          <h3 className="mb-4 text-4xl font-bold text-blue-900 text-center">
            Qts (Q0): {group.Qts}
          </h3>
          <SpeakerList speakers={group.speakers} />
        </div>
      ))}

      <style jsx>{`
        h3,
        h4 {
          font-family: 'Fira Mono', monospace;
        }
        .speaker_cats {
          font-family: 'Fira Mono', monospace;
        }
      `}</style>
    </section>
  );
}
