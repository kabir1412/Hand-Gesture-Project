Webcam.set({
width: 350,
height: 300,
image_format:"png",
png_quality: 120     
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot(){
Webcam.snap(function (data_uri){
document.getElementById("result").innerHTML = '<img src="'+data_uri+'" id="result_img"/>';   
});    
}

console.log("ml5 version:", ml5.version);
classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/FqYFBanyw/model.json", modelLoaded);
 
function modelLoaded(){
console.log("Model Loaded");    
}

function speak(){
var synth= window.speechSynthesis;
speak_data = toSpeak;
var utterThis = new SpeechSynthesisUtterance(speak_data);    
synth.speak(utterThis);
}

function identify_emoji(){
img = document.getElementById("result_img");
classifier.classify(img, gotResults);
}

function gotResults(error, results){
if (error){
console.log(error);    
}   
else{
console.log(results);   

document.getElementById("gesture1").innerHTML = results[0].label;
gesture_1 = results[0].label;
toSpeak = "";

if(gesture_1 == "victory"){
toSpeak = "Victory.";
document.getElementById("emoji1").innerHTML = "&#9996;" + "- symbolises victory";    
}
if(gesture_1 == "thumbs up"){
toSpeak= "All the best.";
document.getElementById("emoji1").innerHTML = "&#128077;";    
}
if(gesture_1 == "Alien symbol"){
toSpeak = "Alien.";
document.getElementById("emoji1").innerHTML = "&#128406;";
}
speak();
}


}