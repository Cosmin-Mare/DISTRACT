import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
const styles = StyleSheet.create({
container: { flex: 1, padding: 20, justifyContent: "center" },
    text: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: "#f0f0f0",
    },

    picker: { height: 50, marginBottom: 10 },
});

export default function Translate(){
  const [inputText,setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [fromLang, setFromLang] = useState("English");
  const [toLang, setToLang] = useState("Chinese");
  

  const languages = [
    "English", "Spanish", "Chinese"
  ];


  return (
    <View style={styles.container}>
      {/* <Picker
        selectedValue={fromLang}
        onValueChange={(itemValue) => setFromLang(itemValue)}
        style={styles.picker}
      >
        {languages.map(lang => (
          <Picker.Item key={lang} label={lang} value={lang} />
        ))}
      </Picker> */}

      <TextInput
        style={styles.text}
        placeholder="Enter text"
        keyboardType="numeric"
        value={inputText}
        onChangeText={(text) => {
          setInputText(text);
          setTranslatedText(text);
        }}
      />

      {/* <Picker
        selectedValue={toLang}
        onValueChange={(itemValue) => setToLang(itemValue)}
        style={styles.picker}
      >
        {languages.map(lang => (
          <Picker.Item key={lang} label={lang} value={lang} />
        ))}
      </Picker> */}

      <TextInput
        style={styles.text}
        keyboardType="numeric"
        placeholder="Translation"
        value={translatedText}
        editable={false}
      />
    </View>
  );
};