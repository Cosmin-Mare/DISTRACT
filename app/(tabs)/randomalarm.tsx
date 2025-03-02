import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import * as Calendar from 'expo-calendar';

const RandomAlarmSetter = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [alarmTime, setAlarmTime] = useState<Date | null>(null);

  const getRandomTime = (start: Date, end: Date) => {
    const randomTimestamp = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(randomTimestamp);
  };

  const setRandomAlarm = async () => {
    if (!startTime || !endTime) {
      Alert.alert('Error', 'Please enter both start and end times.');
      return;
    }

    const startDate = new Date();
    const endDate = new Date();
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    startDate.setHours(startHour, startMinute, 0, 0);
    endDate.setHours(endHour, endMinute, 0, 0);

    if (endDate <= startDate) {
      Alert.alert('Error', 'End time must be after start time.');
      return;
    }

    const randomTime = getRandomTime(startDate, endDate);
    setAlarmTime(randomTime);

    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Error', 'Calendar permissions not granted.');
      return;
    }

    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const defaultCalendar = calendars.find(calendar => calendar.isPrimary) || calendars[0];

    const eventDetails = {
      title: 'Random Alarm',
      startDate: randomTime,
      endDate: new Date(randomTime.getTime() + 5 * 60 * 1000), // 5 minutes duration
      timeZone: 'GMT',
      location: 'Random Location',
      alarms: [
        {
          method: Calendar.AlarmMethod.ALERT,
          relativeOffset: 0, // Alarm at the exact event start time
        },
      ],
    };

    await Calendar.createEventAsync(defaultCalendar.id, eventDetails);

    Alert.alert('Success', `Alarm set for ${randomTime.toLocaleTimeString()}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Start Time (HH:mm):</Text>
      <TextInput
        style={styles.input}
        placeholder="18:00"
        value={startTime}
        onChangeText={setStartTime}
      />

      <Text style={styles.label}>Enter End Time (HH:mm):</Text>
      <TextInput
        style={styles.input}
        placeholder="20:00"
        value={endTime}
        onChangeText={setEndTime}
      />

      <Button title="Set Random Alarm" onPress={setRandomAlarm} />

      {alarmTime && (
        <Text style={styles.alarmText}>
          Alarm set for {alarmTime.toLocaleTimeString()}.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: 'white',
  },
  alarmText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
});

export default RandomAlarmSetter;