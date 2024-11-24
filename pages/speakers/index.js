import Head from 'next/head';
import path from 'path';
import { promises as fs } from 'fs';
import useTranslation from 'next-translate/useTranslation'
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

// JSONデータをbrandでグループ化し、リリース順にソートする関数
const groupByBrandAndSortByRelease = (speakers) => {
  const grouped = speakers.reduce((brands, speaker) => {
    const brand = speaker.brand;
    if (!brands[brand]) {
      brands[brand] = [];
    }
    brands[brand].push(speaker);
    return brands;
  }, {});

  // 各ブランド内でリリース年順に並べ替え
  Object.keys(grouped).forEach((brand) => {
    grouped[brand] = grouped[brand].sort((a, b) => {
      const releaseA = parseInt(a.release?.slice(0, 4), 10) || 1970; // 数値に変換、デフォルト1970
      const releaseB = parseInt(b.release?.slice(0, 4), 10) || 1970; // 数値に変換、デフォルト1970
      return releaseB - releaseA; // 新しい順
    });
  });

  return grouped;
};

export default function SpeakersAllList({ speakers }) {
  const { t } = useTranslation('common'); // `speakers.json`の翻訳ファイルを使用

  // スピーカーをbrandごとにグループ化
  const groupedSpeakers = groupByBrandAndSortByRelease(speakers);

  return (
    <section>
      <Head>
        <title>{t('speakers_dir.title')} - {t('title')}</title>
      </Head>
      <Breadcrumb />

      <h2 className="mt-4 mb-4 text-2xl text-center font-bold text-gray-900 tracking-wide">
        {t('speakers_dir.title')}
      </h2>
      <p className="mb-4">{t('speakers_dir.abst')}</p>

      {/* ブランドごとにスピーカーリストを表示 */}
      {Object.keys(groupedSpeakers).map((brand) => (
        <div key={brand} className="rounded-lg bg-gray-100 py-5 px-3 mb-10">
          <h3 className="mb-4 text-4xl font-bold text-blue-900 text-center">{brand}</h3>
          <SpeakerList speakers={groupedSpeakers[brand]} />
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
