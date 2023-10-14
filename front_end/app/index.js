import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { BarChart } from 'react-native-chart-kit';

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";

const Home = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");
    // Define your chart data as an array
    const chartData = [
        { name: "Item 1", value: 30 },
        { name: "Item 2", value: 50 },
        { name: "Item 3", value: 20 },
    ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
          ),
          headerTitle: "WattSaver",
        }}
      />
 
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
            
          <Welcome

          />

    <BarChart
    data={{
      labels: chartData.map((item) => item.name),
      datasets: [
        {
          data: chartData.map((item) => item.value),
        },
      ],
    }}
    width={SIZES.width} // You can adjust the width as needed
    height={200} // You can adjust the height as needed
    style={{margin:10, padding:10}}
    yAxisLabel="Value"
    fromZero
    chartConfig={{
      backgroundGradientFrom: COLORS.primary,
      backgroundGradientTo: COLORS.primary,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    }}
  />
  
          <Popularjobs />
          <Nearbyjobs />



        </View>
      </ScrollView>


    </SafeAreaView>
  );
};

export default Home;
