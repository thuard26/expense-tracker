import React from 'react';
import { TextInput, View, Button, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';  // Ensure RNPickerSelect is imported
import styles from '../styles/styles';  // Your styles

const AddExpense = ({ name, setName, amount, setAmount, category, setCategory, categories, addExpense }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Expense</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Expense Name</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Enter expense name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.textInput}
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
        <RNPickerSelect
          onValueChange={setCategory}
          items={categories.map(category => ({ label: category, value: category }))}
          value={category}
          placeholder={{ label: "Select a category...", value: null }}
          style={{
            inputIOS: styles.textInput,
            inputAndroid: styles.textInput,
            placeholder: { color: 'gray' },
          }}
        />
      </View>

      <Button title="Add Expense" onPress={addExpense} />
    </View>
  );
};

export default AddExpense;