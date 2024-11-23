import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/next';

export default function Layout({ children }) {
  const { asPath, locale } = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useTranslation('common');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    // メニュー外をクリックした場合にドロップダウンを閉じる
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    // クリックイベントを監視
    document.addEventListener('click', handleClickOutside);

    // クリーンアップ
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      value: t('menu.home'),
      href: "/"
    },
    {
      value: t('menu.speaker_components_list'),
      content: [
        { value: t('menu.speaker_components_list'), href: "/speakers" },
        { value: t('menu.grouped_by_baffle_hole_diameter'), href: "/speakers/grouped_by_baffle_hole_diameter" },
        { value: t('menu.grouped_by_categories'), href: "/speakers/grouped_by_categories" },
        { value: t('menu.for_backloadedhorn'), href: "/speakers/for_backloadedhorn" }
      ]
    }
  ];

  return (
    <div className="layout">
      <header className="bg-gray-900 text-white px-6 py-4">
        <div className="wrapper w-full sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
            <h1
              title={t('description')}
              className="text-lg font-bold flex-1"
            >
              {t('title')}
            </h1>
            <p className="flex space-x-4">
              <Link
                className={`relative ${locale === 'en' ? 'underline' : ''} text-gray-300 hover:text-white hover:underline`}
                href={asPath}
                locale="en"
                title="English"
              >
                EN
              </Link>
              <Link
                className={`relative ${locale === 'ja' ? 'underline' : ''} text-gray-300 hover:text-white hover:underline`}
                href={asPath}
                locale="ja"
                title="日本語"
              >
                JP
              </Link>
            </p>
          </div>

          <nav>
            <ul className="text-base flex space-x-4 items-center">
              {menuItems.map((item, index) => (
                <li key={index} className="relative" ref={dropdownRef}>
                  {item.content ? (
                    <>
                      <button
                        onClick={toggleDropdown}
                        className="leading-none border border-white rounded px-4 py-2 hover:text-gray-800 hover:bg-gray-100 hover:underline"
                      >
                        {item.value}
                      </button>
                      {isDropdownOpen && (
                        <ul
                          className="absolute left-0 mt-2 bg-black text-gray-800 shadow-lg min-w-full max-w-sm sm:max-w-md md:max-w-lg overflow-auto z-10"
                        >
                          {item.content.map((subItem, subIndex) => (
                            <li key={subIndex} className="border-b border-gray-300">
                              <Link
                                href={subItem.href}
                                className="block px-4 py-2 text-white hover:text-gray-800 hover:bg-gray-100 hover:underline"
                              >
                                {subItem.value}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      className="leading-none inline-block border border-white rounded px-4 py-2 hover:underline hover:text-gray-800 hover:bg-gray-100"
                      href={item.href}
                    >
                      {item.value}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <article className="w-full sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] mx-auto pt-2 pb-8 px-4">{children}</article>

      <SpeedInsights />
      <Analytics />

      <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:5218739,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        ></script>

      <footer className="bg-gray-900 text-gray-300 text-center">
        <p>&copy; DigitalSignager.JP, <Link className="text-gray-300 hover:underline hover:text-white" href="https://dwo.jp">DigitalWideOffice.</Link> </p>
      </footer>

      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        header {
          font-family: 'Fira Mono', monospace;
        }

        footer {
          padding: 2em 0;
          margin-top: auto;
          font-family: 'Fira Mono', monospace;
        }
      `}</style>
    </div>
  );
}
