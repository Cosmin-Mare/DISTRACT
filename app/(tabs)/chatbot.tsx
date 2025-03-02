import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await fetch(`https://distract-express-production.up.railway.app/chat?message=${encodeURIComponent(input)}`);
      const data = await response.json();

      const botMessage = { text: data.response || "No response", sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setMessages((prevMessages) => [...prevMessages, { text: "Error: Unable to fetch response.", sender: "bot" }]);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <ScrollView style={styles.chatContainer}>
          {messages.map((msg, index) => (
            <View key={index} style={[styles.message, msg.sender === "user" ? styles.userMessage : styles.botMessage]}>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
          />
          <TouchableOpacity style={styles.button} onPress={sendMessage}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
  },
  messageText: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
