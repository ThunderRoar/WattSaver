import React from 'react';
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Button, Image } from "react-native";
import { Stack, useRouter } from "expo-router";

// import { BarChart } from 'react-native-chart-kit';
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import { useNavigation } from '@react-navigation/native';
import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";



const Home = () => {
  const router = useRouter()
  const [chartData, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const endpoint = 'https://htv-node.onrender.com/api/query';
  
  const dayThomg = new Date();
  const dayString = `${dayThomg.getFullYear()}\-${dayThomg.getMonth() + 1}\-${dayThomg.getDate() - 1}T${dayThomg.getHours()}0:00:00.000Z`
  
  // const dateStamp = {
  //   // "timestamp": "2023-10-14T10:00:00.000Z"
  //   "timestamp": dayString
  // }

const getMovies = async () => {
    try {
      const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: '2023-10-14T10:00:00.000Z'
      }),
    });
      const d = await response.json();
      setData(d);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  console.log(chartData)
  const stringChart = JSON.stringify(chartData)
//  console.log(stringChart)
  // console.log(JSON.stringify(chartData))

 const badJSon = [{
    "solar": chartData.solar,
    "gas": chartData.gas,
    "wind": chartData.wind,
    "hydro": chartData.hydro,
    "biomass": chartData.biomass,
    'nuclear': chartData.nuclear
 }];

 console.log(badJSon)
  // Define your chart data as an array
  // const chartData = [
  //   { name: "Item 1", value: 30 },
  //   { name: "Item 2", value: 50 },
  //   { name: "Item 3", value: 20 },
  //   { name: "Item 4", value: 45 },
  //   { name: "Item 5", value: 70 },
  //   { name: "Item 6", value: 35 },
  //   {
  //     value: 100,
  //     date: '10 Apr 2022',
  //     label: '10 Apr',
  //     labelTextStyle: {color: 'lightgray', width: 60},
  //   },
  // ];

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
         
          <Welcome/>

          <LineChart data={badJSon} 
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

        </View>

      <View style={{flex: 1, paddingVertical: 50 ,padding: 10,}}>
      <Text style={{ fontSize: 20, textAlign: 'center' }}> Power Use Graph</Text>
        <Image 
          style={{
            width: null,
            height: 220,
            resizeMode:'contain',
          }}
          source={images.graph}/>
        <Text style={{ fontSize: 10, textAlign: 'center' }}> Above is the average power usage activity</Text>
      </View>

      </ScrollView>

      {/* <Button title="Go to Screen2" onPress={goToScreen2} /> */}

    </SafeAreaView>
  );
};

export default Home;
