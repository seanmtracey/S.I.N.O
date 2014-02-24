#ifndef Sino_h
#define Sino_h

#include "Arduino.h"

class Sino
{
  public:
    Sino();
    void start(int baud);
    void dW(int pin, uint8_t value);
    int dR(int pin);
    void aW(int pin, uint8_t value);
    int aR(int pin);
  private:
    int _baud;
};

#endif