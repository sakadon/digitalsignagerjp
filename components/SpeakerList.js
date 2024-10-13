import { useRouter } from 'next/router';

export default function SpeakerList({ speakers, onSelect }) {
  const { locale } = useRouter();

  return (
    <ul className="space-y-4">
      {speakers.map((speaker) => (
        <li
          key={speaker.id}
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-100"
          onClick={() => onSelect(speaker)}
        >
          {speaker.brand} {speaker.name} {locale === 'ja' ? speaker.ja.categoryText : speaker.en.categoryText}
        </li>
      ))}
    </ul>
  );
}
