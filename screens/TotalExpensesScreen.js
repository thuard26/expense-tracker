import React from 'react';
import { SafeAreaView, Text, FlatList, View, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import styles from '../styles/styles';

const TotalExpensesScreen = ({ expenses = [], categories = [] }) => {
  if (!Array.isArray(expenses)) {
    expenses = [];
  }

  // Group expenses by category
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const category = expense.category || 'Others';
    if (!acc[category]) {
      const categoryData = categories.find(cat => cat.name === category);
      acc[category] = { amount: 0, color: categoryData ? categoryData.color : '#7f7f7f' };
    }
    acc[category].amount += parseFloat(expense.amount);
    return acc;
  }, {});

  // Log groupedExpenses to check color assignment
  console.log("Grouped Expenses:", groupedExpenses);

  // Create chart data
  const chartData = Object.keys(groupedExpenses).map((category) => ({
    name: category,
    amount: groupedExpenses[category].amount,
    color: groupedExpenses[category].color,
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  // Log chartData to ensure colors are correct
  console.log("Chart Data:", chartData);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Total Expenses by Category</Text>

      <PieChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#1E2923',
          backgroundGradientFrom: '#1E2923',
          backgroundGradientTo: '#08130D',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <FlatList
        data={Object.keys(groupedExpenses)}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseItemText}>
              {item}: ${groupedExpenses[item].amount.toFixed(2)}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => `${item}-${index}`}
      />
    </SafeAreaView>
  );
};

export default TotalExpensesScreen;
