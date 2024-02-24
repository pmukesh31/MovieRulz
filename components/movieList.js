import { View, Text, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native';
import React from 'react';
import { styles } from "../theme/index";
import { useNavigation } from '@react-navigation/native';
import {image500,image342,image185, fallBackMovie} from '../api/moviedb';

var {width,height}=Dimensions.get('window')
export default function MovieList({title,data ,hideSeeAll}) {
    const navigation = useNavigation();
    return (
        <View style={{ marginBottom: 8, marginTop: 4 }}>
            <View style={{ marginHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={ {color: 'white', fontSize: 20, marginLeft: 10, marginRight: 16, marginBottom: 15}}>{title}</Text>
                {
                        !hideSeeAll && (
                            <TouchableOpacity>
                                <Text style={[styles.text, { fontSize: 18 }]}>See All</Text>
                            </TouchableOpacity>

                        )
                        }
                
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {data.map((item, index) => (
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={() => navigation.push('Movie', item)}
                    >
                        <View style={{marginTop:4, marginRight:16 }}>
                            <Image
                                source={{uri:(image185(item.poster_path)) || fallBackMovie}}

                                style={{width:width*0.33,height:height*0.22,borderRadius:24}}
                            />
                            <Text style={{ color: '#ccc', marginLeft: 4 }}>
                                {item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
        </View>
    );
}
