import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { RestaurantContext } from '../../context/RestaurantContext';
import GoogleMapsView from '../../components/GoogleMapsView';

const Directions = () => {
  const { restaurantObj, setRestaurantObj } = useContext(RestaurantContext);
  const coords = restaurantObj.coords;

  return (
    <View>
      <GoogleMapsView placeList={[coords]} />
    </View>
  );
};

export default Directions;

const styles = StyleSheet.create({});