# My First Project

---

My first project is a Home security system. I have used electronics for this project. The electronic components I used are:-

- An Arduino Nano(A microcontroller);
- A Photoresistor(A resistor that limits the flow of electricity according to the amount of light applied)
- A 3 Kilo Ohm resistor(electronic component which limits the flow of electricity in a circuit)
- A 1 Kilo Ohm resistor
- A 2 Kilo Ohm resistor
- Some Wires
- A Laser board(For emitting the laser light)
- A raspberry pi zero(Basically a credit card sized computer that can be used to control electronics)
- A power source (In my case a power bank)
- And a breadboard (To connect all the Things together)

The programming languages and libraries I have used are

- C++: Arduino code
- Python: python-firebase, RPi.GPIO(python library for raspberry pi's )
- JavaScript : Firebase, p5.js, teachable-machine(machine learning)
- HTML : For as usual running the JavaScript code

My project is a Home security system. Basically there will be a laser on one end of the entrance of the house and a photoresistor on the other end of the entrance. The laser should be directly pointed at the photoresistor. When there is a thief or a burglar entering your house at some point, the photoresistor gives the signal to the Arduino. The Arduino processes the signal and sends the signal to the raspberry pi. The raspberry pi sends the signal to the firebase. The camera module will be listening for the signal from firebase. If it detects a signal from the firebase, it takes a photo of the person. If it detects a human in the photo using machine learning, it sends a signal to the firebase. The user device listens for this event and notifies the user.  

## And that is my first project!!
