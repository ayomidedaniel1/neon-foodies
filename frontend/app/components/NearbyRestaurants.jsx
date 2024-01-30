import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import uidata from '../constants/uidata';
import StoreComponent from './StoreComponent';

const NearbyRestaurants = () => {
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
          <StoreComponent item={item} onPress={() => { }} />
        )}
      />
    </View>
  );
};

export default NearbyRestaurants;

const styles = StyleSheet.create({});