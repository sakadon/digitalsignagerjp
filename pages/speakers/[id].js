import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import path from 'path';
import { promises as fs } from 'fs';
import useTranslation from 'next-translate/useTranslation'
import Breadcrumb from '../../components/Breadcrumb'; // パンくずリストのインポート

// スピーカーのデータを取得
export async function getStaticProps({ params }) {
  // JSONファイルのパスを取得
  const filePath = path.join(process.cwd(), 'public', 'speakers.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const speakers = JSON.parse(jsonData);

  // パラメータのIDに基づいてスピーカーを検索
  const speaker = speakers.find(s => s.id === params.id);

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


export default function SpeakerDetail({ speaker }) {
  if (!speaker) return null;

  const router = useRouter();

  const { t, lang } = useTranslation('speakers');
  const { t: tCommon } = useTranslation('common');
  const languageData = lang === 'ja' ? speaker.ja : speaker.en; // `useTranslation`から取得した`lang`を使用

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

      <p className="mb-4 text-center">
        <span className="mr-5 font-bold">{languageData.categoryText}</span>

        {languageData.releaseText && (
          <time className="mr-5 text-red-800" title={speaker.release}>{languageData.releaseText}</time>
        )}

        {languageData.priceText}<br />

        {languageData.frameText && (
          <span>{languageData.frameText}</span>
        )}
      </p>


      <div className="speaker_cats mb-4 flex flex-wrap gap-2">
        {speaker.category && speaker.category.map((cat, index) => (
          <Link className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-s" key={index} href={`/speakers/grouped_by_categories#${cat}`}>{cat}</Link>
        ))}
      </div>

      <table className="table-auto w-full mb-4 border-collapse" style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th className="border px-4 py-2 w-1/3">Thiele&amp;Small Parameters</th>
            <th className="border px-4 py-2 w-1/3">Voice Coil Parameters</th>
            <th className="border px-4 py-2 w-1/3">Mechanical Parameters</th>
          </tr>
        </thead>
        <tbody className="speaker_spec_table">
          <tr>
            <td className="border px-4 py-2 align-top">
              {speaker.electricalParameters?.fs?.value && (
                <p><abbr title="Resonance Frequency">fs</abbr>: {speaker.electricalParameters.fs.value} {speaker.electricalParameters.fs.unit}</p>
              )}
              {speaker.lossFactors?.Qms?.value && (
                <p><abbr title="Mechanical Quality Factor">Qms</abbr>: {speaker.lossFactors.Qms.value}</p>
              )}
              {speaker.lossFactors?.Qes?.value && (
                <p><abbr title="Electrical Quality Factor">Qes</abbr>: {speaker.lossFactors.Qes.value}</p>
              )}
              {speaker.lossFactors?.Qts?.value && (
                <p className="text-red-800"><abbr title="Total Quality Factor">Qts</abbr> (Q0): {speaker.lossFactors.Qts.value}</p>
              )}
            </td>

            <td className="border px-4 py-2 align-top">
              {speaker.electricalParameters?.nominalImpedance?.value && (
                <p className="text-red-800"><abbr title="Nominal Impedance">Z</abbr>: {speaker.electricalParameters.nominalImpedance.value} {speaker.electricalParameters.nominalImpedance.unit}</p>
              )}
              {speaker.electricalParameters?.Re?.value && (
                <p><abbr title="DC Resistance">Re</abbr>: {speaker.electricalParameters.Re.value} {speaker.electricalParameters.Re.unit}</p>
              )}
              {speaker.electricalParameters?.Le?.value && (
                <p><abbr title="Inductance (1kHz)">Le</abbr>: {speaker.electricalParameters.Le.value} {speaker.electricalParameters.Le.unit}</p>
              )}
              {speaker.otherParameters?.voiceCoilDiameter?.value && (
                <p><abbr title="Voice Coil">VC</abbr> Diameter: {speaker.otherParameters.voiceCoilDiameter.value} {speaker.otherParameters.voiceCoilDiameter.unit}</p>
              )}
            </td>

            <td className="border px-4 py-2 align-top">

              {speaker.mechanicalParameters?.Mms?.value  && (
                <p><abbr title="Moving Mass">Mms</abbr>: {speaker.mechanicalParameters.Mms.value} {speaker.mechanicalParameters.Mms.unit}</p>
              )}
              {speaker.mechanicalParameters?.Cms?.value && (
                <p><abbr title="Suspension Compliance">Cms</abbr>: {speaker.mechanicalParameters.Cms.value} {speaker.mechanicalParameters.Cms.unit}</p>
              )}
              {speaker.otherParameters?.equivalentDiaphragmRadius?.value && (
                <p><abbr title="Equivalent Diaphragm Radius">Diaphragm R</abbr>: {speaker.otherParameters.equivalentDiaphragmRadius.value} {speaker.otherParameters.equivalentDiaphragmRadius.unit}</p>
              )}
              {speaker.mechanicalParameters?.Bl?.value && (
                <p><abbr title="Magnet Force Factor">Bl</abbr>: {speaker.mechanicalParameters.Bl.value} {speaker.mechanicalParameters.Bl.unit}</p>
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
        <tbody className="speaker_spec_table">
          <tr>
            <td className="border px-4 py-2 align-top">
              {speaker.otherParameters?.SPL?.value && (
                <p><abbr title="Sound Pressure Level">SPL</abbr>: {speaker.otherParameters.SPL.value} {speaker.otherParameters.SPL.unit}</p>
              )}
              {speaker.otherParameters?.Vas?.value && (
                <p><abbr title="Compliance Equivalent Volume">Vas</abbr>: {speaker.otherParameters.Vas.value} {speaker.otherParameters.Vas.unit}</p>
              )}
              {speaker.otherParameters?.baffleHoleDiameter?.value && (
                <p>Baffle Hole Diameter: Φ{speaker.otherParameters.baffleHoleDiameter.value} {speaker.otherParameters.baffleHoleDiameter.unit}</p>
              )}
              {speaker.otherParameters?.baffleHole?.value && (
                <p>Baffle Hole: {speaker.otherParameters.baffleHole.value} Hole</p>
              )}
              {speaker.otherParameters?.depth?.value && (
                <p>Depth: {speaker.otherParameters.depth.value} {speaker.otherParameters.depth.unit}</p>
              )}
              {speaker.otherParameters?.reproductionFrequencyResponse?.value && (
                <p><abbr title="Reproduction Frequency Response">Frequency Response</abbr>: {speaker.otherParameters.reproductionFrequencyResponse.value}</p>
              )}
              {speaker.otherParameters?.recommendedEnclosure?.value && (
                <p>Recommended Enclosure: {speaker.otherParameters.recommendedEnclosure.value}</p>
              )}
            </td>

            <td className="border px-4 py-2 align-top">
              {speaker.otherParameters?.ratedInput?.value && (
                <p><abbr title="Nominal Rated Input">Nom.</abbr>: {speaker.otherParameters.ratedInput.value} {speaker.otherParameters.ratedInput.unit}</p>
              )}
              {speaker.otherParameters?.maxInput?.value && (
                <p><abbr title="Maximum Music Power (Rated Input)">Mus.</abbr>: {speaker.otherParameters.maxInput.value} {speaker.otherParameters.maxInput.unit}</p>
              )}
              {speaker.otherParameters?.overallDiameter?.value && (
                <p>Overall Diameter: {speaker.otherParameters.overallDiameter.value} {speaker.otherParameters.overallDiameter.unit}</p>
              )}
              {speaker.otherParameters?.magnetWeight?.value && (
                <p>Magnet Weight: {speaker.otherParameters.magnetWeight.value} {speaker.otherParameters.magnetWeight.unit}</p>
              )}
              {speaker.otherParameters?.netWeight?.value && (
                <p>Net Weight: {speaker.otherParameters.netWeight.value} {speaker.otherParameters.netWeight.unit}</p>
              )}
              {speaker.limited !== undefined && (
                <p>Limited Edition: {speaker.limited ? 'Yes' : 'No'}</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {speaker.recommendedEnclosureList && speaker.recommendedEnclosureList.length > 0 && (
        <div className="mb-5">
          <h3 className="text-xl font-semibold mb-2">Recommended Enclosure List</h3>
          <ul className="list-disc list-inside">
            {speaker.recommendedEnclosureList.map((enclosure, index) => (
              <li key={index}>{enclosure}</li>
            ))}
          </ul>
        </div>
      )}

    {speaker.image && Object.keys(speaker.image).filter(key => key !== 'main' && key !== 'sub' && speaker.image[key]).length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Images</h3>
          {Object.entries(speaker.image)
            .filter(([key, img]) => key !== 'main' && key !== 'sub' && img) // main, sub以外の画像がある場合のみ
            .map(([key, img], index) => (
              <div key={index} className="flex flex-col items-center mb-5">
                <h4 className="font-medium mb-1 text-sm">{key}</h4>
                <img
                  src={img}
                  alt={`${speaker.brand} ${speaker.name} - ${key}`}
                  className="w-2/3 h-auto object-contain rounded"
                  onError={(e) => e.target.style.display = 'none'} // 画像エラーの場合非表示
                />
              </div>
            ))}
        </div>
      )}

      <style jsx>{`
        .speaker_cats {
          font-family: 'Fira Mono', monospace;
        }

        .speaker_spec_table {
          font-family: 'Fira Mono', monospace;
        }
      `}</style>

    </div>
  );
}
