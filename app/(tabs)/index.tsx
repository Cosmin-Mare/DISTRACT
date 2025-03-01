import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { registerForPushNotificationsAsync } from '@/utils/registerForPushNotificationsAsync';

export default function HomeScreen() {
  const [notificationToken, setNotificationToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setNotificationToken(await registerForPushNotificationsAsync())
    })()
  }, []);
  return (
    <ThemedView>
      <SafeAreaView>
        <View>
          <Text style={{color: "white"}}>{notificationToken}</Text>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
