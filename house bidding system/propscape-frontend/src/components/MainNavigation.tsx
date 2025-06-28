import React, { useState } from 'react';
import logo from '../assets/logo.png'; // Make sure to place your logo image at src/assets/logo.png

const navItems = [
  {
    label: 'Buy',
    href: '/',
    dropdown: [
      { label: 'Location', href: '/buy/location' },
      { label: 'Landed', href: '/buy/landed' },
      { label: 'Condo', href: '/buy/condo' }
    ]
  },
  {
    label: 'Rent',
    href: '/rent',
    dropdown: [
      { label: 'Location', href: '/rent/location' },
      { label: 'Landed', href: '/rent/landed' },
      { label: 'Condo', href: '/rent/condo' }
    ]
  },
  {
    label: 'New Projects',
    href: '/projects',
    dropdown: [
      { label: 'Project Location', href: '/projects/projectlocation' },
      { label: 'Completion', href: '/projects/completion' }
    ]
  },
  { label: 'Guides', href: '/guides' },
  {
    label: 'More',
    href: '#',
    dropdown: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' }
    ]
  }
];

const MainNavigation: React.FC = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <nav style={{
      background: '#fff',
      color: '#222',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }}>
      {/* Logo and Brand */}
      <div style={{ display: 'flex', alignItems: 'center', marginRight: 32 }}>
        <img
          src={logo}
          alt="PropScape Logo"
          style={{ height: 48, marginRight: 16 }}
        />
        <span style={{
          fontWeight: 700,
          fontSize: 32,
          fontFamily: "'Montserrat', Arial, sans-serif",
          letterSpacing: '-1px'
        }}>
          PropScape
        </span>
      </div>
      {/* Navigation Dropdowns */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {navItems.map((item) => (
          <div
            key={item.label}
            style={{ position: 'relative', marginRight: 8 }}
            onMouseEnter={() => item.dropdown && setOpen(item.label)}
            onMouseLeave={() => setOpen(null)}
          >
            <a
              href={item.href}
              style={{
                color: '#222',
                fontWeight: 600,
                fontSize: 18,
                textDecoration: 'none',
                fontFamily: "'Montserrat', Arial, sans-serif",
                padding: '8px 16px',
                borderRadius: 10,
                background: item.label === 'Guides' ? '#f5f6fa' : 'transparent'
              }}
            >
              {item.label}
              {item.dropdown && (
                <span style={{ marginLeft: 4, fontSize: 14 }}>▼</span>
              )}
            </a>
            {item.dropdown && open === item.label && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                background: '#fff',
                boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                borderRadius: 10,
                minWidth: 180,
                zIndex: 100,
                marginTop: 4
              }}>
                {item.dropdown.map((sub) => (
                  <a
                    key={sub.label}
                    href={sub.href}
                    style={{
                      display: 'block',
                      padding: '10px 18px',
                      color: '#222',
                      fontWeight: 500,
                      fontSize: 16,
                      textDecoration: 'none',
                      fontFamily: "'Montserrat', Arial, sans-serif",
                      borderRadius: 8,
                      transition: 'background 0.15s',
                      background: 'transparent'
                    }}
                    onMouseDown={e => setOpen(null)}
                    onMouseOver={e => (e.currentTarget.style.background = '#f5f6fa')}
                    onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    {sub.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default MainNavigation;