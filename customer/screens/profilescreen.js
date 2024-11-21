import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = () => {
    const screenWidth = Dimensions.get('window').width;
    const navigation = useNavigation();

    return (
        <View style={tw`flex-1 bg-white`}>
            {/* Scrollable Content */}
            <SafeAreaView style={tw`flex-1`}>
                <ScrollView contentContainerStyle={tw`flex-grow`} bounces= {false}>
                    {/* Background Image */}
                    <View style={tw`relative`}>
                        <Image 
                            source={require('../../assets/images/food1.jpg')}
                            style={[{ width: screenWidth, height: screenWidth * 0.6, resizeMode: 'cover' }, tw`absolute top-0`]} 
                        />
                    </View>

                    {/* Profile Header */}
                    <View style={tw`bg-transparent p-6}`}>
                        <View style={tw`items-center`}>
                            {/* Profile Picture */}
                            <Image 
                                source={require('../../assets/images/profile.jpg')} 
                                style={[tw`rounded-full shadow-md`, { width: screenWidth * 0.25, height: screenWidth * 0.25 }]} 
                            />
                            
                            {/* User Name */}
                            <Text style={{ fontSize: 18, fontWeight: '800', color: '#fff', marginTop: 10 }}> 
                                Group 2 
                            </Text>
                            
                            {/* User Quote or Tagline */}
                            <Text style={tw`text-[#fff] mt-1`}> 
                                Enjoy every meal at Daeyang Cafeteria! 
                            </Text>
                        </View>

                        {/* Horizontal Data Sections */}
                        <View style={tw`flex-row justify-between mt-8 bg-white rounded-lg shadow-md p-4 `}>
                            {/* Meals Ordered */}
                            <View style={tw`flex-1 items-center`}>
                                <Text style={tw`text-[#c48d0a] font-bold text-lg`}>32</Text> 
                                <Text style={tw`text-[#564631] mt-1`}>Meals Ordered</Text>
                            </View>

                            {/* Amount Spent */}
                            <View style={tw`flex-1 items-center`}>
                                <Text style={tw`text-[#c48d0a] font-bold text-lg`}>MK 75,000</Text> 
                                <Text style={tw`text-[#564631] mt-1`}>Amount Spent</Text>
                            </View>

                            {/* Reward Points */}
                            <View style={tw`flex-1 items-center`}>
                                <Text style={tw`text-[#c48d0a] font-bold text-lg`}>245</Text> 
                                <Text style={tw`text-[#564631] mt-1`}>Reward Points</Text>
                            </View>
                        </View>
                    </View>

                    {/* Profile Options */}
                    <View style={tw`p-4`}>
                        {/* My Orders */}
                        <TouchableOpacity style={tw`bg-white p-4 rounded-lg shadow-md mb-4 flex-row items-center justify-between`}>
                            <View style={tw`flex-row items-center`}>
                                <FontAwesome name="bars" size={20} color="#564631" style={tw`mr-4`} /> 
                                <Text style={tw`text-[#000] font-semibold`}>My Orders</Text>
                            </View>
                            <FontAwesome name="chevron-right" size={16} color="#c48d0a" />
                        </TouchableOpacity>

                        {/* Favorite Meals */}
                        <TouchableOpacity style={tw`bg-white p-4 rounded-lg shadow-md mb-4 flex-row items-center justify-between`}>
                            <View style={tw`flex-row items-center`}>
                                <FontAwesome name="heart" size={20} color="#564631" style={tw`mr-4`} /> 
                                <Text style={tw`text-[#000] font-semibold`}>Favorite Meals</Text>
                            </View>
                            <FontAwesome name="chevron-right" size={16} color="#c48d0a" />
                        </TouchableOpacity>

                        {/* Payment Methods */}
                        <TouchableOpacity style={tw`bg-white p-4 rounded-lg shadow-md mb-4 flex-row items-center justify-between`}>
                            <View style={tw`flex-row items-center`}>
                                <FontAwesome name="credit-card" size={20} color="#564631" style={tw`mr-4`} /> 
                                <Text style={tw`text-[#000] font-semibold`}>Payment Methods</Text>
                            </View>
                            <FontAwesome name="chevron-right" size={16} color="#c48d0a" />
                        </TouchableOpacity>

                        {/* Notifications */}
                        <TouchableOpacity style={tw`bg-white p-4 rounded-lg shadow-md mb-4 flex-row items-center justify-between`}onPress={() => navigation.navigate('Notification')}>
                            <View style={tw`flex-row items-center`}>
                                <FontAwesome name="bell" size={20} color="#564631" style={tw`mr-4`} /> 
                                <Text style={tw`text-[#000] font-semibold`}>Notifications</Text>
                            </View>
                            <FontAwesome name="chevron-right" size={16} color="#c48d0a" />
                        </TouchableOpacity>

                        {/* Order History */}
                        <TouchableOpacity style={tw`bg-white p-4 rounded-lg shadow-md mb-4 flex-row items-center justify-between`}>
                            <View style={tw`flex-row items-center`}>
                                <FontAwesome name="history" size={20} color="#564631" style={tw`mr-4`} />
                                <Text style={tw`text-[#000] font-semibold`}>Order History</Text>
                            </View>
                            <FontAwesome name="chevron-right" size={16} color="#c48d0a" />
                        </TouchableOpacity>

                        {/* Points & Rewards */}
                        <TouchableOpacity style={tw`bg-white p-4 rounded-lg shadow-md mb-4 flex-row items-center justify-between`}>
                            <View style={tw`flex-row items-center`}>
                                <FontAwesome name="gift" size={20} color="#564631" style={tw`mr-4`} />
                                <Text style={tw`text-[#000] font-semibold`}>Points & Rewards</Text>
                            </View>
                            <FontAwesome name="chevron-right" size={16} color="#c48d0a" />
                        </TouchableOpacity>

                        {/* Support */}
                        <TouchableOpacity style={tw`bg-white p-4 rounded-lg shadow-md mb-4 flex-row items-center justify-between`}onPress={() => navigation.navigate('feedback')}>
                            <View style={tw`flex-row items-center`}>
                                <FontAwesome name="info-circle" size={20} color="#564631" style={tw`mr-4`} />
                                <Text style={tw`text-[#000] font-semibold`}>Feedback</Text>
                            </View>
                            <FontAwesome name="chevron-right" size={16} color="#c48d0a" />
                        </TouchableOpacity>

                        {/* Account Settings */}
                        <TouchableOpacity style={tw`bg-white p-4 rounded-lg shadow-md mb-4 flex-row items-center justify-between`}>
                            <View style={tw`flex-row items-center`}>
                                <FontAwesome name="cog" size={20} color="#564631" style={tw`mr-4`} />
                                <Text style={tw`text-[#000] font-semibold`}>Account Settings</Text>
                            </View>
                            <FontAwesome name="chevron-right" size={16} color="#c48d0a" />
                        </TouchableOpacity>

                        {/* Logout */}
                        <TouchableOpacity 
                            style={tw`bg-white p-4 rounded-lg shadow-md flex-row items-center justify-between mb-15`}
                            onPress={() => navigation.navigate('SignOut')} // Add your desired navigation screen here
                        >
                        <View style={tw`flex-row items-center`}>
                            <FontAwesome name="sign-out" size={20} color="#564631" style={tw`mr-4`} />
                            <Text style={tw`text-[#000] font-semibold`}>Signout</Text>
                        </View>
                        <FontAwesome name="chevron-right" size={16} color="#c48d0a" />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>

            {/* Bottom navigation */}
            <View style={tw`absolute bottom-0 left-0 right-0 bg-white shadow-lg p-8 flex-row justify-around`}>
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
                    <FontAwesome name="shopping-cart" size={20} color="#564631" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <FontAwesome name="user" size={20} color="#c48d0a" />
                </TouchableOpacity>
            </View>        
        </View>
    );
}

export default ProfileScreen;
