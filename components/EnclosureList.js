import Link from 'next/link';
import { useRouter } from 'next/router';

export default function EnclosureList({ enclosures }) {
  const { locale } = useRouter();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {enclosures.map((enclosure) => {
        const languageData = locale === 'ja' ? enclosure.ja : enclosure.en;

        return (
          <li
            key={enclosure.id}
            className="bg-white shadow-md hover:shadow-gray-600/40 rounded-lg p-4 hover:bg-amber-50 flex flex-col"
          >
            <div className="mb-3">
              <img
                src={enclosure.image?.main || '/images/no-image.jpg'}
                alt={`${enclosure.brand} ${enclosure.name}`}
                className="w-full h-44 object-contain rounded"
                onError={(e) => {
                  e.target.src = '/images/no-image.jpg';
                }}
              />
            </div>

            <div className="mb-4 leading-6">
              <p className="font-bold text-lg tracking-tight">{enclosure.name}</p>
              <p className="text-sm">
                <span className="text-orange-600 font-bold">{enclosure.brand}</span> {enclosure.model}
              </p>
              <p className="text-sm text-gray-700">{languageData?.priceText || `¥${enclosure.price}`}</p>
            </div>

            <Link
              href={`/enclosures/${enclosure.id}`}
              className="mt-auto inline-block text-center bg-blue-600 text-white rounded px-3 py-2 hover:bg-blue-700"
            >
              {locale === 'ja' ? '詳細を見る' : 'View Details'}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
