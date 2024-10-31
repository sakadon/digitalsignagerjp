import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import en from '../locales/en.json';
import ja from '../locales/ja.json';

export async function getStaticProps() {
  const data = {
    ja: {
      title: "さかどんの自作スピーカーや電子工作、デジタルサイネージに関する部品や商品をまとめたサイト",
      content: [
        "自作スピーカーや電子工作、デジタルサイネージに関する部品や商品のデータベースを中心に掲載しています。",
        "質問についてはXのアカウント @sakadon までどうぞ。"
      ]
    },
    en: {
      title: "The website that compiles components and products related to DIY speakers, electronics projects, and digital signage by Sakadon.",
      content: [
        "Here, We provide a database of know-how and components related to DIY speaker craft.",
        "For questions, please contact us on X (formerly Twitter) at @sakadon."
      ]
    }
  };

  return {
    props: {
      data
    }
  };
}

export default function Home({ data }) {
  const { locale } = useRouter();
  const t = locale === 'ja' ? ja : en;
  const td = locale === 'ja' ? data.ja : data.en;

  return (
    <section>
      <Head>
        <title>{t.title} - Digital Signager</title>
      </Head>

      <h2 className="mt-4 mb-4 text-3xl font-bold text-gray-900 tracking-wide italic">{td.title}</h2>
      {Array.isArray(td.content) ? (
        td.content.map((text, index) => (
          <p className="leading-relaxed mt-4 mb-4" key={index}>{text}</p>
        ))
      ) : (
        <p className="leading-relaxed mt-4 mb-4">{td.content}</p>
      )}

      {t.menu && (
        <nav>
          <ul className="list-decimal  ml-6">
            <li>
              <Link className="text-blue-600 hover:text-blue-800 hover:underline" href="/speakers">{t.menu.speaker_components_list}</Link>
              <ul className="list-[circle] hover:list-disc ml-6">
                <li>
                  <Link className="text-blue-600 hover:text-blue-800 hover:underline" href="/speakers/grouped_by_baffle_hole_diameter">{t.menu.grouped_by_baffle_hole_diameter}</Link>
                </li>
                <li>
                  <Link className="text-blue-600 hover:text-blue-800 hover:underline" href="/speakers/grouped_by_categories">{t.menu.grouped_by_categories}</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      )}

    </section>
  );
}
