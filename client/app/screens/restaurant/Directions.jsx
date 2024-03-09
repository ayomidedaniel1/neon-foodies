import React, { useContext } from 'react';
import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GoogleMapsView from '../../components/GoogleMapsView';
import { COLORS, SIZES } from '../../constants/theme';
import { RestaurantContext } from '../../context/RestaurantContext';

const Directions = () => {
  const { restaurantObj, setRestaurantObj } = useContext(RestaurantContext);
  const coords = restaurantObj.coords;

  const onDirectionPress = () => {
    const url = Platform.select({
      ios: "maps:" + coords.latitude + "," + coords.longitude,
      android: "geo:" + coords.latitude + "," + coords.longitude + "?z=16"
    });
    Linking.openURL(url);
  };

  return (
    <View>
      <GoogleMapsView placeList={[coords]} />

      <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', margin: 12, }}>
        <Text style={[styles.small, { width: SIZES.width / 1.7 }]}>{coords.address}</Text>

        <TouchableOpacity style={styles.ratingBtn} onPress={() => onDirectionPress()}>
          <Text>Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Directions;

const styles = StyleSheet.create({
  small: {
    fontSize: 13,
    fontFamily: 'regular',
    color: COLORS.black,
  },
  ratingBtn: {
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    padding: 6,
  },
});