import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { RatingInput } from 'react-native-stock-star-rating';

import RestaurantPage from '../../navigation/RestaurantPage';
import NetworkImage from '../../components/NetworkImage';
import { COLORS, SIZES } from '../../constants/theme';

const Restaurant = ({ navigation }) => {
  const route = useRoute();
  const item = route.params;
  console.log(item);

  return (
    <View >
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name='chevron-back-circle' size={30} color={COLORS.primary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} style={styles.shareBtn}>
          <MaterialCommunityIcons name='share-circle' size={30} color={COLORS.primary} />
        </TouchableOpacity>

        <NetworkImage data={item.imageUrl} height={SIZES.height / 3.4} width={SIZES.width} radius={14} />

        <View style={styles.rating}>
          <View style={styles.innerRating}>
            <RatingInput
              rating={Number(item.rating)}
              size={20}
            // color={COLORS.lightWhite}
            />

            <TouchableOpacity style={styles.ratingBtn} onPress={() => navigation.navigate('rating')}>
              <Text style={styles.btnText}>Rate this Store</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ height: 200 }}></View>

      <View style={{ height: 400, }}>
        <RestaurantPage />
      </View>
    </View>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  backBtn: {
    marginLeft: 12,
    alignItems: 'center',
    zIndex: 999,
    top: SIZES.xxLarge,
    position: 'absolute',
  },
  shareBtn: {
    marginRight: 12,
    alignItems: 'center',
    zIndex: 999,
    top: SIZES.xxLarge,
    position: 'absolute',
    right: 0,
  },
  title: {
    fontSize: 22,
    fontFamily: 'medium',
    color: COLORS.black,
  },
  btnText: {
    fontSize: 16,
    fontFamily: 'medium',
    color: COLORS.lightWhite,
  },
  rating: {
    height: 50,
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    backgroundColor: "#00fff53c",
    zIndex: 999,
    bottom: 0,
    borderRadius: 15,
  },
  innerRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  ratingBtn: {
    borderColor: COLORS.lightWhite,
    borderWidth: 1,
    borderRadius: 8,
    padding: 6,
  },
});