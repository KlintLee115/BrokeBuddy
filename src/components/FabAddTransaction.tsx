import { FAB } from "react-native-paper";

export default function FabAddTranaction({navigation}) {

    return <FAB
        style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            borderWidth: 2,
            borderColor: "black"
        }}
        icon="plus"
        onPress={() => navigation.navigate('AddTransaction')}
    />
}
