import {usestate} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import {useRouter} from 'expo-router'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import { isLoading } from 'expo-font';

const Popularjobs = () => {
  const router = useRouter();
  const isLoading = false;
  const error = false;


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Appliances</Text>
        <TouchableOpacity> 
          <Text style={styles.headerBtn}> Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading?(
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ):error ? (
          <Text> Something Went Wrong</Text>
        ) : (
          <FlatList
            data = {[1]}
            renderItem={({item })=>(
              <PopularJobCard 
                item = {item}
              />
            )}
            keyExtractor={item=>item?.job_id}
            contentContainerStyle={{columnGap:SIZES.medium}}
            horizontal
          />

        )}
      </View>
    </View>
  )
}

export default Popularjobs