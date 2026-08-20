import Link from 'next/link'
import Image from 'next/image'
import { footerNavColumns } from '@/content/nav'
import { company } from '@/lib/site'

export function Footer() {
  return (
    <footer className="on-dark bg-anthracite text-white/75">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/images/logo-mark-white.png"
              alt=""
              width={829}
              height={532}
              className="h-9 w-auto"
            />
            <span className="text-lg font-bold tracking-tighter text-white uppercase">
              WAGENHELD
            </span>
          </div>
          <address className="not-italic text-sm leading-relaxed">
            {company.legalName}
            <br />
            {company.street}
            <br />
            {company.postalCode} {company.city}
            <br />
            <a
              href={company.phoneHref}
              className="hover:text-gold transition-colors"
            >
              {company.phone}
            </a>
            <br />
            <a
              href={`mailto:${company.email}`}
              className="hover:text-gold transition-colors break-words"
            >
              {company.email}
            </a>
          </address>
        </div>

        {footerNavColumns.map((column) => (
          <div key={column.heading}>
            <h2 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              {column.heading}
            </h2>
            <ul className="flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-6 text-xs flex flex-col sm:flex-row justify-between gap-2">
          <p>
            &copy; {new Date().getFullYear()} {company.legalName}
          </p>
          <p className="flex gap-4">
            <Link href="/impressum" className="hover:text-gold transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-gold transition-colors">
              Datenschutz
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
