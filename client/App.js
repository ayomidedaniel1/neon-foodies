import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from 'react';

import { COLORS } from './app/constants/theme';
import { RestaurantContext } from './app/context/RestaurantContext';
import { UserLocationContext } from './app/context/UserLocationContext';
import { UserReversedGeoCode } from './app/context/UserReversedGeoCode';
import BottomTab from './app/navigation/BottomTab';
import FoodNavigator from './app/navigation/FoodNavigator';
import RestaurantPage from './app/navigation/RestaurantPage';
import AddRating from './app/screens/AddRating';
import Restaurant from './app/screens/restaurant/Restaurant';

NavigationBar.setBackgroundColorAsync(COLORS.primary);

const Stack = createNativeStackNavigator();

export default function App () {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [restaurantObj, setRestaurantObj] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const defaultAddresss = { "city": "Shanghai", "country": "China", "district": "Pudong", "isoCountryCode": "CN", "name": "33 East Nanjing Rd", "postalCode": "94108", "region": "SH", "street": "Stockton St", "streetNumber": "1", "subregion": "San Francisco County", "timezone": "America/Los_Angeles" };

  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    light: require('./assets/fonts/Poppins-Light.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    extrabold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
    semibold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    (async () => {
      setAddress(defaultAddresss);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (!fontsLoaded) {
    // Return a loading indicator or splash screen while fonts are loading or app is initializing
    return;
  }

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <UserReversedGeoCode.Provider value={{ address, setAddress }}>
        <RestaurantContext.Provider value={{ restaurantObj, setRestaurantObj }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name='bottom-navigation'
                component={BottomTab}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name='food-navigation'
                component={FoodNavigator}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name='restaurant-page'
                component={RestaurantPage}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name='restaurant'
                component={Restaurant}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name='rating'
                component={AddRating}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </RestaurantContext.Provider>
      </UserReversedGeoCode.Provider>
    </UserLocationContext.Provider>
  );
}
