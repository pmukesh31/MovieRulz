import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme/index';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';

const ios = Platform.OS == "ios";
export default function HomeScreen() {

    const [trending,setTrending]=useState([]);
    const [upcoming,setUpcoming]=useState([]);
    const [topRated,setTopRated]=useState([]);
    const [loading,setLoading]=useState(true);
    const navigation=useNavigation();

    useEffect(()=>{
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    },[]);

    const getTrendingMovies=async()=>{
        const data=await fetchTrendingMovies();
        if(data && data.results) setTrending(data.results);
        setLoading(false);
    }
    const getUpcomingMovies=async()=>{
        const data=await fetchUpcomingMovies();
        if(data && data.results) setUpcoming(data.results);
    }
    const getTopRatedMovies=async()=>{
        const data=await fetchTopRatedMovies();
        if(data && data.results) setTopRated(data.results);
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}> 
            <SafeAreaView style={ios ? { marginBottom: -2 } : { marginBottom: 3 }}> 
                <StatusBar style="light" />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 4 }}> 
                    <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" /> 
                    <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {
                loading?(
                    <Loading></Loading>
                ):(
            
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
            >
                {trending.length>0 && <TrendingMovies data={trending}/>}
                {upcoming.length>0 && <MovieList title="Upcoming" data={upcoming}/>}
                {topRated.length>0 && <MovieList title="TopRated" data={topRated}/>}

            </ScrollView>
    )}
        </View>
                
    )
}
