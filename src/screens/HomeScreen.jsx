import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { TRANSACTION_DATA } from '../../utility';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([])

  useFocusEffect(
    useCallback(() => {
      setTransactions([...TRANSACTION_DATA])
    }, []))

  const renderItem = ({ item }) => {
    const backgroundColors = {
      Essential: '#A3E4D7',
      Leisure: '#F5B7B1',
      default: '#AED6F1'
    }

    const backgroundColor = backgroundColors[item.type] || backgroundColors.default

    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor }]}
        onPress={() => navigation.navigate('Details', { id: item.id })}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text>{item.title}</Text>
          <Text>{item.amount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {transactions.length === 0 ? (
        <Text>No transaction available</Text>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddTransaction')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: "black"
  },
});

export default HomeScreen;