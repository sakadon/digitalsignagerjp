import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SpeakerList({ speakers }) {
  const { locale } = useRouter();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {speakers.map((speaker) => (
        <li
          key={speaker.id}
          className="bg-white shadow-md rounded-lg pt-4 pr-4 pl-4 pb-2 hover:bg-gray-100 flex"
        >
          <Link href={`/backloadedhorn-speakers/${speaker.id}`}>
            <div className="flex w-full cursor-pointer">
              <div className="w-20 h-20 mr-4 flex-shrink-0">
                {speaker.image ? (
                  <img
                    src={speaker.image.main}
                    alt={`${speaker.brand} ${speaker.name}`}
                    className="w-full h-full object-contain rounded"
                    onError={(e) => e.target.src = '/images/no-image.jpg'} // 画像がない場合に代替画像を表示
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
                    NO IMAGE
                  </div>
                )}
              </div>

              <div className="leading-5">
                <div className="mb-1">
                  <span className="speaker_title font-bold tracking-tight">
                    <span className="text-orange-600">{speaker.brand}</span> {speaker.name}
                  </span><br />
                  <small>{locale === 'ja' ? speaker.ja.categoryText : speaker.en.categoryText}</small>
                </div>
                <div className="speaker_cats flex flex-wrap gap-1">
                  {speaker.category && speaker.category.map((cat, index) => (
                    <span key={index} className="bg-gray-100 text-blue-800 px-1 py-0.5 rounded text-xs">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}

      <style jsx>{`
        .speaker_cats {
          font-family: 'Fira Mono', monospace;
        }
      `}</style>
    </ul>
  );
}
