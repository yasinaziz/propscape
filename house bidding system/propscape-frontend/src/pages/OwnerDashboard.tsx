import React, { useState } from 'react';
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

const defaultProperty: Property = {
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
};

const OwnerDashboard: React.FC = () => {
  const [property, setProperty] = useState<Property>(defaultProperty);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUnitChange = (idx: number, field: keyof UnitType, value: string | number) => {
    setProperty(prev => ({
      ...prev,
      units: prev.units.map((unit, i) =>
        i === idx ? { ...unit, [field]: value } : unit
      ),
    }));
  };

  const addUnit = () => {
    setProperty(prev => ({
      ...prev,
      units: [...prev.units, { price: '', beds: 0, baths: 0, size: '' }],
    }));
  };

  const removeUnit = (idx: number) => {
    setProperty(prev => ({
      ...prev,
      units: prev.units.filter((_, i) => i !== idx),
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch('http://localhost:3003/api/property', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(property),
      });
      if (res.ok) {
        alert('Property saved!');
        setProperty(defaultProperty);
      } else {
        alert('Failed to save property');
      }
    } catch {
      alert('Failed to save property');
    }
  };

  return (
    <div className="main-bg">
      <MainNavigation />
      <div style={{ height: 64 }} />
      <BreadcrumbNav current="Owner Dashboard" />
      <div style={{ padding: '0 32px 32px 32px', marginTop: 0 }}>
        <SearchBar />
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', padding: 32 }}>
        <div style={{ flex: 2 }}>
          <h2>List Your Property</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSave();
            }}
            style={{ marginBottom: 32, background: '#fff', padding: 24, borderRadius: 12 }}
          >
            <div>
              <label>Title:</label>
              <input
                name="title"
                value={property.title}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: 8 }}
                required
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                name="location"
                value={property.location}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: 8 }}
                required
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                name="price"
                value={property.price}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: 8 }}
                required
              />
            </div>
            <div>
              <label>Details:</label>
              <textarea
                name="details"
                value={property.details}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: 8 }}
              />
            </div>
            <div>
              <label>Listed By:</label>
              <input
                name="listedBy"
                value={property.listedBy}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: 8 }}
              />
            </div>
            <div>
              <label>Units:</label>
              {property.units.map((unit, idx) => (
                <div key={idx} style={{ border: '1px solid #eee', padding: 8, marginBottom: 8, borderRadius: 8 }}>
                  <input
                    type="number"
                    placeholder="Beds"
                    value={unit.beds}
                    onChange={e => handleUnitChange(idx, 'beds', Number(e.target.value))}
                    style={{ width: 60, marginRight: 8 }}
                  />
                  <input
                    type="number"
                    placeholder="Baths"
                    value={unit.baths}
                    onChange={e => handleUnitChange(idx, 'baths', Number(e.target.value))}
                    style={{ width: 60, marginRight: 8 }}
                  />
                  <input
                    type="text"
                    placeholder="Size"
                    value={unit.size}
                    onChange={e => handleUnitChange(idx, 'size', e.target.value)}
                    style={{ width: 80, marginRight: 8 }}
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    value={unit.price}
                    onChange={e => handleUnitChange(idx, 'price', e.target.value)}
                    style={{ width: 80, marginRight: 8 }}
                  />
                  {property.units.length > 1 && (
                    <button type="button" onClick={() => removeUnit(idx)} style={{ color: 'red' }}>
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addUnit} style={{ marginTop: 8 }}>
                Add Unit
              </button>
            </div>
            <button type="submit" style={{ marginTop: 16, background: '#2352b6', color: '#fff', padding: '8px 24px', border: 'none', borderRadius: 8 }}>
              Save Property
            </button>
          </form>
          <h3>Preview</h3>
          <PropertyCard property={property} />
        </div>
        <div style={{ flex: 1 }}>
          <AdvertisementCard />
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;