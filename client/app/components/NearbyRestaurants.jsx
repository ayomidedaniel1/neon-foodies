import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import uidata from '../constants/uidata';
import StoreComponent from './StoreComponent';
import { useNavigation } from '@react-navigation/native';
import { RestaurantContext } from '../context/RestaurantContext';

const NearbyRestaurants = () => {
  const navigation = useNavigation();
  const { restaurantObj, setRestaurantObj } = useContext(RestaurantContext);

  return (
    <View style={{ marginLeft: 12, }}>
      <FlatList
        data={uidata.restaurants}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5, rowGap: 10, }}
        scrollEnabled
        renderItem={({ item }) => (
          <StoreComponent item={item} onPress={() => { navigation.navigate('restaurant', item), setRestaurantObj(item); }} />
        )}
      />
    </View>
  );
};

export default NearbyRestaurants;

const styles = StyleSheet.create({});