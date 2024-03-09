import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RatingInput } from 'react-native-stock-star-rating';
import { COLORS, SHADOWS } from '../constants/theme';
import NetworkImage from './NetworkImage';

const FoodTile = ({ item, onPress, showDetails }) => {

  return (
    <View style={styles.wrapper}>
      <View style={{ backgroundColor: COLORS.lightWhite, borderRadius: 12, }}>
        <View style={{ flexDirection: 'row', }}>
          <NetworkImage data={item.imageUrl[0]} height={72} width={72} radius={15} />

          <View style={{ marginLeft: 10, marginTop: 5, }}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
            </View>

            <RatingInput
              rating={Number(item.rating)}
              size={20}
              color={COLORS.primary}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FoodTile;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.offwhite,
    borderRadius: 12,
    shadowColor: SHADOWS.medium,
    padding: 12,
    marginBottom: 15,
    marginRight: 10,
    paddingRight: 7,
  },
  title: {
    fontSize: 16,
    fontFamily: 'medium',
    color: COLORS.gray
  },
});