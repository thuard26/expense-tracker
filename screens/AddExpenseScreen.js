import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, Button, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location'; // Importing Expo Location API
import styles from '../styles/styles';

const AddExpenseScreen = ({ navigation, expenses, setExpenses, categories }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]); // Default to the first category
  const [location, setLocation] = useState(null); // Store the location data
  const [locationPermission, setLocationPermission] = useState(false); // Flag for location permission

  // Request location permission and fetch location
  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationPermission(true);
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords); // Store the current location coordinates
      } else {
        Alert.alert("Permission Denied", "We need your permission to access location.");
      }
    };

    getLocationPermission();
  }, []);

  // Handle adding expense with location
  const addExpense = () => {
    if (name && amount && category) {
      const newExpense = {
        name,
        amount: parseFloat(amount),
        category,
        location: location ? `${location.latitude}, ${location.longitude}` : null, // Store location data
      };

      setExpenses([...expenses, newExpense]);
      setName('');
      setAmount('');
      setCategory(categories[0]); // Reset the category to the first one
      Alert.alert('Expense added successfully!');
    } else {
      Alert.alert('Please fill in all fields');
    }
  };

  // Render each category item in the FlatList
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => setCategory(item)} // Update the selected category
    >
      <Text style={styles.categoryItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Add Expense</Text>

      {/* Expense name input */}
      <TextInput
        style={styles.textInput}
        placeholder="Enter expense name"
        value={name}
        onChangeText={setName}
      />

      {/* Amount input */}
      <TextInput
        style={styles.textInput}
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      {/* Category selection with FlatList */}
      <Text style={styles.label}>Select Category</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        extraData={category} // Re-render if the category changes
        style={styles.categoryList}
      />

      {/* Location */}
      <Text style={styles.label}>Location:</Text>
      {location ? (
        <Text style={styles.textInput}>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      ) : (
        <Text style={styles.textInput}>Fetching location...</Text>
      )}

      {/* Add expense button */}
      <Button title="Add Expense" onPress={addExpense} />
      <Button title="Go to Total Expenses" onPress={() => navigation.navigate('TotalExpensesScreen')} />
    </SafeAreaView>
  );
};

export default AddExpenseScreen;
