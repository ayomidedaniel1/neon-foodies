import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import uidata from '../constants/uidata';
import FoodComponent from './FoodComponent';

const NewFoodsList = () => {

  const renderItem = ({ item }) => (
    <FoodComponent item={item} onPress={() => { }} />
  );

  return (
    <View style={{ marginLeft: 12, marginBottom: 10, }}>
      <FlatList
        data={uidata.foods}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5, rowGap: 10, }}
        scrollEnabled
        renderItem={renderItem}
      />
    </View>
  );
};

export default NewFoodsList;
