import Link from 'next/link';

export default function Footer() {
  return (
    <div className="relative mt-16 bg-[#125892] text-white">
      <svg
        className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-[#125892]"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>

      <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 bg-[#125892]">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            <Link href="/" className="inline-flex items-center">
              <svg
                className="w-8 text-white"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                stroke="currentColor"
                fill="none"
              >
                <rect x="3" y="1" width="7" height="12" />
                <rect x="3" y="17" width="7" height="6" />
                <rect x="14" y="1" width="7" height="6" />
                <rect x="14" y="11" width="7" height="12" />
              </svg>
              <span className="ml-2 text-xl font-bold tracking-wide uppercase">
                Company
              </span>
            </Link>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-sm">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam.
              </p>
              <p className="mt-4 text-sm">
                Eaque ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            {[
              { title: 'Category', links: ['News', 'World', 'Games', 'References'], base: 'category' },
              { title: 'Cherry', links: ['Web', 'eCommerce', 'Business', 'Entertainment', 'Portfolio'], base: 'cherry' },
              { title: 'Apples', links: ['Media', 'Brochure', 'Nonprofit', 'Educational', 'Projects'], base: 'apples' },
              { title: 'Business', links: ['Infopreneur', 'Personal', 'Wiki', 'Forum'], base: 'business' },
            ].map((section) => (
              <div key={section.title}>
                <p className="font-semibold tracking-wide text-white">{section.title}</p>
                <ul className="mt-2 space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        href={`/${link.toLowerCase()}`}
                        className="transition-colors duration-300 text-white hover:text-gray-300"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-white/20 sm:flex-row">
          <p className="text-sm text-white">
            © Copyright 2020 Lorem Inc. All rights reserved.
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            {[
              'M24,4.6c-0.9,0.4-1.8,...', // Twitter
              'M19.999,3h-10C6.14,3,...',  // Instagram
              'M22,0H2C0.895,0,0,0.8...'  // Facebook
            ].map((d, i) => (
              <Link
                key={i}
                href="/"
                className="transition-colors duration-300 text-white hover:text-gray-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d={d} />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
