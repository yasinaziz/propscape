import React from 'react';

interface BreadcrumbNavProps {
  current: string;
  links?: { label: string; href: string }[];
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ current, links }) => (
  <nav
    style={{
      padding: '16px 0',
      fontSize: 22,
      fontWeight: 600,
      fontFamily: "'Montserrat', Arial, sans-serif",
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    }}
    aria-label="breadcrumb"
  >
    {links && links.length > 0 && (
      <>
        <a
          href="/"
          style={{
            color: '#222',
            textDecoration: 'none',
            fontWeight: 700,
            marginRight: 8,
          }}
        >
          Home
        </a>
        <span style={{ color: '#888', marginRight: 8 }}>/</span>
        {links.map((link, idx) => (
          <React.Fragment key={idx}>
            <a
              href={link.href}
              style={{
                color: '#2352b6',
                textDecoration: 'underline',
                marginRight: 8,
              }}
            >
              {link.label}
            </a>
            <span style={{ color: '#888', marginRight: 8 }}>/</span>
          </React.Fragment>
        ))}
      </>
    )}
    <span style={{ color: '#222' }}>{current}</span>
  </nav>
);

export default BreadcrumbNav;