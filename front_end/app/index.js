import Screen2 from "./Screen2";

import React from 'react';
import { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Button } from "react-native";
import { Stack, useRouter } from "expo-router";
// import { BarChart } from 'react-native-chart-kit';
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";

const Home = () => {
  const navigation = useNavigation();

  const goToScreen2 = () => {
    navigation.navigate('Screen2');
  };

  const router = useRouter()
  const [showScreen2, setShowScreen2] = useState(false);


    // Define your chart data as an array
    const chartData = [
      { name: "Item 1", value: 30 },
      { name: "Item 2", value: 50 },
      { name: "Item 3", value: 20 },
      { name: "Item 4", value: 45 },
      { name: "Item 5", value: 70 },
      { name: "Item 6", value: 35 },
      {
        value: 100,
        date: '10 Apr 2022',
        label: '10 Apr',
        labelTextStyle: {color: 'lightgray', width: 60},
      },
    ];

  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "WattSaver",
        }}
      />
 
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
            // backgroundColor: '#1C1C1C',
          }}
        >
            
          <Welcome

          />

          <LineChart data={chartData} 
            areaChart
            hideDataPoints
            isAnimated
            animationDuration={1200}
            startFillColor="#0BA5A4"
            startOpacity={1}
            endOpacity={0.3}
            initialSpacing={0}
            endSpacing={90}
            noOfSections={5}
            width={270}
            data={chartData}
            spacing={30}
            thickness={3}
            maxValue={400}
            yAxisColor="#0BA5A4"
            showVerticalLines
            verticalLinesColor="rgba(14,164,164,0.5)"
            xAxisColor="#0BA5A4"
            color="#0BA5A4"
            pointerConfig={{ pointerLabelComponent: items => {
              return (
                <View
                  style={{
                    height: 90,
                    width: 100,
                    justifyContent: 'center',
                  }}>
                    <Text style={{color: 'white', fontSize: 14, marginBottom:6,textAlign:'center'}}>
                      {items[0].date}
                    </Text>

                    <View style={{paddingHorizontal:14,paddingVertical:6, borderRadius:16, backgroundColor:'white'}}>
                    <Text style={{fontWeight: 'bold',textAlign:'center'}}>
                      {'$' + items[0].value + '.0'}
                    </Text>
                    </View>
                  </View>
              )
            }}}/>
          <Popularjobs />
          <Nearbyjobs />



        </View>
      </ScrollView>

      <Button title="Go to Screen2" onPress={goToScreen2} />

    </SafeAreaView>
  );
};

export default Home;
