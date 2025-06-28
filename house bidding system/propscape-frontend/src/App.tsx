import React from 'react';
import MainNavigation from './components/MainNavigation';
import SearchBar from './components/SearchBar';
import BreadcrumbNav from './components/BreadcrumbNav';
import PropertyCard from './components/PropertyCard';
import AdvertisementCard from './components/AdvertisementCard';

function App() {
  return (
    <div>
      <MainNavigation />
      <div style={{ height: 64 }} /> {/* Spacer for fixed nav */}
      <BreadcrumbNav current="Home" />
      <div style={{ padding: '0 32px 32px 32px', marginTop: 0 }}>
        <SearchBar />
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', padding: 32 }}>
        <div style={{ flex: 2 }}>
          <PropertyCard
            property={{
              images: [],
              title: '',
              location: '',
              coordinates: '',
              price: '',
              details: '',
              units: [{ price: '', beds: 0, baths: 0, size: '' }],
              listedBy: '',
              listedByDesc: '',
              developerLogo: '',
            }}
            editable
            onChange={() => {}}
            onSave={() => {}}
          />
        </div>
        <div style={{ flex: 1 }}>
          <AdvertisementCard />
        </div>
      </div>
    </div>
  );
}

export default App;