import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TypingText from "react-native-typical";

export default function App() {
    return (
        <View style={styles.container}>
            <TypingText
                steps={["Code Insiders", 1000 ]}
                loop={Infinity}
                style={[styles.text]}
            />
            <TypingText
                steps={[
                    "This will run some time only",
                    1000,
                    "This will run 5 times only",
                    1000,
                ]}
                loop={5}
                blinkCursor={true}
                editDelay={80}
                deleteDelay={10}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 14,
    },
});