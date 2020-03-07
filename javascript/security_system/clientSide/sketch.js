var database;
var thiefDetected;
var storageRef;
var imageRef = null;

function setup(){
    database = firebase.database();
    //create reference for the firebase object thiefInfo
    thiefDetected = database.ref("/thiefInfo");
    //Get the firebase storage reference
    storageRef = firebase.storage().ref();
    //Start listening for change in laserTripped value in firebase database.
    thiefDetected.on("value", onDbValueChanged, onDbChangeListenError);
    noCanvas();
}
function draw(){
    if (imageRef != null){
        image(imageRef, 0, 0);
    }
    // background(51);
}
function onDbValueChanged(data){
    const thiefInfo = data.val();
    console.log("Info: Thiefinfo received value from firebase. Value is ");
    console.log(thiefInfo);
    if (thiefInfo != null && thiefInfo.thiefDetected){
        //Clear the thiefDetected value in the firebase
        database.ref('/').update({
          thiefInfo:{
            thiefDetected : false,
            thiefImagePath : "" 
          }
        })
        //storageRef.child(thiefInfo.thiefImagePath).getDownloadURL().then(function(url){
        storageRef.child(thiefInfo.thiefImagePath).getDownloadURL().then(function(url){
            console.log(url);
            imageRef = createImg(url);
            createP("<h1>Image of the thief</h1>")
            if (pushNotificationEnabled) {
                var text = 'HEY! You have a thief in your house';
                var message = {
                    body : text,
                    icon : url
                }
                var notification = new Notification('Thief Alert', message);
            }
        })
    }
}
function onDbChangeListenError(err){
  console.log(err);
}