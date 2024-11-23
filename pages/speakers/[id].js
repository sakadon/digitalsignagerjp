import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import path from 'path';
import { promises as fs } from 'fs';
import useTranslation from 'next-translate/useTranslation'
import Breadcrumb from '../../components/Breadcrumb'; // パンくずリストのインポート
import SpeakerTextJa from '../../components/SpeakerTextJa';
import SpeakerTextEn from '../../components/SpeakerTextEn';
import SpeakerParametersEn from '../../components/SpeakerParametersEn';
import SpeakerImageListEn from '../../components/SpeakerImageListEn';
import SpeakerLabel from '../../components/SpeakerLabel';
import RelatedSpeakersList from '../../components/RelatedSpeakersList';

// スピーカーのデータを取得
export async function getStaticProps({ params }) {
  // JSONファイルのパスを取得
  const filePath = path.join(process.cwd(), 'public', 'speakers.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const allSpeakers = JSON.parse(jsonData);

  // パラメータのIDに基づいてスピーカーを検索
  const speaker = allSpeakers.find(s => s.id === params.id);

  // スピーカーが見つからない場合は404エラーを返す
  if (!speaker) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      speaker,
      allSpeakers, // 全スピーカーのデータも渡す
    }
  };
}

// 全てのスピーカーのIDを動的に取得
export async function getStaticPaths({ locales = [] }) { // localesがundefinedの場合は空配列を使用
  const filePath = path.join(process.cwd(), 'public', 'speakers.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const speakers = JSON.parse(jsonData);

  const paths = speakers.flatMap((speaker) =>
    (locales.length ? locales : ['en', 'ja']).map((locale) => ({ // 空配列の場合にデフォルト言語を指定
      params: { id: speaker.id },
      locale,
    }))
  );

  return {
    paths,
    fallback: false,
  };
}

export default function SpeakerDetail({ speaker, allSpeakers}) {
  if (!speaker) return null;

  const router = useRouter();

  const { t, lang } = useTranslation('speakers');
  const { t: tCommon } = useTranslation('common');
  const languageData = lang === 'ja' ? speaker.ja : speaker.en;

  if (router.isFallback) {
    return <p>Now Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>{tCommon('speakers_dir.speakers_id_title')} {speaker.brand} {speaker.name} - {tCommon('title')}</title>
      </Head>
      <Breadcrumb />

      <h2 className="mt-4 mb-4 text-2xl text-center font-bold text-gray-900 tracking-wide">
        {tCommon('speakers_dir.speakers_id_title')}<br />
        <span className="text-orange-600 text-3xl">{speaker.brand}</span>&nbsp;
        <span className="text-3xl" title={speaker.model}>{speaker.name}</span>
      </h2>

      {/* 1番目と2番目の画像を横並びで表示 */}
      <div className="flex flex-wrap gap-2 justify-center">
        {speaker.image && Object.values(speaker.image).slice(0, 2).map((img, index) => (
          img && (
            <img
              key={index}
              src={img}
              alt={`${speaker.brand} ${speaker.name}`}
              className="w-56 h-56 object-contain rounded"
              onError={(e) => e.target.style.display = 'none'} // 画像がエラーの場合に非表示にする
            />
          )
        ))}
      </div>

      <SpeakerLabel speaker={speaker} languageData={languageData} />

      <div className="speaker_cats mb-4 flex flex-wrap gap-2">
        {speaker.category && speaker.category.map((cat, index) => (
          <Link className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-s" key={index} href={`/speakers/grouped_by_categories#${cat}`}>{cat}</Link>
        ))}
      </div>

      {lang === 'ja' ? (
        <SpeakerTextJa speaker={speaker} languageData={languageData} />
      ) : (
        <SpeakerTextEn speaker={speaker} languageData={languageData} />
      )}

      <SpeakerParametersEn speaker={speaker} />

      <SpeakerImageListEn speaker={speaker} />

      <RelatedSpeakersList speaker={speaker} allSpeakers={allSpeakers} tCommon={tCommon} />

      <style jsx>{`
        .speaker_cats {
          font-family: 'Fira Mono', monospace;
        }
      `}</style>

    </div>
  );
}
