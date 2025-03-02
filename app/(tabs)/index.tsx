import { Image, StyleSheet, Platform, View, Text, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { registerForPushNotificationsAsync } from '@/utils/registerForPushNotificationsAsync';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chatbot from './chatbot';
import RandomAlarmSetter from './randomalarm';
import Entertainment from './entertainment';
import { Video } from 'react-native-video';

export default function HomeScreen() {
  const [notificationToken, setNotificationToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [showChatbot, setShowChatbot] = useState<boolean>(true);
  const [showRandomAlarm, setShowRandomAlarm] = useState<boolean>(false);
  const [showentertainment, setShowentertainment] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setNotificationToken(await registerForPushNotificationsAsync())
    })()
  }, []);

  const saveUsername = async () => {
    if (username && notificationToken) {
      try {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('notificationToken', notificationToken);

        const response = await fetch('https://distract-express-production.up.railway.app/save-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, token: notificationToken }),
        });

        if (!response.ok) {
          throw new Error('Failed to save token');
        }

        alert('Username and token saved successfully');
      } catch (error) {
        console.error(error);
        alert('Failed to save username and token');
      }
    } else {
      alert('Username or token is missing');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        title={`Switch to Chatbot`}
        onPress={() => {setShowChatbot(true)}}
      />
      <Button
        title={`Toggle Random Alarm`}
        onPress={() => {setShowRandomAlarm(true); setShowChatbot(false)}}
      />
      <Button
        title={`Toggle Enterntainment`}
        onPress={() => {setShowentertainment(true); setShowChatbot(false); setShowRandomAlarm(false)}}
      />
      {showChatbot ? (
        <Chatbot />
      ) : showRandomAlarm ? <RandomAlarmSetter /> : 
      showentertainment ? <Entertainment /> :
      ( 
        <ThemedView>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              value={username}
              onChangeText={setUsername}
            />
            <Button title="Save Username" onPress={saveUsername} />
            <Text style={{ color: "white" }}>{notificationToken}</Text>
          </View>
        </ThemedView>
      )}
      
    </SafeAreaView>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: 'white',
  },
});