var database
var laserTrippedRef;
// The video
let video;
// For displaying the label
let label = "";
// The image classifier
let classifier;
let imageCanvas = null;
let storageRef;
let theifDetectedRef;

//Model URL for the trained model to detect human face.
let modelURL = 'https://teachablemachine.withgoogle.com/models/W27DyW26/';

function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
    database = firebase.database();
    //create reference for the firebase child "theifDetected"
    theifDetected = database.ref("/thiefDetected");
    //create reference for the firebase child "laserTripped" which becomes true when the laser gets tripped
    laserTrippedRef = database.ref("/laserTripped");
    //Get the firebase storage reference
    storageRef = firebase.storage().ref();
    //Start listening for change in laserTripped value in firebase database.
    laserTrippedRef.on("value", onDbValueChanged, onDbChangeListenError);
    imageCanvas = createCanvas(640, 520);
    // Create the video
    video = createCapture(VIDEO);
    video.hide();
}

function classifyVideo() {
  classifier.classify(video, onGotResults);
}

function draw() {
  background(0);
  // Draw the video
  image(video, 0, 0);
}

function onGotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  if (label == "Class 1"  ) {
    //"Class 1" indicates that there is a human face.
    console.log("Theif detected");
    //Save the image
    imageCanvas.canvas.toBlob(function(image) {
      const currentDateTime = new Date();
      const stringDateTime = currentDateTime.getFullYear() + "-" + 
          (currentDateTime.getMonth() + 1) + "-" + 
          currentDateTime.getDate() + "_" + 
          currentDateTime.getHours() + ":" + 
          currentDateTime.getMinutes() + ":" + 
          currentDateTime.getSeconds()       
      let filePath = 'images/thief' + stringDateTime + '.jpg';
      let imageRef = storageRef.child(filePath);
      imageRef.put(image).then((img)=>{
        //Update the thiefInfo  chile in the firebase
        database.ref('/').update({
          thiefInfo:{
            thiefDetected : true,
            thiefImagePath : filePath 
          }
        })
        console.log("Uploaded image succesfully!")
      })
      console.log(image);
    });
  } else if (label == "Class 2"){
    console.log("No Theif detected");
  }
}
function onDbValueChanged(data){
  console.log("Info: Received value from firebase. Value = " + data.val());
  if (data.val()){
    classifyVideo();
    database.ref("/").update({
      laserTripped : false
    })
  }
}

function onDbChangeListenError(err){
  console.log(err);
}