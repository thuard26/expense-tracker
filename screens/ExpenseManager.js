import React from 'react';
import { SafeAreaView, Text, FlatList, TouchableOpacity, Alert, Button } from 'react-native';
import styles from '../styles/styles';

const ExpenseManager = ({ expenses, setExpenses, navigation }) => {
  // Function to handle deleting an expense
  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index); // Remove the expense at the specified index
    setExpenses(updatedExpenses); // Update the expense state
    Alert.alert('Expense deleted successfully!');
  };

  // Function to render each expense item in the FlatList
  const renderExpenseItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.expenseItem}
      onPress={() => deleteExpense(index)} // On press, delete the expense
    >
      <Text style={styles.expenseItemText}>{item.name}</Text>
      <Text style={styles.expenseItemText}>Amount: ${item.amount}</Text>
      <Text style={styles.expenseItemText}>Category: {item.category}</Text>
      <Text style={styles.expenseItemText}>Location: {item.location ? item.location : 'Not available'}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Manage Expenses</Text>
      <Text> Tap to delete an expense</Text>

      {/* Display the list of expenses */}
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.expenseList}
      />

      {/* Button to navigate to Add Expense screen */}
      <Button title="Go to Add Expense" onPress={() => navigation.navigate('AddExpenseScreen')} />
    </SafeAreaView>
  );
};

export default ExpenseManager;
