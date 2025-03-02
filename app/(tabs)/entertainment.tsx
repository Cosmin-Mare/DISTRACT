import { useEffect, useState } from 'react';
import { registerForPushNotificationsAsync } from '@/utils/registerForPushNotificationsAsync';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import Video, { PosterResizeModeType } from 'react-native-video';

export default function Entertainment() {

  const gameHTML = `
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { margin: 0; background: rgba(0,0,0,.8); text-align: center; overflow: hidden; }
      canvas { display: block; margin: auto; }
    </style>
  </head>
  <body>
    <canvas id="gameCanvas"></canvas>
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let ballX = canvas.width / 2, ballY = canvas.height - 30;
        let ballSpeedX = 2, ballSpeedY = -2;
        let ballRadius = 5;
        let paddleWidth = 80, paddleHeight = 10;
        let paddleX = (canvas.width - paddleWidth) / 2;
        let isDragging = false;

        canvas.addEventListener("touchstart", (e) => {
          const touchX = e.touches[0].clientX;
          if (touchX > paddleX && touchX < paddleX + paddleWidth) {
            isDragging = true;
          }
        });

        canvas.addEventListener("touchmove", (e) => {
          if (isDragging) {
            const touchX = e.touches[0].clientX;
            paddleX = touchX - paddleWidth / 2;
            if (paddleX < 0) paddleX = 0;
            if (paddleX > canvas.width - paddleWidth) paddleX = canvas.width - paddleWidth;
          }
        });

        canvas.addEventListener("touchend", () => {
          isDragging = false;
        });

        function drawBall() {
          ctx.beginPath();
          ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
          ctx.fillStyle = "white";
          ctx.fill();
          ctx.closePath();
        }

        function drawPaddle() {
          ctx.fillStyle = "white";
          ctx.fillRect(paddleX, canvas.height - paddleHeight - 1, paddleWidth, paddleHeight);
        }

        function draw() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawBall();
          drawPaddle();

          ballX += ballSpeedX;
          ballY += ballSpeedY;

          if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) ballSpeedX = -ballSpeedX;
          if (ballY - ballRadius < 0) ballSpeedY = -ballSpeedY;

          if (ballY + ballRadius > canvas.height - paddleHeight - 20 &&
              ballX > paddleX && ballX < paddleX + paddleWidth) {
              ballSpeedY = -ballSpeedY;
          } else if (ballY + ballRadius > canvas.height) {
              ballX = canvas.width / 2;
              ballY = canvas.height - 50;
              ballSpeedX = 2;
              ballSpeedY = -2;
              if (ballRadius > 30) {
                console.log("You win!");
                ballRadius = 5;
              }
              ballRadius += 1;
          }

          requestAnimationFrame(draw);
        }

        draw();
      });
    </script>
  </body>
  </html>
`;


  return (
    <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, flexGrow: 2}}>
            <Video
                source={require("../../assets/subway_shit.mp4")}
                style={{ position: "absolute", width: "100%", height: "100%", zIndex: 1, opacity: 1}}
                resizeMode="contain"
                paused={false}
                pointerEvents="none"
            />
            </View>
            <WebView source={{ html: gameHTML }} style={{position: "absolute", width: "100%", height: "100%", zIndex: 2, flexGrow: 0.5}} />
            
    </SafeAreaView>
  );
}