import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const NotificationItem = ({ title, description, date, isRead }) => (
    <View style={tw`bg-white rounded-lg shadow-md p-4 mb-4`}>
        <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-lg font-semibold ${isRead ? 'text-gray-500' : 'text-black'}`}>
                {title}
            </Text>
            <FontAwesome 
                name="circle" 
                size={12} 
                color={isRead ? '#d3d3d3' : '#c48d0a'} 
                style={tw`ml-2`}
            />
        </View>
        <Text style={tw`text-sm text-gray-500`} numberOfLines={2}>
            {description}
        </Text>
        <Text style={tw`text-xs text-gray-400 mt-1`}>{date}</Text>
    </View>
);

const NotificationScreen = () => {
    const navigation = useNavigation();

    const notifications = [
        {
            title: 'Order Confirmation',
            description: 'Your order for Chips & Chicken has been confirmed.',
            date: 'Oct 31, 2024',
            isRead: false,
        },
        {
            title: 'Special Offer',
            description: 'Get 10% off on your next order! Limited time offer.',
            date: 'Oct 30, 2024',
            isRead: true,
        },
        {
            title: 'Menu Update',
            description: 'New items have been added to the menu. Check them out!',
            date: 'Oct 29, 2024',
            isRead: true,
        },
        // Add more notifications as needed
    ];

    return (
        <SafeAreaView style={tw`bg-[#fff] flex-1`}>
            <View style={tw`flex-row justify-between items-center mb-4 p-4`}>
                <Text style={tw`text-2xl font-bold text-[#564631]`}>Notifications</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="arrow-left" size={20} color="#564631" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`p-4`}>
                {notifications.map((notification, index) => (
                    <NotificationItem
                        key={index}
                        title={notification.title}
                        description={notification.description}
                        date={notification.date}
                        isRead={notification.isRead}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default NotificationScreen;
