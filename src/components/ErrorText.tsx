import { Text } from 'react-native';

export default function ErrorText({ text }) {
    return <Text style={{ color: "red", marginBottom: 10 }}>{text}</Text>
}