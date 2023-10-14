import React from 'react';
import { View, Text, Button } from 'react-native';

function Screen2({ navigation }) {
  return (
    <View>
      <Text>Screen 2</Text>
      <Button
        title="Go to Screen B"
        //onPress={() => navigation.navigate('ScreenB')}
      />
    </View>
  );
}

export default Screen2;