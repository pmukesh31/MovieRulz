import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { fallBackPerson, image185 } from '../api/moviedb';

export default function Cast({ cast, navigation }) {
    let personName = "Keanu";
    let charName = 'John Wick';

    return (
        <View style={{ marginTop: 24 }}>
            <Text style={{ color: 'white', fontSize: 18, marginLeft: 16, marginBottom: 10 }}>Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {cast && cast.map((person, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{ marginRight: 12, alignItems: 'center' }}
                        onPress={() => navigation.navigate('Person', person)}
                    >
                        <View style={{ overflow: 'hidden', borderRadius: 50, height: 80, width: 80, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ccc' }}>
                            <Image
                                style={{ borderRadius: 40, height: 80, width: 80 }}
                                source={{uri:image185(person?.profile_path) || fallBackPerson}}
                            />
                        </View>
                        <Text style={{ color: 'white', fontSize: 12, marginTop: 5 }}>
                            {person?.character.length > 10 ? person?.character.slice(0, 10) + '...' : person?.character}
                        </Text>
                        <Text style={{ color: '#ccc', fontSize: 12, marginTop: 5 }}>
                            {person?.original_name.length > 10 ? person?.original_name.slice(0, 10) + '...' : person?.original_name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
