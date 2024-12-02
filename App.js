import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddExpenseScreen from './screens/AddExpenseScreen';
import CategoryManager from './components/CategoryManager';
import HomeScreen from './screens/HomeScreen';
import TotalExpensesScreen from './screens/TotalExpensesScreen';
import ExpenseManager from './screens/ExpenseManager';
import { SafeAreaView, Text, Button } from 'react-native';
import styles from './styles/styles';

const Stack = createStackNavigator();

export default function App() {
  const [categories, setCategories] = useState(['Food', 'Clothes', 'Bills', 'Others']);
  const [expenses, setExpenses] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} categories={categories} />}
        </Stack.Screen>
        <Stack.Screen name="AddExpenseScreen">
          {(props) => <AddExpenseScreen {...props} categories={categories} setCategories={setCategories} expenses={expenses} setExpenses={setExpenses} />}
        </Stack.Screen>
        <Stack.Screen name="CategoryManager">
          {(props) => <CategoryManager {...props} categories={categories} setCategories={setCategories} />}
        </Stack.Screen>
        <Stack.Screen name="ExpenseManager">
          {(props) => <ExpenseManager {...props} expenses={expenses} setExpenses={setExpenses} />}
        </Stack.Screen>
        <Stack.Screen name="TotalExpensesScreen">
          {(props) => <TotalExpensesScreen {...props} expenses={expenses} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
