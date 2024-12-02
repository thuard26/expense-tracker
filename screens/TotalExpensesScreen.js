// screens/TotalExpensesScreen.js

import React from 'react';
import { SafeAreaView, Text, FlatList, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import styles from '../styles/styles';

const TotalExpensesScreen = ({ expenses = [] }) => {
  // Ensure expenses is always an array
  if (!Array.isArray(expenses)) {
    expenses = [];
  }

  // Grouping expenses by category
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const category = expense.category || 'Others';
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += parseFloat(expense.amount);
    return acc;
  }, {});

  // Function to get the color based on category
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Food':
        return '#e62d20';
      case 'Clothes':
        return '#27e620';
      case 'Bills':
        return '#1c6bd9';
      case 'Others':
        return '#5adbac';
      default:
        return '#7f7f7f'; // Default color
    }
  };

  // Create chart data
  const chartData = Object.keys(groupedExpenses).map((category) => ({
    name: category,
    amount: groupedExpenses[category],
    color: getCategoryColor(category),  // Access color function here
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Total Expenses by Category</Text>

      {/* Display Pie Chart */}
      <PieChart
        data={chartData}
        width={300}
        height={200}
        chartConfig={{
          backgroundGradientFrom: "#1E2923",
          backgroundGradientTo: "#08130D",
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      {/* List expenses by category */}
      <FlatList
        data={Object.keys(groupedExpenses)}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseItemText}>
              {item}: ${groupedExpenses[item].toFixed(2)}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default TotalExpensesScreen;
