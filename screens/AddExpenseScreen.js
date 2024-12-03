import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, Button, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import styles from '../styles/styles';

const AddExpenseScreen = ({ navigation, expenses, setExpenses, categories }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || '');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
      } else {
        Alert.alert("Permission Denied", "We need your permission to access location.");
      }
    };

    getLocationPermission();
  }, []);

  const addExpense = () => {
    if (name && amount && category) {
      const newExpense = {
        name,
        amount: parseFloat(amount),
        category,  // Store only the category name
        location: location ? `${location.latitude}, ${location.longitude}` : null,
      };
  
      setExpenses([...expenses, newExpense]);
      setName('');
      setAmount('');
      setCategory(categories[0]?.name || '');
      Alert.alert('Expense added successfully!');
    } else {
      Alert.alert('Please fill in all fields');
    }
  };
  

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => setCategory(item.name)}>
      <Text style={styles.categoryItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Add Expense</Text>

      <TextInput style={styles.textInput} placeholder="Enter expense name" value={name} onChangeText={setName} />
      <TextInput style={styles.textInput} placeholder="Enter amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <Text style={styles.label}>Select Category</Text>
      <FlatList data={categories} renderItem={renderCategoryItem} keyExtractor={(item, index) => `${item.name}-${index}`} extraData={category} style={styles.categoryList} />
      <Text style={styles.label}>Location:</Text>
      {location ? <Text style={styles.textInput}>Latitude: {location.latitude}, Longitude: {location.longitude}</Text> : <Text style={styles.textInput}>Fetching location...</Text>}
      <Button title="Add Expense" onPress={addExpense} />
      <Button title="Go to Total Expenses" onPress={() => navigation.navigate('TotalExpensesScreen')} />
    </SafeAreaView>
  );
};

export default AddExpenseScreen;
