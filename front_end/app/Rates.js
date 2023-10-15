import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { images } from "../constants";


function Rates({ navigation }) {
  return (
    <View style={{flex: 1, paddingVertical: 150 ,padding: 10,}}>
    <Text style={{ fontSize: 20, textAlign: 'center' }}> Below is the current cost per kilowatt-hour of energy consumption for this season </Text>
    <Image 
      style={{
        width: null,
        height: 220,
        resizeMode:'contain',
      }}
      source={images.tou}/>
  </View>
  );
}

export default Rates;