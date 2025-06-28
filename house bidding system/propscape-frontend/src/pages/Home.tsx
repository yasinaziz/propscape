import React from 'react';
import MainNavigation from '../components/MainNavigation';
import SearchBar from '../components/SearchBar';
import BreadcrumbNav from '../components/BreadcrumbNav';
import AdvertisementCard from '../components/AdvertisementCard';

const Home: React.FC = () => (
  <div className="main-bg">
    <MainNavigation />
    <div style={{ height: 64 }} />
    <BreadcrumbNav current="Home" />
    <div style={{ padding: '0 32px 32px 32px', marginTop: 0 }}>
      <SearchBar />
    </div>
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', padding: 32 }}>
      <div style={{ flex: 2 }}>
        <h2>Welcome to PropScape</h2>
        <p>
          Discover, buy, or list properties with ease. Use the navigation above to get started!
        </p>
      </div>
      <div style={{ flex: 1 }}>
        <AdvertisementCard />
      </div>
    </div>
  </div>
);

export default Home;