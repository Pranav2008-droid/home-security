import RPi.GPIO as GPIO
import time
from firebase import firebase

firebase = firebase.FirebaseApplication("https://rpi-node-js-security-system.firebaseio.com/", None);
data = {
    "theif" : "true"
}

result = 0
print(result)
GPIO.setmode(GPIO.BCM)

GPIO.setup(10, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

def alertTheif():
        print("theif detected")
        result = firebase.put("/", "laserTripped", 'true')
        time.sleep(15)
def noTheifDetected():
        print("thief is not detected")
while True:
        inp = GPIO.input(10)
        if (inp == 1):
                alertTheif()
        else:
                noTheifDetected();
