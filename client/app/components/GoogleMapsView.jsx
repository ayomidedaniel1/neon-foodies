import { GOOGLE_MAPS_API_KEY } from '@env';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { COLORS, SIZES } from '../constants/theme';
import { UserLocationContext } from '../context/UserLocationContext';
import PlaceMarker from './PlaceMarker';

const GoogleMapsView = ({ placeList }) => {
  const apiKey = GOOGLE_MAPS_API_KEY;
  const { location, setLocation } = useContext(UserLocationContext);

  const [directions, setDirections] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [mapRegion, setMapRegion] = useState({
    latitude: 7.5070911,
    longitude: 4.493336,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.01,
      });

      fetchDirections(
        placeList[0].longitude,
        placeList[0].latitude,
        location.coords.latitude,
        location.coords.longitude
      );
    }
  }, [location, coordinates]);

  const fetchDirections = async (
    startLat,
    startLng,
    destinationLat,
    destinationLng
  ) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${destinationLat},${destinationLng}&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json().then((data) => {
        setDirections(data);
        const encodedPolyline = data.routes[0].overview_polyline.points;
        const coordinates = decode(encodedPolyline);

        setCoordinates(coordinates);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const decode = (encoded) => {
    const points = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let shift = 0,
        result = 0;
      let byte;
      do {
        byte = encoded.charCodeAt(index++) - 63; // <-- we use charCodeAt method, not a 'char' property
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += deltaLng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return points;
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={mapRegion}
      >
        <Marker title='My Location' coordinate={mapRegion} />

        {placeList.map(
          (item, index) => index <= 1 && <PlaceMarker coordinates={item} key={index} />
        )}

        <Polyline
          coordinates={coordinates}
          strokeColor={COLORS.primary}
          strokeWidth={5}
        />
      </MapView>
    </View>
  );
};

export default GoogleMapsView;

const styles = StyleSheet.create({
  mapContainer: {
    width: SIZES.width,
    height: SIZES.height / 2.6,
    borderColor: COLORS.gray2,
    borderWidth: 1,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});