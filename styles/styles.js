import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  categoryList: {
    maxHeight: 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  categoryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  categoryItemText: {
    fontSize: 16,
  },
  instructionText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  expenseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  expenseItemText: {
    fontSize: 16,
  },
  expenseList: {
    marginBottom: 20,
  },
});

export default styles;
