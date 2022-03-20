/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';


const App: () => Node = () => {
    
    const [pokemon, setPokemon] = useState([]);
    
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  const fetchData = async () => {
      try {
          const uri = `https://pokeapi.co/api/v2/pokemon?offset=60&limit=40`;
        const {data} = await axios.get(uri);
        setPokemon(data);
      } catch (e) {
          console.log(e);
      }
  }
  
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
      </ScrollView>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white, height: "70%"
        }}>
        <FlatList
            data={pokemon.results}
            keyExtractor={item => item.name}
            renderItem={(item) =>
                <Text  style={{color: "#000000"}}>{item.item.name}</Text>
        }/>
      </View>
    </SafeAreaView>
  );
};

export default App;
