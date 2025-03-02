import { useEffect, useState } from 'react';
import { registerForPushNotificationsAsync } from '@/utils/registerForPushNotificationsAsync';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chatbot from './chatbot';
import RandomAlarmSetter from './randomalarm';
import Video from 'react-native-video';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import { StyleSheet, View, SafeAreaView } from 'react-native';

const Ball = (props: any) => {
  const radius = props.size / 2;
  const x = props.body.position.x - radius;
  const y = props.body.position.y - radius;
  return (
    <View style={[styles.ball, { left: x, top: y, width: props.size, height: props.size }]} />
  );
};

const Paddle = (props: any) => {
  const width = props.size.width;
  const height = props.size.height;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;
  return (
    <View style={[styles.paddle, { left: x, top: y, width, height }]} />
  );
};

export default function Entertainment() {
  const [entities, setEntities] = useState({});

  useEffect(() => {
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;

    const ball = Matter.Bodies.circle(100, 100, 15, { restitution: 1 });
    const paddle = Matter.Bodies.rectangle(200, 600, 100, 20, { isStatic: true });

    Matter.World.add(world, [ball, paddle]);

    setEntities({
      physics: { engine, world },
      ball: { body: ball, size: 30, renderer: Ball },
      paddle: { body: paddle, size: { width: 100, height: 20 }, renderer: Paddle },
    });


    Matter.Engine.run(engine);
  }, []);

  return (
    <SafeAreaView>
        <ThemedView>
            <View>
            <Video
                source={require("../../assets/subway_shit.mp4")}
                style={{width: "100%", height: "100%"}}
                resizeMode="cover"
                paused={false}
            />
            </View>
        </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
},
backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    width: '100%',
    height: '100%',
},
gameEngine: {
    flex: 1,
    backgroundColor: 'transparent',
},
ball: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 15,
},
paddle: {
    position: 'absolute',
    backgroundColor: 'blue',
},
});