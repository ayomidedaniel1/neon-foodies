import React from 'react';
import { Image, Text, View } from 'react-native';
import { COLORS, SHADOWS } from '../constants/theme';

const CategoryItem = ({ category, selected }) => {
  return (
    <View style={{
      marginLeft: 12,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      width: 80,
      height: 55,
      borderRadius: 15,
      borderWidth: 0.5,
      borderColor: category.value === selected ? COLORS.secondary : 'transparent',
      shadowColor: SHADOWS.small,
    }}>
      <Image source={{ uri: category.imageUrl }} style={{ width: 30, height: 30, }} />
      <Text style={{ fontSize: 13, fontFamily: 'regular', }}>{category.title}</Text>
    </View>
  );
};

export default CategoryItem;
