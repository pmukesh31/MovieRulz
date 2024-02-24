import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme/index';
import Loading from '../components/loading';
import { fallBackPerson, fetchPersonDetails, fetchPersonMovies, image342 } from '../api/moviedb';
import MovieList from '../components/movieList';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? {} : { marginVertical: 3 };

export default function PersonScreen() {
    const {params:item}=useRoute();
    const navigate = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [loading,setLoading]=useState(false);
    const [person,setPerson]=useState({});
    const [personMovie,setPersonMovies]=useState([]);
    useEffect(()=>{
        setLoading(true);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    },[item])

    const getPersonDetails=async id=>{
        const data=await fetchPersonDetails(id);
        if(data) setPerson(data)
        setLoading(false);
    }

    const getPersonMovies=async id=>{
        const data=await fetchPersonMovies(id);
        if(data && data.cast) setPersonMovies(data.cast)
        setLoading(false);
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#333' }} contentContainerStyle={{ paddingBottom: 20 }}>
            <SafeAreaView style={{ zIndex: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4, ...verticalMargin }}>
                <TouchableOpacity onPress={() => navigate.goBack()} style={{ borderRadius: 20, padding: 2, backgroundColor: styles.background.backgroundColor }}>
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} >
                    <HeartIcon size={35} color="white" />
                </TouchableOpacity>
            </SafeAreaView>
            {
                loading?
                    <Loading/>:(
            
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'center',shadowColor:'gray',shadowRadius:40,shadowOffset:{width:0,heigth:5},shadowOpacity:1 }}>
                    <View style={{ alignItems: 'center', borderRadius:9999 , overflow: 'hidden', height: 288, width:288, borderColor: 'gray', borderWidth: 1 }}>
                        <Image
                            source={{uri:image342(person?.profile_path) || fallBackPerson}}
                            style={{ height: height * 0.43, width: width * 0.74 }}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 24 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>{person?.name}</Text>
                </View>
                <View style={{ marginTop: 24, marginBottom: 24, marginLeft: 16, marginRight: 16,marginTop:8 }}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Biography</Text>
                    <Text style={{ color: '#ccc' }}>
            
                            {person?.biography || 'NA'}
                        </Text>
                </View>
                <MovieList title={'Movies'} hideSeeAll={true} data={personMovie}/>
            </View>
                    )}
        </ScrollView>
    );
}
