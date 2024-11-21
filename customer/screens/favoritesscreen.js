import React, { useState, useEffect } from 'react'; 
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import FavoriteButton from '../../customer/component/FavoriteButton'; // Import FavoriteButton

const FoodItem = ({ name, description, price, imageUrl, isFavorite, CustomerID, MenuItemID }) => (
    <View style={tw`bg-white rounded-lg shadow-md p-4 mb-4 w-[100%]`}>
        <View style={tw`flex-row justify-between items-center mb-2`}>
            <Image 
                source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} 
                style={tw`w-25 h-25 rounded-lg`} 
                resizeMode="cover" 
            />
            {/* Using the FavoriteButton to toggle the favorite status */}
            <FavoriteButton CustomerID={CustomerID} MenuItemID={MenuItemID} />
        </View>
        <Text style={tw`text-sm font-semibold`}>{name}</Text>
        <Text style={tw`text-xs text-gray-500`} numberOfLines={2}>
            {description}
        </Text>
        <View style={tw`flex-row justify-between items-center mt-2`}>
            <Text style={tw`text-lg font-bold`}>MK{price}</Text>
            <TouchableOpacity style={tw`bg-[#c48d0a] p-2 rounded-full`}>
                <FontAwesome name="plus" size={14} color="white" />
            </TouchableOpacity>
        </View>
    </View>
);

const FavoritesScreen = () => {
    const navigation = useNavigation();
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [customerID, setCustomerID] = useState('12345'); // Replace with actual customer ID

    // Fetch the customer's favorite items when the component mounts
    useEffect(() => {
        axios.get(`http://localhost:5000/api/favorites/${customerID}`)
            .then(response => {
                setFavoriteItems(response.data); // Assuming the API returns an array of favorite items
            })
            .catch(error => {
                console.log('Error fetching favorites:', error);
            });
    }, [customerID]);

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <View style={tw`flex-row justify-between items-center mb-2 p-4`}>
                <FontAwesome name="search" size={20} color="#564631" />
                <FontAwesome name="bell" size={20} color="#564631" onPress={() => navigation.navigate('Notification')} />
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={tw`p-4`}
            >
                <Text style={tw`text-xl font-bold text-black mb-4`}>Your Favorites</Text>

                <View style={tw`flex flex-wrap flex-row justify-between mb-10`}>
                    {favoriteItems.map((item, index) => (
                        <FoodItem
                            key={index}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            isFavorite={item.isFavorite}
                            CustomerID={customerID}
                            MenuItemID={item.id} // Assuming the API provides an item ID
                        />
                    ))}
                </View>
            </ScrollView>

            <View style={tw`absolute bottom-0 left-0 right-0 bg-white shadow-lg p-8 flex-row justify-around`}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <FontAwesome name="home" size={20} color="#564631" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                    <FontAwesome name="bars" size={20} color="#564631" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                    <FontAwesome name="heart" size={20} color="#c48d0a" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <FontAwesome name="shopping-cart" size={20} color="#564631" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <FontAwesome name="user" size={20} color="#564631" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default FavoritesScreen;
