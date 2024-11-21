import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useCart } from '../../context/cartcontext';

// FavoriteButton Component
const FavoriteButton = ({ CustomerID, MenuOfTheDayID, isFavorite, onFavoriteToggle }) => {
  const toggleFavorite = () => {
    const newStatus = !isFavorite;

    axios
      .post('http://172.20.10.2:5000/api/favorites/add', {
        CustomerID,
        MenuOfTheDayID,
        IconStatus: newStatus,
      })
      .then(() => {
        onFavoriteToggle(newStatus);
      })
      .catch((error) => {
        console.error('Error updating favorite:', error);
      });
  };

  return (
    <TouchableOpacity onPress={toggleFavorite}>
      <FontAwesome
        name={isFavorite ? 'heart' : 'heart-o'}
        size={24}
        color={isFavorite ? 'red' : '#564631'}
      />
    </TouchableOpacity>
  );
};

// FoodItem Component
const FoodItem = ({
  name,
  description,
  price,
  isFavorite,
  imageUrl,
  CustomerID,
  MenuOfTheDayID,
  onFavoriteToggle,
  onAddToCart,
}) => {
  const handleAddToCart = () => {
    if (!MenuOfTheDayID) {
      console.error('MenuOfTheDayID is undefined for this item');
      return;
    }
    onAddToCart({ id: MenuOfTheDayID, name, description, imageUrl, price });
  };

  // Constructing the full image URL
  const baseUrl = 'http://172.20.10.2:5000';  // Backend base URL
  const fullImageUrl = imageUrl && (imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`);
  
  console.log(`Image URL for ${name}:`, fullImageUrl); // Debugging the image URL

  return (
    <View style={tw`bg-white rounded-lg shadow-md p-4 mb-4 w-[48%]`} key={MenuOfTheDayID}>
      <View style={tw`flex-row justify-between items-center mb-2`}>
        {fullImageUrl ? (
          <Image
            source={{ uri: fullImageUrl }} // Use the full URL for the image
            style={tw`w-24 h-24 rounded-lg`}  // Adjust size
            resizeMode="cover"
          />
        ) : (
          <Text style={tw`text-gray-400`}>No image available</Text>
        )}
        <FavoriteButton
          CustomerID={CustomerID}
          MenuOfTheDayID={MenuOfTheDayID}
          isFavorite={isFavorite}
          onFavoriteToggle={onFavoriteToggle}
        />
      </View>
      <Text style={tw`text-sm font-semibold`}>{name}</Text>
      <Text style={tw`text-xs text-gray-500`} numberOfLines={2}>
        {description}
      </Text>
      <View style={tw`flex-row justify-between items-center mt-2`}>
        <Text style={tw`text-lg font-bold`}>MK{price}</Text>
        <TouchableOpacity
          style={tw`bg-[#c48d0a] px-3 py-1 rounded-full`}
          onPress={handleAddToCart}
        >
          <Text style={tw`text-white text-sm`}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// MenuScreen Component
const MenuScreen = () => {
  const navigation = useNavigation();
  const { addItemToCart } = useCart();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://172.20.10.2:5000/api/menu_of_the_day');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        console.log('Fetched menu items:', data); // Debugging the fetched data

        setItems(data);

        // Initialize favorites state
        const initialFavorites = {};
        data.forEach((item) => {
          initialFavorites[item.MenuOfTheDayID] = item.isFavorite || false;
        });
        setFavorites(initialFavorites);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setError('Failed to fetch menu items');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleFavoriteToggle = (menuOfTheDayID, newStatus) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [menuOfTheDayID]: newStatus,
    }));
  };

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={tw`p-4`}>
        <View style={tw`flex-row items-center bg-white p-2 rounded-full shadow-md mb-4`}>
          <FontAwesome name="search" size={20} color="#564631" style={tw`ml-2`} />
          <TextInput
            placeholder="Search..."
            style={tw`flex-grow p-2 text-[#564631]`}
            placeholderTextColor="#564631"
          />
          <FontAwesome name="microphone" size={20} color="#564631" style={tw`mr-2`} />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`flex-row justify-between mb-4`}
        >
          <TouchableOpacity style={tw`bg-[#564631] flex-row items-center px-4 py-2 h-8 rounded-full mx-2`}>
            <FontAwesome name="bolt" size={16} color="#fff" style={tw`mr-2`} />
            <Text style={tw`text-white font-medium`}>Special of the Day</Text>
          </TouchableOpacity>
        </ScrollView>

        {loading ? (
          <ActivityIndicator size="large" color="#564631" />
        ) : error ? (
          <Text style={tw`text-red-500 text-center`}>{error}</Text>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`flex flex-wrap flex-row justify-between mb-10`}
          >
            {items.length > 0 ? (
              items.map((item) => (
                <FoodItem
                  key={item.MenuOfTheDayID}
                  name={item.ItemName}
                  description={item.ItemDescription}
                  price={item.Price}
                  isFavorite={favorites[item.MenuOfTheDayID]}
                  MenuOfTheDayID={item.MenuOfTheDayID}
                  imageUrl={item.ImageURL}
                  CustomerID={1}
                  onFavoriteToggle={(newStatus) => handleFavoriteToggle(item.MenuOfTheDayID, newStatus)}
                  onAddToCart={addItemToCart}
                />
              ))
            ) : (
              <Text style={tw`text-center text-black`}>No items found for the menu of the day</Text>
            )}
          </ScrollView>
        )}
      </View>

      <View style={tw`absolute bottom-0 left-0 right-0 bg-white p-8 flex-row justify-around`}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesome name="home" size={20} color="#564631" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
          <FontAwesome name="bars" size={20} color="#c48d0a" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <FontAwesome name="heart" size={20} color="#564631" />
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

export default MenuScreen;
