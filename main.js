console.log("ml5 version: " + ml5.version);

var camera = document.getElementById("camera");

Webcam.set({
    width: 400,
    height: 350,
    image_format: 'jpeg',
    jpeg_quality: 90
})

Webcam.attach(camera);

function takePic() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="image" src="' + data_uri + '" style="width: 400px; height: 350px">';
    });
}

function model_loaded() {
    console.log("Model is loaded.")
}

var classifier = ml5.imageClassifier(
    'https://teachablemachine.withgoogle.com/models/BlR8l4bkB/model.json',
    model_loaded);

function identify(){
    img = document.getElementById("image");
    classifier.classify(img, gotResult);  
}

function gotResult(error, results){
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("object").innerHTML = results[0].label;
        document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(2);
    }
}
