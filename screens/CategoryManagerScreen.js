import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList } from 'react-native';
import styles from '../styles/styles';

const CategoryManager = ({ categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState('');

  const addCategory = () => {
    if (newCategory.trim() !== '' && !categories.includes(newCategory.trim())) {
      setCategories(prevCategories => [...prevCategories, newCategory.trim()]);
      setNewCategory('');
    } else {
      alert('Please enter a valid category name or the category already exists.');
    }
  };

  const removeCategory = (categoryToRemove) => {
    setCategories(prevCategories => prevCategories.filter(category => category !== categoryToRemove));
  };

  return (
    <View style={styles.container}>
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
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.text}>{item}</Text>
            <Button title="Remove" onPress={() => removeCategory(item)} />
          </View>
        )}
        keyExtractor={item => item}
      />
    </View>
  );
};

export default CategoryManager;
