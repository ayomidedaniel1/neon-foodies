import React from 'react';
import { Marker } from 'react-native-maps';

const PlaceMarker = ({ coordinates }) => {
  console.log(coordinates);

  return (
    <Marker
      title='coordinates.title'
      coordinate={{
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.01,
      }}
    />
  );
};

export default PlaceMarker;
