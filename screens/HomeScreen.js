// screens/HomePage.js

import React from 'react';
import { SafeAreaView, Text, Button, View } from 'react-native';
import styles from '../styles/styles';

const HomeScreen = ({ navigation, categories }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome to the Expense Tracker</Text>
        
        <Button
          title="Add Expense"
          onPress={() => navigation.navigate('AddExpenseScreen')}
        />
        
        <Button
          title="Manage Categories"
          onPress={() => navigation.navigate('CategoryManager')}
        />
        <Button
          title="Total Expenses"
          onPress={() => navigation.navigate('TotalExpensesScreen')}
        />
        <Button
          title="Manage Expenses"
          onPress={() => navigation.navigate('ExpenseManager')}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
