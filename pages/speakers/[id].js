import { useRouter } from 'next/router';
import Head from 'next/head';
import path from 'path';
import { promises as fs } from 'fs';
import en from '../../locales/en.json';
import ja from '../../locales/ja.json';

// スピーカーのデータを取得
export async function getStaticProps({ params }) {
  // JSONファイルのパスを取得
  const filePath = path.join(process.cwd(), 'public', 'speakers.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const speakers = JSON.parse(jsonData);

  // パラメータのIDに基づいてスピーカーを検索
  const speaker = speakers.find(s => s.id === params.id);

  // スピーカーが見つからなければ404エラーを返す
  if (!speaker) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      speaker
    }
  };
}

// 全てのスピーカーのIDを動的に取得
export async function getStaticPaths() {
  // JSONファイルのパスを取得
  const filePath = path.join(process.cwd(), 'public', 'speakers.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const speakers = JSON.parse(jsonData);

  // スピーカーごとのパスを生成
  const paths = speakers.map(speaker => ({
    params: { id: speaker.id }
  }));

  return {
    paths,
    fallback: false // 存在しないページは404にする
  };
}

export default function SpeakerDetail({ speaker }) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'ja' ? ja : en;

  return (
    <div>
      <Head>
        <title>{`${speaker.name} - ${t.backloadedhorn_speakers.title}`}</title>
      </Head>
      <h1 className="text-3xl font-bold">{speaker.name}</h1>
      <p>{speaker.ja.frameText || speaker.en.frameText}</p>
      <p>{`${t.backloadedhorn_speakers.baffle_hole_diameter}: Φ${speaker.otherParameters.baffleHoleDiameter.value}mm`}</p>
      <p>{`${t.backloadedhorn_speakers.release}: ${speaker.release}`}</p>
      <p>{`${t.backloadedhorn_speakers.price}: ¥${speaker.price}`}</p>

      {/* スピーカーのその他の情報もここに表示 */}

      <style jsx>{`
        .speaker-detail {
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
