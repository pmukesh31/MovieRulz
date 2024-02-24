import React, { useCallback, useState } from 'react';
import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
const { width, height } = Dimensions.get('window');
import _ from 'lodash';
import { fallBackMovie, image185, searchMovies } from '../api/moviedb';
export default function SearchScreen() {
    const movieName = 'Ant-Man and the Wasp: Quantum';
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading,setLoading]=useState(false);
    const handleSearch=value=>{
        if(value && value.length>2){
            setLoading(true);
            searchMovies(value).then(data=>{
            setLoading(false);
            if(data && data.results) setResults(data.results)
        })}
        else
        {
            setLoading(false);
            setResults([]);
        }
    }    
    const handleTextDebounce=useCallback(_.debounce(handleSearch,400),[]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#333' }}>
            <View style={{ marginHorizontal: 16, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#555', borderRadius: 20 }}>
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    style={{ paddingBottom: 1, paddingLeft: 6, flex: 1, fontSize: 16, fontWeight: '600', color: 'white', letterSpacing: 1 }}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={{ borderRadius: 25, padding: 8, margin: 4, backgroundColor: '#555' }}
                >
                    <XMarkIcon size={25} color="white" />
                </TouchableOpacity>
            </View>
            {
                loading?
                    <Loading/>:(
                results.length > 0 ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        style={{ marginBottom: 20 }}
                    >
                        <Text style={{ color: 'white', fontWeight: '600', marginLeft: 16 }}>Results ({results.length})</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            {results.map((item, index) => (
                                <TouchableWithoutFeedback
                                    key={index}
                                    onPress={() => navigation.push("Movie", item)}
                                >
                                    <View style={{ marginBottom: 16 }}>
                                        <Image
                                            source={{uri:image185(item?.poster_path) || fallBackMovie}}
                                            style={{ width: width * 0.44, height: height * 0.3, borderRadius: 12 }}
                                        />
                                        <Text style={{ color: '#ccc', marginLeft: 16, marginTop: 5 }}>
                                            {item?.title.length > 22 ? item?.title.slice(0, 22) + "..." : item?.title}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            ))}
                        </View>
                    </ScrollView>
                ) : (
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    </View>
                )
                    )}
        </SafeAreaView>
    );
}
