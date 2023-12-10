// https://teachablemachine.withgoogle.com/models/ljJI0fFW2/model.json //
// https://teachablemachine.withgoogle.com/models/eGglfq-J4/model.json //
var prediction1="";
var prediction2="";
Webcam.set({
    width: 350,
    height: 300,
    image_format:"png",
    png_quality: 90
});

Webcam.attach("#camera");

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='taken_image' src='"+data_uri+"'>";
    });
}

console.log(ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ljJI0fFW2/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model has been loaded");
}

function speak(){
    var synth= window.speechSynthesis;
    speakData1= prediction1;
    speakData2=prediction2;
    var utterThis= new SpeechSynthesisUtterance(speakData1+speakData2);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("taken_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion").innerHTML= results[0].label;
        document.getElementById("result_emotion2").innerHTML= results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(prediction1=="Victory"){
            document.getElementById("update_emoji").innerHTML="&#9996";
        }

        if(prediction1=="Amazing"){
            document.getElementById("update_emoji").innerHTML="&#128076";
        }

        if(prediction1=="All the best"){
            document.getElementById("update_emoji").innerHTML="&#128077";
        }

        if(prediction2=="Victory"){
            document.getElementById("update_emoji2").innerHTML="&#9996";
        }
        
        if(prediction2=="Amazing"){
            document.getElementById("update_emoji2").innerHTML="&#128076";
        }

        if(prediction2=="All the best"){
            document.getElementById("update_emoji2").innerHTML="&#128077";
        }
    }
}