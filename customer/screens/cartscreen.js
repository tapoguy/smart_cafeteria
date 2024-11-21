import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, TextInput, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../context/cartcontext';
import axios from 'axios';

const CartScreen = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  const {
    cartItems,
    updateQuantity,
    toggleSelection,
    removeUnselectedItems,
    clearCart,
  } = useCart();

  const subtotal = cartItems
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const additionalCosts = 2000;
  const total = subtotal + additionalCosts;

  const [modalVisible, setModalVisible] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const customerID = '1';

  const confirmOrder = async () => {
    try {
      const orderData = {
        customerID,
        menuItems: cartItems
          .filter(item => item.selected)
          .map(item => ({
            MenuOfTheDayID: item.id,
            Quantity: item.quantity,
          })),
      };

      const response = await axios.post('http://172.20.10.2:5000/api/orders', orderData);

      if (response.status === 200) {
        setOrderSuccess(true);
        setModalVisible(false);
        clearCart();
        navigation.navigate('OrderConfirmation');
      } else {
        console.error('Failed to place order', response);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order. Please try again.');
    }
  };

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={tw`flex-row justify-between items-center mb-2 p-4`}>
        <FontAwesome name="search" size={20} color="#564631" />
        <FontAwesome name="bell" size={20} color="#564631" onPress={() => navigation.navigate('Notification')} />
      </View>

      <ScrollView contentContainerStyle={tw`p-4`} showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <View key={item.id} style={tw`bg-white p-4 rounded-lg shadow-md mb-4 flex-row`}>
            <TouchableOpacity onPress={() => toggleSelection(item.id)} style={tw`mr-2`}>
              <FontAwesome
                name={item.selected ? 'check-square' : 'square-o'}
                size={20}
                color={item.selected ? '#c48d0a' : '#564631'}
              />
            </TouchableOpacity>
            <Image source={{ uri: item.imageUrl }} style={tw`w-20 h-20 rounded-lg mr-4`} resizeMode="cover" />
            <View style={{ flex: 1 }}>
              <Text style={tw`text-lg font-bold text-black`}>{item.name}</Text>
              <Text style={tw`text-sm text-gray-600`} numberOfLines={2}>
                {item.description}
              </Text>
              <Text style={tw`text-[#564631] mt-2`}>MK{item.price.toLocaleString()}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={tw`flex-row items-center`}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 'subtract')} style={tw`p-2 bg-[#c48d0a] rounded-full`}>
                  <FontAwesome name="minus" size={12} color="#fff" />
                </TouchableOpacity>
                <Text style={tw`mx-3 text-lg text-black`}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 'add')} style={tw`p-2 bg-[#c48d0a] rounded-full`}>
                  <FontAwesome name="plus" size={12} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
          <TextInput
            placeholder="Enter your promo code"
            style={tw`p-4 bg-gray-100 rounded-lg`}
            placeholderTextColor="#564631"
          />
        </View>

        <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
          <Text style={tw`text-lg font-bold text-black mb-2`}>Order Summary</Text>
          <View style={tw`flex-row justify-between`}>
            <Text>Subtotal</Text>
            <Text>MK{subtotal.toLocaleString()}</Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text>Additional Costs</Text>
            <Text>MK{additionalCosts.toLocaleString()}</Text>
          </View>
          <View style={tw`flex-row justify-between font-bold`}>
            <Text>Total</Text>
            <Text>MK{total.toLocaleString()}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={tw`p-4 bg-white shadow-lg mb-12`}>
        <TouchableOpacity style={tw`bg-[#c48d0a] py-4 rounded-lg`} onPress={() => setModalVisible(true)}>
          <Text style={tw`text-white text-center font-bold`}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white p-6 rounded-lg w-80`}>
            <Text style={tw`text-lg font-bold text-black mb-4`}>Are you sure you want to place the order?</Text>
            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity
                style={tw`bg-gray-300 py-2 px-4 rounded-lg`}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-[#c48d0a] py-2 px-4 rounded-lg`}
                onPress={confirmOrder}
              >
                <Text style={tw`text-white`}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {orderSuccess && (
        <View style={tw`absolute top-0 left-0 right-0 bg-[#c48d0a] p-4`}>
          <Text style={tw`text-white text-center font-bold`}>Order Placed Successfully!</Text>
        </View>
      )}

      <View style={tw`absolute bottom-0 left-0 right-0 bg-white p-8 flex-row justify-around`}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesome name="home" size={20} color="#564631" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
          <FontAwesome name="bars" size={20} color="#564631" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <FontAwesome name="heart" size={20} color="#564631" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <FontAwesome name="shopping-cart" size={20} color="#c48d0a" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <FontAwesome name="user" size={20} color="#564631" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
