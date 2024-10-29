import { useRouter } from 'next/router';
import Head from 'next/head';
import path from 'path';
import { promises as fs } from 'fs';
import en from '../../locales/en.json';
import ja from '../../locales/ja.json';
import Breadcrumb from '../../components/Breadcrumb'; // パンくずリストのインポート

// スピーカーのデータを取得
export async function getStaticProps({ params }) {
  console.log('getStaticProps called with params:', params); // 追加: パラメータの確認

  // JSONファイルのパスを取得
  const filePath = path.join(process.cwd(), 'public', 'speakers.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const speakers = JSON.parse(jsonData);

  // パラメータのIDに基づいてスピーカーを検索
  const speaker = speakers.find(s => s.id === params.id);

  console.log('Found speaker:', speaker); // 追加: スピーカーが見つかったかどうか確認

  // スピーカーが見つからない場合は404エラーを返す
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
export async function getStaticPaths({ locales }) {
  // JSONファイルのパスを取得
  const filePath = path.join(process.cwd(), 'public', 'speakers.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const speakers = JSON.parse(jsonData);

  // 各言語ごとのパスを生成
  const paths = [];
  speakers.forEach((speaker) => {
    locales.forEach((locale) => {
      paths.push({
        params: { id: speaker.id },
        locale: locale, // 各言語用のパスを生成
      });
    });
  });

  console.log('Generated paths:', paths); // 追加: pathsの確認

  return {
    paths,
    fallback: false // 存在しないページは404エラーにする
  };
}


export default function SpeakerDetail({ speaker }) {
  if (!speaker) return null;

  const router = useRouter();
  const t = router.locale === 'ja' ? ja : en;
  const languageData = router.locale === 'ja' ? speaker.ja : speaker.en; // ロケールに基づいてテキストを選択


  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>スピーカーユニット詳細 {speaker.brand} {speaker.name} - {t.title}</title>
      </Head>
      <Breadcrumb />

      <h2 className="mt-4 mb-4 text-2xl text-center font-bold text-gray-900 tracking-wide">
        スピーカーユニット詳細<br />
        <span className="text-orange-600 text-3xl">{speaker.brand}</span>&nbsp;
        <span className="text-3xl" title={speaker.model}>{speaker.name}</span>
      </h2>

      {/* 1番目と2番目の画像を横並びで表示 */}
      <div className="flex flex-wrap gap-2 justify-center">
        {speaker.image && Object.values(speaker.image).slice(0, 2).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${speaker.brand} ${speaker.name}`}
            className="w-56 h-56 object-contain rounded"
            onError={(e) => e.target.src = '/images/no-image.jpg'} // 画像がない場合に代替画像を表示
          />
        ))}
      </div>

      <p className="mb-4 text-center">
        <span className="mr-5 font-bold">{languageData.categoryText}</span>
        <time className="mr-5 text-red-800" title={speaker.release}>{languageData.releaseText}</time>
        {languageData.priceText}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {speaker.category && speaker.category.map((cat, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
            {cat}
          </span>
        ))}
      </div>

      <table className="table-auto w-full mb-4 border-collapse" style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th className="border px-4 py-2 w-1/3">Loss Factors</th>
            <th className="border px-4 py-2 w-1/3">Electrical Parameters</th>
            <th className="border px-4 py-2 w-1/3">Mechanical Parameters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2 align-top">
              {speaker.lossFactors?.Qts?.value && (
                <p className="text-red-800">Qts (Q0): {speaker.lossFactors.Qts.value}</p>
              )}
              {speaker.lossFactors?.Qms?.value && (
                <p>Qms: {speaker.lossFactors.Qms.value}</p>
              )}
              {speaker.lossFactors?.Qes?.value && (
                <p>Qes: {speaker.lossFactors.Qes.value}</p>
              )}
            </td>

            <td className="border px-4 py-2 align-top">
              {speaker.electricalParameters?.Re?.value && speaker.electricalParameters?.Re?.unit && (
                <p>Re: {speaker.electricalParameters.Re.value} {speaker.electricalParameters.Re.unit}</p>
              )}
              {speaker.electricalParameters?.Le?.value && speaker.electricalParameters?.Le?.unit && (
                <p>Le: {speaker.electricalParameters.Le.value} {speaker.electricalParameters.Le.unit}</p>
              )}
              {speaker.electricalParameters?.fs?.value && speaker.electricalParameters?.fs?.unit && (
                <p>fs: {speaker.electricalParameters.fs.value} {speaker.electricalParameters.fs.unit}</p>
              )}
            </td>

            <td className="border px-4 py-2 align-top">
              {speaker.mechanicalParameters?.Mms?.value && speaker.mechanicalParameters?.Mms?.unit && (
                <p>Mms: {speaker.mechanicalParameters.Mms.value} {speaker.mechanicalParameters.Mms.unit}</p>
              )}
              {speaker.mechanicalParameters?.Cms?.value && speaker.mechanicalParameters?.Cms?.unit && (
                <p>Cms: {speaker.mechanicalParameters.Cms.value} {speaker.mechanicalParameters.Cms.unit}</p>
              )}
              {speaker.mechanicalParameters?.Bl?.value && speaker.mechanicalParameters?.Bl?.unit && (
                <p>Bl: {speaker.mechanicalParameters.Bl.value} {speaker.mechanicalParameters.Bl.unit}</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <table className="table-auto w-full mb-4 border-collapse" style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th className="border px-4 py-2 w-1/3">Enclosure Parameters</th>
            <th className="border px-4 py-2 w-1/3">Other Parameters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2 align-top">
              {languageData.frameText && (
                <p>{languageData.frameText}</p>
              )}
              {speaker.otherParameters.baffleHoleDiameter && (
                <p>Baffle Hole Diameter: Φ{speaker.otherParameters.baffleHoleDiameter.value}{' '}
                  {speaker.otherParameters.baffleHoleDiameter.unit}
                </p>
              )}
              {speaker.otherParameters.baffleHole && (
                <p>Baffle Hole: {speaker.otherParameters.baffleHole.value}</p>
              )}
              {speaker.otherParameters.overallDiameter && (
                <p>Overall Diameter: {speaker.otherParameters.overallDiameter.value}{' '}
                  {speaker.otherParameters.overallDiameter.unit}
                </p>
              )}
              {speaker.otherParameters.Vas && (
                <p>Vas: {speaker.otherParameters.Vas.value} {speaker.otherParameters.Vas.unit}</p>
              )}
              {speaker.otherParameters.reproductionFrequencyResponse && (
                <p>Reproduction Frequency Response: {speaker.otherParameters.reproductionFrequencyResponse.value}</p>
              )}
              {speaker.otherParameters.recommendedEnclosure && (
                <p>Recommended Enclosure: {speaker.otherParameters.recommendedEnclosure.value}</p>
              )}
            </td>

            <td className="border px-4 py-2 align-top">
              {speaker.electricalParameters.nominalImpedance && (
                <p className="text-red-800">
                  Nominal Impedance: {speaker.electricalParameters.nominalImpedance.value}{' '}
                  {speaker.electricalParameters.nominalImpedance.unit}
                </p>
              )}
              {speaker.otherParameters.ratedInput && (
                <p>
                  Rated Input: {speaker.otherParameters.ratedInput.value}{' '}
                  {speaker.otherParameters.ratedInput.unit}
                </p>
              )}
              {speaker.otherParameters.SPL && (
                <p>
                  SPL: {speaker.otherParameters.SPL.value}{' '}
                  {speaker.otherParameters.SPL.unit}
                </p>
              )}
              {speaker.otherParameters.equivalentDiaphragmRadius && (
                <p>
                  Equivalent Diaphragm Radius: {speaker.otherParameters.equivalentDiaphragmRadius.value}{' '}
                  {speaker.otherParameters.equivalentDiaphragmRadius.unit}
                </p>
              )}
              {speaker.otherParameters.voiceCoilDiameter && (
                <p>
                  Voice Coil Diameter: {speaker.otherParameters.voiceCoilDiameter.value}{' '}
                  {speaker.otherParameters.voiceCoilDiameter.unit}
                </p>
              )}
              {speaker.otherParameters.magnetWeight && (
                <p>
                  Magnet Weight: {speaker.otherParameters.magnetWeight.value}{' '}
                  {speaker.otherParameters.magnetWeight.unit}
                </p>
              )}
              {speaker.otherParameters.netWeight && (
                <p>
                  Net Weight: {speaker.otherParameters.netWeight.value}{' '}
                  {speaker.otherParameters.netWeight.unit}
                </p>
              )}
              {speaker.limited !== undefined && (
                <p>Limited Edition: {speaker.limited ? 'Yes' : 'No'}</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {speaker.recommendedEnclosureList && speaker.recommendedEnclosureList.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Recommended Enclosure List</h3>
          <ul className="list-disc list-inside">
            {speaker.recommendedEnclosureList.map((enclosure, index) => (
              <li key={index}>{enclosure}</li>
            ))}
          </ul>
        </div>
      )}

      {speaker.image && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Images</h3>
          <div className="flex flex-wrap gap-2 text-center flex-col items-center">
            {speaker.image && Object.values(speaker.image).slice(2).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${speaker.brand} ${speaker.name}`}
                className="w-4/5 h-auto object-contain rounded"
                onError={(e) => e.target.src = '/images/no-image.jpg'} // 画像がない場合に代替画像を表示
              />
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
      `}</style>

    </div>
  );
}
