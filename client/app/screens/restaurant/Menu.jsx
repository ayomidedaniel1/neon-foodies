import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { RestaurantContext } from '../../context/RestaurantContext';
import uidata from '../../constants/uidata';
import FoodTile from '../../components/FoodTile';

const Menu = () => {
  const navigation = useNavigation();
  const { restaurantObj, setRestaurantObj } = useContext(RestaurantContext);

  return (
    <View style={{ marginTop: 5, }}>
      <FlatList
        data={uidata.foods}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 5, }}
        keyExtractor={(item) => item._id}
        scrollEnabled
        renderItem={({ item }) => (
          <View>
            <FoodTile item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({});