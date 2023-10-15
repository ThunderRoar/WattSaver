import React from 'react';
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Button, Image, FlatList } from "react-native";
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
       // timestamp: dayString
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

  // console.log(chartData)
  const stringChart = JSON.stringify(chartData)
//  console.log(stringChart)
  // console.log(JSON.stringify(chartData))

//  const badJSon = [{
//     "solar": chartData.solar,
//     "gas": chartData.gas,
//     "wind": chartData.wind,
//     "hydro": chartData.hydro,
//     "biomass": chartData.biomass,
//     'nuclear': chartData.nuclear
//  }];

//  const badJSon = [{
//   "solar": 174,
//   "gas": 882,
//   "wind": 2747 ,
//   "hydro": 3893,
//   "biomass": 0,
//   'nuclear': 9147,
// }];

 //console.log(badJSon)
  // Define your chart data as an array
  const cd = [
    { name: "Solar", value: 8.49 },
    { name: "Gas", value: 9.00 },
    { name: "Wind", value: 8.46 },
    { name: "Hydro", value: 7.07 },
    { name: "Biomass", value: 9.00 },
    { name: "Nuclear", value: 4.89 },
    {
      value: 100,
      date: '15 Oct 2022',
      label: '15 Oct',
      labelTextStyle: {color: 'lightgray', width: 60},
    },
  ];
  const nuclear = [{value: 4.89},{value: 5.36},{value: 5.97},{value: 6.61},{value: 7.06}];
  const hydro = [{value: 7.07},{value: 7.76},{value: 8.52},{value: 9.20},{value: 9.98}];
  const wind = [{value: 8.46},{value: 9.32},{value: 10.31},{value: 11.32},{value: 12.18}];
  const solar = [{value: 8.49},{value: 9.40},{value: 10.42},{value: 11.36},{value: 12.30}];
  const gas = [{value: 9.00},{value: 10.00},{value: 11.00},{value: 12.00},{value: 13.00}];
  const biomass = [{value: 9.00},{value: 10.00},{value: 11.00},{value: 12.00},{value: 13.00}];


  const createAreaChartData = () => {
    const areaChartData = [];

    for (const key in badJSon[0]) {
      areaChartData.push({
        name: key,
        data: badJSon.map(item => item[key]),
      });
    }

    return areaChartData;
  };

  const pointerConfig = {
    pointerLabelComponent: (items) => {
      const data = items[0]; // Get the first data point
      return (
        <View style={{ width: 100, justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: 14, marginBottom: 6, textAlign: 'center' }}>
            {data.date}
          </Text>
          <View style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: 'white' }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
              {'$' + data.value + '.0'}
            </Text>
          </View>
        </View>
      );
    },
  };

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
            // leftpadding: 10,
          }}
        >
         
          <Welcome/>
          
          {/* {chartData.length > 0 && ( */}
          <LineChart
            // data={cd}
            data={nuclear}
            color1='orange'
            dataPointsColor1='orange'
            startFillColor1='orange'

            data2={hydro}
            color2='skyblue'
            dataPointsColor2='blue'
            startFillColor2='skyblue'

            data3={wind}
            color3='green'
            dataPointsColor3='green'
            startFillColor3='green'

            data4={solar}
            color4='yellow'
            dataPointsColor4='yellow'
            startFillColor4='yellow'

            data5={gas}
            color5='red'
            dataPointsColor5='red'
            startFillColor5='red'

            // data6={biomass}
            areaChart
            curved
            hideDataPoints
            isAnimated
            animationDuration={1200}
            startFillColor="#0BA5A4"
            startOpacity={0.1}
            endOpacity={0.3}
            initialSpacing={0}
            endSpacing={300}
            noOfSections={5}
            yAxisLabelSuffix={"W"}
            width={275}
            spacing={50}
            thickness={2.5}
            maxValue={15}
            yAxisColor="#0BA5A4"
            showVerticalLines
            verticalLinesColor="rgba(14,164,164,0.5)"
            xAxisColor="#0BA5A4"
            color="#0BA5A4"
            pointerConfig={pointerConfig}/>
          {/* )} */}
        <Popularjobs/>
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
    </SafeAreaView>
  );
};

export default Home;
