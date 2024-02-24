import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme/index';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallBackMovie, fetchMovieCredit, fetchMovieDetail, image500 } from '../api/moviedb';
const movieName = 'Ant-Man and the Wasp: Quantum';
const ios = Platform.OS == 'ios';
const topMargin = ios ? { marginTop: 0 } : { marginTop: 3 };
const { width, height } = Dimensions.get('window');

export default function MovieScreen() {

    const { params: item } = useRoute();
    useEffect(() => {
        setLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
    }, [item]);

    const getMovieDetails=async id=>{
        const data=await fetchMovieDetail(id);
        if(data) setMovie(data);
        setLoading(false);
    }

    const getMovieCredits=async id=>{
        const data=await fetchMovieCredit(id);
        if(data && data.cast) setCast(data.cast);
    }
    const [cast, setCast] = useState([]);
    const navigation = useNavigation();
    const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
    const [loading,setLoading]=useState(false);
    const [movie,setMovie]=useState({});
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            style={{ flex: 1, backgroundColor: '#333' }}
        >
            <View style={{ width: '100%' }}>
                <SafeAreaView style={{ position: 'absolute', zIndex: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4, ...topMargin }}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{ borderRadius: 20, padding: 2, ...styles.background }}>
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <HeartIcon size={35} color="white" />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading?
                        <Loading/>:
                (
                <View>
                    <Image
                        source={{uri:image500(movie?.poster_path) || fallBackMovie}}
                        style={{ width, height: height * 0.55 }} />
                    <LinearGradient
                        colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                        style={{ width, height: height * 0.40, position: 'absolute', bottom: 0 }}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                    />
                </View>
                )}
            </View>
            <View style={{ marginTop: -(height * 0.09), marginBottom: 20 }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center', letterSpacing: 1 }}>
                    {movie?.title}
                </Text>
                {
                    movie?.id?(
                        <Text style={{ color: 'white', fontSize: 14, fontWeight: '600', textAlign: 'center', marginTop: 5 }}>
                            {movie?.status} ▪️ {movie?.release_date?.split('-')[0]} ▪️ {movie?.runtime} min
                        </Text>
                        ):null}
                
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
                {
                    movie?.genres?.map((genre,index)=>{
                        let showDot=index+1!=movie.genres.length;
                        return (
                            <Text key={index} style={{ color: 'white', fontSize: 14, fontWeight: '600', marginRight: 5 }}>
                                {genre?.name} {showDot?"▪️":null}
                            </Text>
                        )
                    })
                }
                    
                
                </View>
                <Text style={{ color: 'white', fontSize: 14, marginTop: 10, paddingHorizontal: 10,  letterSpacing:1}}>
                    {
                        movie?.overview
                    }
                </Text>
            </View>
            {cast.length>0 && <Cast navigation={navigation} cast={cast}/>}
                {/*<MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies}/>*/}
        </ScrollView>
    );
}
