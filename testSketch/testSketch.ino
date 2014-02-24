#include <sino.h>

int ledPin = 5;
int brightness = 1;

Sino sino;

void setup(){
  
  pinMode(ledPin, OUTPUT);
  
  sino.start(28800);
  
}

void loop(){
  
   sino.aW(5, 10);
   delay(500);
   sino.aW(5, 0);
   delay(500);
   sino.dW(6, HIGH);
   delay(500);
   sino.dW(6, LOW);
   delay(500);
//   sino.aR(5);
//   delay(500);
}

/*void loop(){
  
   analogWrite(5, 255);
//   delay(1000);
   analogWrite(5, 0);
//   delay(1000);
   digitalWrite(6, HIGH);
//   delay(1000);
   digitalWrite(6, LOW);
//   delay(1000);
   digitalWrite(8, HIGH);
   digitalWrite(8, LOW);
   
   digitalWrite(9, HIGH);
   digitalWrite(9, LOW);
  
   digitalWrite(10, HIGH);
   digitalWrite(10, LOW);
   
}*/
