import { useRouter } from 'next/router';
import Head from 'next/head';
import path from 'path';
import { promises as fs } from 'fs';
import useTranslation from 'next-translate/useTranslation';
import Breadcrumb from '../../components/Breadcrumb';
import EnclosureImageSection from '../../components/EnclosureImageSection';
import LinkedSpeakerUnits from '../../components/LinkedSpeakerUnits';

export async function getStaticProps({ params }) {
  const enclosuresPath = path.join(process.cwd(), 'public', 'enclosures.json');
  const speakersPath = path.join(process.cwd(), 'public', 'speakers.json');
  const enclosureJsonData = await fs.readFile(enclosuresPath, 'utf8');
  const speakersJsonData = await fs.readFile(speakersPath, 'utf8');

  const allEnclosures = JSON.parse(enclosureJsonData);
  const allSpeakers = JSON.parse(speakersJsonData);
  const enclosure = allEnclosures.find((value) => value.id === params.id);

  if (!enclosure) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      enclosure,
      allSpeakers,
    },
  };
}

export async function getStaticPaths({ locales = [] }) {
  const filePath = path.join(process.cwd(), 'public', 'enclosures.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const enclosures = JSON.parse(jsonData);

  const paths = enclosures.flatMap((enclosure) =>
    (locales.length ? locales : ['en', 'ja']).map((locale) => ({
      params: { id: enclosure.id },
      locale,
    }))
  );

  return {
    paths,
    fallback: false,
  };
}

export default function EnclosureDetail({ enclosure, allSpeakers }) {
  if (!enclosure) return null;

  const router = useRouter();
  const { t: tCommon, lang } = useTranslation('common');
  const languageData = lang === 'ja' ? enclosure.ja : enclosure.en;

  if (router.isFallback) {
    return <p>Now Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>
          {tCommon('enclosures_dir.enclosures_id_title')} {enclosure.brand} {enclosure.name} - {tCommon('title')}
        </title>
      </Head>
      <Breadcrumb />

      <h2 className="mt-4 mb-4 text-2xl text-center font-bold text-gray-900 tracking-wide">
        {tCommon('enclosures_dir.enclosures_id_title')}
        <br />
        <span className="text-orange-600 text-3xl">{enclosure.brand}</span>&nbsp;
        <span className="text-3xl" title={enclosure.model}>{enclosure.name}</span>
      </h2>

      <p className="mb-4 text-gray-700">{languageData?.descriptionText}</p>

      <EnclosureImageSection enclosure={enclosure} locale={lang} />

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-3">{lang === 'ja' ? '基本仕様' : 'Basic specifications'}</h3>
        <div className="bg-gray-100 rounded p-4 space-y-2">
          <p>
            {lang === 'ja' ? '外径寸法' : 'External dimensions'}: W{enclosure.dimensions?.width?.value}
            ×H{enclosure.dimensions?.height?.value}×D{enclosure.dimensions?.depth?.value} {enclosure.dimensions?.width?.unit}
          </p>
          <p>{lang === 'ja' ? '推奨材質' : 'Recommended material'}: {enclosure.specifications?.recommendedMaterial}</p>
          <p>
            {lang === 'ja' ? '板材厚さ' : 'Panel thickness'}: {enclosure.specifications?.panelThickness?.value}
            {enclosure.specifications?.panelThickness?.unit}
          </p>
          <p>
            {lang === 'ja' ? '完成重量' : 'Finished weight'}: {enclosure.specifications?.finishedWeight?.value}
            {enclosure.specifications?.finishedWeight?.unit}
          </p>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-3">{lang === 'ja' ? '音道パラメータ' : 'Acoustic path parameters'}</h3>
        <div className="bg-gray-100 rounded p-4 space-y-2">
          <p>
            {lang === 'ja' ? 'バックキャビティー容積' : 'Back cavity volume'}: {enclosure.specifications?.backCavityVolume?.value}
            {enclosure.specifications?.backCavityVolume?.unit}
          </p>
          <p>
            {lang === 'ja' ? 'スロート断面積' : 'Throat cross-section area'}: {enclosure.specifications?.throatCrossSectionArea?.value}
            {enclosure.specifications?.throatCrossSectionArea?.unit}
          </p>
          <p>
            {lang === 'ja' ? '最終開口部面積' : 'Final opening area'}: {enclosure.specifications?.finalOpeningArea?.value}
            {enclosure.specifications?.finalOpeningArea?.unit}
          </p>
          <p>
            {lang === 'ja' ? '音道長' : 'Sound path length'}: {enclosure.specifications?.soundPathLength?.value}
            {enclosure.specifications?.soundPathLength?.unit}
          </p>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-3">{lang === 'ja' ? 'マウント情報' : 'Mount information'}</h3>
        <div className="bg-gray-100 rounded p-4">
          <p>
            {lang === 'ja' ? 'スピーカー取付穴径' : 'Speaker mount hole diameter'}: Φ
            {enclosure.specifications?.speakerMountHoleDiameter?.value}
            {enclosure.specifications?.speakerMountHoleDiameter?.unit}
          </p>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-3">{lang === 'ja' ? '適合スピーカーユニット' : 'Linked speaker units'}</h3>
        <LinkedSpeakerUnits
          speakerIds={enclosure.linkedSpeakerUnitIds}
          allSpeakers={allSpeakers}
          mountHoleDiameter={enclosure.specifications?.speakerMountHoleDiameter?.value}
          locale={lang}
        />
      </section>
    </div>
  );
}
