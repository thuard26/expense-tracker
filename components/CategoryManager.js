// components/CategoryManager.js

import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, FlatList, View } from 'react-native';
import styles from '../styles/styles';

const CategoryManager = ({ categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState('');

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    } else {
      alert('Category already exists or invalid');
    }
  };

  const deleteCategory = (categoryToDelete) => {
    const updatedCategories = categories.filter((category) => category !== categoryToDelete);
    setCategories(updatedCategories);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Manage Categories</Text>
      
      <TextInput
        style={styles.textInput}
        value={newCategory}
        onChangeText={setNewCategory}
        placeholder="Enter new category"
      />
      
      <Button title="Add Category" onPress={addCategory} />
      
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.text}>{item}</Text>
            <Button title="Delete" onPress={() => deleteCategory(item)} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default CategoryManager;
