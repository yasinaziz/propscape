import React, { useState, useEffect } from 'react';
import MainNavigation from '../components/MainNavigation';
import SearchBar from '../components/SearchBar';
import BreadcrumbNav from '../components/BreadcrumbNav';
import PropertyCard from '../components/PropertyCard';
import AdvertisementCard from '../components/AdvertisementCard';

type UnitType = {
  price: string;
  beds: number;
  baths: number;
  size: string;
};

type Property = {
  images: string[];
  title: string;
  location: string;
  coordinates?: string;
  price: string;
  details?: string;
  units: UnitType[];
  listedBy: string;
  listedByDesc?: string;
  developerLogo?: string;
};

const Buy: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3003/api/property')
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => {
        setProperties([]);
        setFiltered([]);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setFiltered(properties);
      return;
    }
    setFiltered(
      properties.filter(
        p =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.location.toLowerCase().includes(query.toLowerCase()) ||
          p.details?.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div className="main-bg">
      <MainNavigation />
      <div style={{ height: 64 }} />
      <BreadcrumbNav current="Buy" />
      <div style={{ padding: '0 32px 32px 32px', marginTop: 0 }}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', padding: 32 }}>
        <div style={{ flex: 2 }}>
          {loading ? (
            <div>Loading properties...</div>
          ) : filtered.length === 0 ? (
            <div>No properties found.</div>
          ) : (
            filtered.map((property, idx) => (
              <PropertyCard key={idx} property={property} />
            ))
          )}
        </div>
        <div style={{ flex: 1 }}>
          <AdvertisementCard />
        </div>
      </div>
    </div>
  );
};

export default Buy;