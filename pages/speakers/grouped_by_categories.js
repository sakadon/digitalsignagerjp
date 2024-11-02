import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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

// カスタムソート関数: 数値を優先してソート
const customSortCategories = (a, b) => {
  const extractNumber = (str) => parseInt(str.match(/^\d+/), 10) || 0;
  const aNum = extractNumber(a);
  const bNum = extractNumber(b);
  if (aNum !== bNum) return aNum - bNum;
  return a.localeCompare(b);
};

// 各カテゴリのスピーカーをグループ化し、カスタムソートを適用する関数
const groupSpeakersByCategories = (speakers) => {
  const categoryGroups = {};
  speakers.forEach((speaker) => {
    speaker.category.forEach((cat) => {
      if (!categoryGroups[cat]) categoryGroups[cat] = [];
      categoryGroups[cat].push(speaker);
    });
  });

  return Object.entries(categoryGroups)
    .sort(([a], [b]) => customSortCategories(a, b))
    .map(([category, speakers]) => ({
      category,
      speakers: speakers.sort((a, b) => {
        const releaseA = a.release || '1970';
        const releaseB = b.release || '1970';
        return releaseB.slice(0, 4) - releaseA.slice(0, 4); // 新しい順
      })
    }));
};

export default function GroupedByCategories({ speakers }) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isMounted, setIsMounted] = useState(false);

  const groupedSpeakers = groupSpeakersByCategories(speakers);

  useEffect(() => setIsMounted(true), []);
  useEffect(() => {
    if (router.isReady && window.location.hash) {
      const elementId = window.location.hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [router.isReady]);

  if (!isMounted) return null;

  return (
    <section>
      <Head>
        <title>{t('speakers_dir.grouped_by_categories.title')} / {t('speakers_dir.title')} - {t('title')}</title>
      </Head>
      <Breadcrumb />

      <h2 className="mt-4 mb-4 text-2xl text-center font-bold text-gray-900 tracking-wide">
        <small>{t('speakers_dir.title')}</small><br />
        {t('speakers_dir.grouped_by_categories.title')}
      </h2>

      <nav className="speaker_cats mb-8 speaker_cats flex flex-wrap gap-1 text-lg">
        {groupedSpeakers.map((group, index) => (
          <a
            key={index}
            href={`#${group.category}`}
            className="bg-gray-100 text-blue-800 px-1 py-0.5 mr-1 rounded hover:underline hover:bg-gray-200"
          >
            {group.category}
          </a>
        ))}
      </nav>

      {groupedSpeakers.map((group, groupIndex) => (
        <div key={groupIndex} id={group.category} className="rounded-lg bg-gray-100 py-5 px-3 mb-10">
          <h3 className="mb-4 text-4xl font-bold text-blue-900 text-center">
            {group.category}
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
