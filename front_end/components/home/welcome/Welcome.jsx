import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import Rates from "../../../app/Rates";
import PowerSources from "../../../app/PowerSources";
import Planning from "../../../app/Planning";


import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
 } from 'react-native'
//import { useRouter } from 'expo-router';

import styles from './welcome.style'
import {icons, SIZES} from '../../../constants'
import {HorizontalBarGraph} from "../../../components"; 
import {VerticalBarGraph} from "../../../components"; 


const jobTypes = ["Rates", "Power Sources", "Planning"];


const Welcome = () => {
  const navigation = useNavigation(); // Use the useNavigation hook

  //const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Rates');
  const Spacer = ({ size }) => (
    <View style={{ height: size, width: size }} />
  );
     
  return (
    <View>

      <View style={styles.container}>
        <Text style={styles.userName}> Hello Vincent </Text>
        <Text style={styles.welcomeMessage}> Energy Usage</Text>
      </View>
      <Text></Text>
      <Text>  Check the Current:</Text>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.tab(activeJobType, item)}
              onPress={()=>{
                setActiveJobType(item);
                if (item === "Rates") {
                  navigation.navigate('Rates'); // Navigate to the "Rates" screen
                } else if (item === "Power Sources"){
                  navigation.navigate('PowerSources'); // Navigate to the "Rates" screen
                } else if (item === "Planning"){
                    navigation.navigate('Planning'); // Navigate to the "Rates" screen
                } else {
                  // Handle other job types as needed
                }
                //router.push(`/search/${item}`)
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}> {item} </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{columnGap: SIZES.small}}
          horizontal
        />
      </View>


{/* spacing */}
      <View>
        <Spacer size={50} />
      </View>


      <View style={styles.container}>
        <Image        
          style={styles.icon}
        />
        <Text style={styles.title}>Energy Consumption</Text>
        <Text style={styles.value}>125 kWh</Text>
        <Text style={styles.subtitle}>This Month</Text>
      </View>
    </View>
  )
}

export default Welcome