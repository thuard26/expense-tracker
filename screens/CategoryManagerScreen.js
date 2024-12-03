import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList } from 'react-native';
import styles from '../styles/styles';

const CategoryManager = ({ categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState('');

  const addCategory = () => {
    if (newCategory && !categories.find(cat => cat.name === newCategory)) {
      setCategories([...categories, { name: newCategory, color }]);
      setNewCategory('');
      setColor(colorOptions[0].value);
    } else {
      alert('Category already exists or invalid');
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