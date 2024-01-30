import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import uidata from '../constants/uidata';
import { COLORS } from '../constants/theme';

const ChoicesList = () => {
  const [selected, setSelected] = useState(null);

  const handlePress = (item) => {
    if (selected === item.value) {
      setSelected(null);
    } else {
      setSelected(item.value);
    }
  };

  return (
    <View>
      <Text style={{
        marginLeft: 16,
        marginVertical: 12,
        fontSize: 18,
        fontFamily: 'bold',
      }}>Pick restaurant</Text>

      <FlatList
        data={uidata.choicesList}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled
        style={{ marginTop: 5, }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            style={{
              backgroundColor: selected === item.value ? COLORS.secondary : COLORS.lightWhite,
              height: 40,
              borderRadius: 12,
              marginHorizontal: 8,
              justifyContent: 'center',
            }}>
            <Text style={{
              marginHorizontal: 10,
              fontFamily: 'regular',
              fontSize: 13,
            }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChoicesList;

const styles = StyleSheet.create({});