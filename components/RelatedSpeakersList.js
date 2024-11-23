import { useState } from 'react';
import SpeakerList from './SpeakerList';

// 同じカテゴリーを持つスピーカーを抽出
const getRelatedSpeakers = (speakers, currentSpeaker) => {
  if (!currentSpeaker.category) return [];
  const currentCategories = currentSpeaker.category;
  return speakers.filter(
    (speaker) =>
      speaker.id !== currentSpeaker.id && // 現在のスピーカーは除外
      speaker.category.some((cat) => currentCategories.includes(cat)) // カテゴリーが一致
  );
};

export default function RelatedSpeakersList({ speaker, allSpeakers, tCommon }) {
  if (!speaker) return null;

  const relatedSpeakers = getRelatedSpeakers(allSpeakers, speaker);

  // トグルの状態を管理するステートをカテゴリーごとに作成
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (category) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <div id="RelatedSpeakersList" data-component-name="RelatedSpeakersList">
      {/* 同カテゴリーのスピーカー一覧をカテゴリーごとにグループ化 */}
      {relatedSpeakers.length > 0 && (
        <div className="mt-24 border-t-4 border-double border-gray-500">
          <h3 className="mt-4 mb-4 text-2xl text-center font-bold text-gray-900 tracking-wide">
            {tCommon('speakers_dir.related_speakers_title')}
          </h3>

          {/* 開いているスピーカーのカテゴリーに限定 */}
          {speaker.category.map((cat) => {
            const speakersInCategory = relatedSpeakers.filter((relatedSpeaker) =>
              relatedSpeaker.category.includes(cat)
            );

            if (speakersInCategory.length === 0) return null; // 該当するスピーカーがない場合はスキップ

            return (
              <div key={cat} className="rounded-lg bg-gray-100 py-1 px-3 mb-10">
                <h4
                  className="my-4 text-lg font-bold text-blue-800 cursor-pointer"
                  onClick={() => toggleCategory(cat)} // トグル操作
                >
                  {cat} {openCategories[cat] ? '▼' : '▶'}
                </h4>
                {openCategories[cat] && (
                  // カテゴリー内のスピーカー一覧
                  <div className="mb-4">
                    <SpeakerList speakers={speakersInCategory} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
