import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { TRANSACTION_DATA, addEditTransaction, getNewID } from '../../utility';
import ErrorText from '../components/ErrorText';

const AddTransactionScreen = ({ route, navigation }) => {
  const { id } = route.params || {}

  const isEditMode = !!id;

  const transaction = isEditMode ? TRANSACTION_DATA.find(t => t.id === id) : {};

  const [title, setTitle] = useState(transaction.title || '')
  const [description, setDescription] = useState(transaction.description || '')
  const [amount, setAmount] = useState(transaction.amount || '')
  const [type, setType] = useState(transaction.type || 'Essential')
  const [error, setError] = useState('');

  const handleSubmit = () => {

    if (!title || !description || !amount || !type) {
      setError('All fields are required.');
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      setError('Amount must be a positive number.');
      return;
    }

    if (isEditMode) {
      addEditTransaction({ id, title, description, amount, type })
    } else {
      addEditTransaction({ id: getNewID(), title, description, amount, type })
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />
      <Text>Description</Text>
      <TextInput value={description} onChangeText={setDescription} style={styles.input} />
      <Text>Amount</Text>
      <TextInput value={amount} onChangeText={setAmount} style={styles.input} keyboardType="numeric" />
      <Text>Type</Text>
      <TextInput value={type} onChangeText={setType} style={styles.input} />

      {error ? <ErrorText text={error}/> : null}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default AddTransactionScreen;