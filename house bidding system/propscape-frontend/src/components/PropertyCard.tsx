import React from 'react';

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

interface PropertyCardProps {
  property: Property;
  editable?: boolean;
  onChange?: (property: Property) => void;
  onSave?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  editable,
  onChange,
  onSave
}) => {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      padding: 24,
      boxShadow: '0 2px 8px #eee',
      marginBottom: 24
    }}>
      <h2>{property.title || 'Property Title'}</h2>
      <p><strong>Location:</strong> {property.location || 'Location'}</p>
      <p><strong>Price:</strong> {property.price || 'Price'}</p>
      <p>{property.details || 'Details...'}</p>
      <div>
        <strong>Units:</strong>
        {property.units.map((unit, idx) => (
          <div key={idx} style={{ marginLeft: 12 }}>
            {unit.beds} beds, {unit.baths} baths, {unit.size}, {unit.price}
          </div>
        ))}
      </div>
      <div>
        <strong>Listed by:</strong> {property.listedBy}
      </div>
      {editable && onSave && (
        <button
          onClick={onSave}
          style={{
            marginTop: 16,
            padding: '8px 24px',
            borderRadius: 8,
            border: 'none',
            background: '#2352b6',
            color: '#fff',
            fontWeight: 600
          }}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default PropertyCard;