int inpValue = 0;
int pResistor = A0;
int raspberry = 2;
// the setup function runs once when you press reset or power the board7
void setup() {
  Serial.begin(9600);
  pinMode(pResistor, INPUT);
  pinMode(raspberry, INPUT);
  digitalWrite(raspberry, LOW);
}
void loop() {
  inpValue = analogRead(pResistor);
  if (inpValue < 900){
    digitalWrite(raspberry, HIGH);
  }else{
    digitalWrite(raspberry, LOW);
  }
  Serial.println(inpValue);
}
