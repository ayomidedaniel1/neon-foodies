import React from 'react';
import { FlatList, View } from 'react-native';
import uidata from '../constants/uidata';
import FoodComponent from './FoodComponent';

const FastestNearYou = () => {

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

export default FastestNearYou;
