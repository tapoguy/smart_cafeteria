import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios for API calls

// FavoriteButton component to handle the toggling of favorites
const FavoriteButton = ({ CustomerID, MenuItemID, isFavorite, onFavoriteToggle }) => {
  const toggleFavorite = () => {
    const newStatus = !isFavorite;
    
    // Call API to add/remove item from favorites
    axios.post('http://localhost:5000/api/favorites/add', {
      CustomerID,
      MenuItemID,
      IconStatus: newStatus
    })
    .then(response => {
      onFavoriteToggle(newStatus); // Update the favorite status
    })
    .catch(error => {
      console.log('Error adding/removing from favorites:', error);
    });
  };

  return (
    <TouchableOpacity onPress={toggleFavorite}>
      <FontAwesome 
        name={isFavorite ? "heart" : "heart-o"} 
        size={24} 
        color={isFavorite ? 'red' : '#564631'} 
      />
    </TouchableOpacity>
  );
};

const FoodItem = ({ name, description, price, isFavorite, imageUrl, CustomerID, MenuItemID, onFavoriteToggle }) => (
  <View style={tw`bg-white rounded-lg shadow-md p-4 mb-4 w-[48%]`}>
    <View style={tw`flex-row justify-between items-center mb-2`}>
      <Image
        source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} 
        style={tw`w-18 h-18 rounded-lg`}
        resizeMode="cover"
      />
      <FavoriteButton 
        CustomerID={CustomerID} 
        MenuItemID={MenuItemID} 
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
      <TouchableOpacity style={tw`bg-[#c48d0a] p-2 rounded-full`}>
        <FontAwesome name="plus" size={14} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);

const HomeScreen = () => {
  const navigation = useNavigation();

  const [favorites, setFavorites] = useState({
    "Rice & Chicken": true,
    "Chips & Chicken": false,
    "Rice & Beef": true,
    "Spaghetti & Chicken": false
  });

  const handleFavoriteToggle = (itemName, newStatus) => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [itemName]: newStatus
    }));
  };

  const recommendedItems = [
    {
      name: 'Rice & Chicken',
      description: 'Stew or grilled chicken with well-cooked rice',
      price: '2,200',
      isFavorite: favorites['Rice & Chicken'],
      MenuItemID: 1,
      imageUrl: require('../../assets/images/ricechicken.jpeg'),
    },
    {
      name: 'Chips & Chicken',
      description: 'Fried potato chips with grilled chicken',
      price: '2,400',
      isFavorite: favorites['Chips & Chicken'],
      MenuItemID: 2,
      imageUrl: require('../../assets/images/chipschicken.jpg'),
    },
    {
      name: 'Rice & Beef',
      description: 'Stew beef with well-cooked rice',
      price: '2,200',
      isFavorite: favorites['Rice & Beef'],
      MenuItemID: 3,
      imageUrl: require('../../assets/images/ricebeef.jpeg'),
    },
    {
      name: 'Spaghetti & Chicken',
      description: 'Crispy chicken with pasta and salad',
      price: '2,200',
      isFavorite: favorites['Spaghetti & Chicken'],
      MenuItemID: 4,
      imageUrl: require('../../assets/images/sphaghetti.jpg'),
    },
  ];

  const foodCategories = [
    { name: 'Samoosa', imageUrl: require('../../assets/images/samoosa.jpg') },
    { name: 'Cupcakes', imageUrl: require('../../assets/images/cupcake.jpeg') },
    { name: 'Soft Drink', imageUrl: require('../../assets/images/drinks.jpg') },
  ];

  return (
    <SafeAreaView style={tw`bg-[#fff] flex-1`}>
      <View style={tw`flex-row justify-between items-center mb-2 p-4`}>
        <FontAwesome name="search" size={20} color="#564631" />
        <FontAwesome name="bell" size={20} color="#564631" onPress={() => navigation.navigate ('Notification')} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={tw`p-4`}>
        <View style={tw`bg-white rounded-lg shadow-lg p-4 mb-6`}>
          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-1 pr-4`}>
              <Text style={tw`text-xl font-bold`}>Special Of The Day</Text>
              <Text style={tw`text-[#564631] mb-2`}>Finger Licker Offers</Text>
              <TouchableOpacity style={tw`bg-[#007bff] text-white px-6 py-2 rounded-full w-32`}>
                <Text style={tw`text-white font-medium`}>Order Now</Text>
              </TouchableOpacity>
            </View>
            <Image source={require('../../assets/images/chipschicken.jpg')} style={tw`rounded-lg w-24 h-24`} resizeMode="cover" />
          </View>
        </View>

        <View style={tw`flex-row justify-around mb-6`}>
          {foodCategories.map((category, index) => (
            <View key={index} style={tw`text-center`}>
              <Image
                source={typeof category.imageUrl === 'string' ? { uri: category.imageUrl } : category.imageUrl}
                style={tw`mb-2 rounded-full w-16 h-16`}
                resizeMode="cover"
              />
              <Text style={tw`text-sm font-medium`}>{category.name}</Text>
            </View>
          ))}
        </View>

        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-lg font-semibold`}>Recommended for you</Text>
          <Text style={tw`text-[#007bff]`}>See More</Text>
        </View>

        <View style={tw`flex flex-wrap flex-row justify-between mb-10`}>
          {recommendedItems.map((item, index) => (
            <FoodItem  
              key={index}  
              name={item.name}  
              description={item.description}  
              price={item.price}  
              isFavorite={item.isFavorite}  
              MenuItemID={item.MenuItemID} 
              imageUrl={item.imageUrl}  
              CustomerID={1}  // Dummy CustomerID, replace with actual logged-in user's ID
              onFavoriteToggle={newStatus => handleFavoriteToggle(item.name, newStatus)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={tw`absolute bottom-0 left-0 right-0 bg-white shadow-lg p-8 flex-row justify-around`}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesome name="home" size={20} color="#c48d0a" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
          <FontAwesome name="bars" size={20} color="#564631" />
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

export default HomeScreen;
