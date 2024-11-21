// FavoriteButton.js
import React, { useState } from 'react';
import axios from 'axios';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const FavoriteButton = ({ CustomerID, MenuItemID }) => {
  const [iconStatus, setIconStatus] = useState(false); // False = outlined, True = filled

  const toggleFavorite = () => {
    const status = iconStatus ? false : true;

    // Call API to add/remove item from favorites
    axios.post('http://localhost:5000/api/favorites/add', {
      CustomerID,
      MenuItemID,
      IconStatus: status
    })
    .then(response => {
      setIconStatus(status);
    })
    .catch(error => {
      console.log('Error adding to favorites:', error);
    });
  };

  return (
    <TouchableOpacity onPress={toggleFavorite}>
      <Text style={iconStatus ? styles.filledHeart : styles.outlinedHeart}>
        ♥
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outlinedHeart: {
    fontSize: 30,
    color: 'gray',
  },
  filledHeart: {
    fontSize: 30,
    color: 'red',
  }
});

export default FavoriteButton;
