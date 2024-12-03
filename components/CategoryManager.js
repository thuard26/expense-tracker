import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, FlatList, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../styles/styles';

const colorOptions = [
  { label: 'Red', value: '#FF0000' },
  { label: 'Green', value: '#00FF00' },
  { label: 'Blue', value: '#0000FF' },
  { label: 'Yellow', value: '#FFFF00' },
  { label: 'Purple', value: '#800080' },
  { label: 'Orange', value: '#FFA500' },
];

const CategoryManager = ({ categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState('');
  const [color, setColor] = useState(colorOptions[0].value);

  const addCategory = () => {
    if (newCategory && !categories.find(cat => cat.name === newCategory)) {
      setCategories([...categories, { name: newCategory, color }]);
      setNewCategory('');
      setColor(colorOptions[0].value);
    } else {
      alert('Category already exists or invalid');
    }
  };

  const deleteCategory = (categoryToDelete) => {
    const updatedCategories = categories.filter((category) => category.name !== categoryToDelete.name);
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

      <RNPickerSelect
        onValueChange={value => setColor(value)}
        items={colorOptions}
        value={color}
        placeholder={{ label: "Select a color...", value: null }}
        style={{
          inputIOS: styles.textInput,
          inputAndroid: styles.textInput,
          placeholder: { color: 'gray' },
        }}
      />

      <Button title="Add Category" onPress={addCategory} />

      <FlatList
        data={categories}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 20, height: 20, backgroundColor: item.color, marginRight: 10 }} />
              <Text style={styles.text}>{item.name}</Text>
            </View>
            <Button title="Delete" onPress={() => deleteCategory(item)} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default CategoryManager;
