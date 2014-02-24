#include "Arduino.h"
#include "sino.h"

Sino::Sino()
{
  // Serial.begin(baud);
}

void Sino::start(int baud){
  Serial.begin(baud);
}

void Sino::dW(int pin, uint8_t value)
{
  digitalWrite(pin, value);
  Serial.println("dW," + String(pin) + "," + String(value));  
  
}

int Sino::dR(int pin)
{
  int val = digitalRead(pin);
  Serial.println("dR," + String(pin) + "," + String(val));
  return val;
}

void Sino::aW(int pin, uint8_t value)
{ 

  analogWrite(pin, value);
  Serial.println("aW," + String(pin) + "," + String(value));
  
}

int Sino::aR(int pin)
{
  int val = analogRead(pin);
  Serial.println("aR," + String(pin) + "," + String(val));  
  return val;
}