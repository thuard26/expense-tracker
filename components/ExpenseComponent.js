// ExpenseComponent.js

import React from "react";
import { Alert, Button, Text, View, ScrollView } from "react-native";
import styles from "../styles/styles";

const ExpenseComponent = ({ expenses, setExpenses, chartData, setChartData }) => {
  const handleDeleteExpense = (expense) => {
    Alert.alert("Delete", `Are you sure you want to delete "${expense.name}"?`, [
      {
        text: "Yes",
        onPress: () => {
          const updatedExpenses = expenses.filter((item) => item.id !== expense.id);
          setExpenses(updatedExpenses);

          const updatedChartData = chartData.map((item) =>
            item.name === expense.category
              ? { ...item, amount: item.amount - expense.amount }
              : item
          );
          setChartData(updatedChartData);
        },
      },
      { text: "No" },
    ]);
  };

  return (
    <ScrollView>
      {expenses.map((expense) => (
        <View key={expense.id} style={styles.expenseTile}>
          <Text>{expense.name}</Text>
          <Text>{expense.category}</Text>
          <Text>${expense.amount}</Text>
          <Button title="Delete" onPress={() => handleDeleteExpense(expense)} />
        </View>
      ))}
    </ScrollView>
  );
};

export default ExpenseComponent;
