import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';

// Connect to Socket.IO server
const socket = io('http://172.20.10.2:5000'); // Replace with your server URL

const FeedbackForm = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for real-time feedback notifications
    socket.on('newFeedback', (data) => {
      Alert.alert('New Feedback!', `Feedback ID: ${data.FeedbackID}, Message: ${data.message}`);
    });

    // Listen for feedback read notifications
    socket.on('feedbackRead', (feedbackId) => {
      Alert.alert('Feedback Read', `Your feedback (ID: ${feedbackId}) was marked as read.`);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('newFeedback');
      socket.off('feedbackRead');
    };
  }, []);

  const handleSendFeedback = () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter your feedback before sending.');
      return;
    }

    // Send feedback to the backend
    fetch('http://172.20.10.2:5000/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Alert.alert('Thank You!', 'Your feedback has been submitted successfully.');
          setMessage(''); // Clear the input field
        } else {
          Alert.alert('Error', 'Failed to submit feedback.');
        }
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to submit feedback. Please try again.');
      });
  };

  return (
    <SafeAreaView style={tw`bg-[#f0f8ff] flex-1`}>
      <View style={tw`flex-row justify-between items-center mb-4 p-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={20} color="#564631" />
        </TouchableOpacity>
        <Text style={tw`text-2xl font-bold text-[#564631]`}>Feedback</Text>
        <View /> 
      </View>

      <View style={tw`p-4 flex-1`}>
        <TextInput
          style={tw`bg-white rounded-lg p-4 mb-4 shadow-md text-base`}
          multiline
          placeholder="Enter your feedback..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          style={tw`bg-[#c48d0a] rounded-lg p-4 shadow-md items-center`}
          onPress={handleSendFeedback}
        >
          <Text style={tw`text-white text-lg font-bold`}>Send Feedback</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FeedbackForm;
