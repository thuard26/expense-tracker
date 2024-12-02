// CategoryPicker.js

import React from "react";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/styles";

const CategoryPicker = ({ category, setCategory, categories }) => {
  return (
    <Picker
      selectedValue={category}
      onValueChange={(itemValue) => setCategory(itemValue)}
      style={styles.textInput}
    >
      {categories.map((cat, index) => (
        <Picker.Item key={index} label={cat} value={cat} />
      ))}
    </Picker>
  );
};

export default CategoryPicker;
