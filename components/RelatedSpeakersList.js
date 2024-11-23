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

  const relatedSpeakers = getRelatedSpeakers( allSpeakers, speaker );

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

            // トグル用の状態を管理
            const [isOpen, setIsOpen] = useState(false);

            return (
              <div key={cat} className="rounded-lg bg-gray-100 py-1 px-3 mb-10">
                <h4
                  className="my-4 text-lg font-bold text-blue-800 cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)} // クリックでトグル
                >
                  {cat} {isOpen ? '▼' : '▶'}
                </h4>
                {isOpen && (
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

      <style jsx>{`
      `}</style>
    </div>
  );
}
