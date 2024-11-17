import React, { useCallback, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TRANSACTION_DATA } from '../../utility';
import { useFocusEffect } from '@react-navigation/native';

const DetailsScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [transaction, setTransaction] = useState()

    useFocusEffect(
        useCallback(() => {
            setTransaction(TRANSACTION_DATA.find(t => t.id === id))
        }, []))

    return (
        <View style={styles.container}>
            {
                !transaction ? <Text>Transaction not found</Text> :
                    <View>
                        <Text>Title: {transaction.title}</Text>
                        <Text>Description: {transaction.description}</Text>
                        <Text>Amount: {transaction.amount}</Text>
                        <Text style={{marginBottom:20}}>Type: {transaction.type}</Text>
                        <Button title="Edit" onPress={() => navigation.navigate('AddTransaction', { id })} />
                    </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default DetailsScreen;