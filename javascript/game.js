 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDFyozR7YVSdtsIb1vhNHFi4dSTNb7d0aw",
    authDomain: "fir-database1-e5781.firebaseapp.com",
    databaseURL: "https://fir-database1-e5781.firebaseio.com",
    projectId: "fir-database1-e5781",
    storageBucket: "fir-database1-e5781.appspot.com",
    messagingSenderId: "8374316214"
  };
  firebase.initializeApp(config);

//   firebase database ref to new variable traindata
var trainData = firebase.database().ref();


// onclick function
$("#TrainBtn").on("click", function(){
event.preventDefault();  // stops refreshing the page
// Grabs user inputs
var trainName = $("#tNameInput").val().trim();
var destination = $("#tdestinationInput").val().trim();
var firstTrainUnix = moment($("#FTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
var frequency = $("#freqInput").val().trim();

// Creates local "temporary" object for holding train data
var newTrain = {
    name:  trainName,
    destination: destination,
    firstTrain: firstTrainUnix,
    frequency: frequency
}

// push data to the database
trainData.push(newTrain);


// Alert
alert(newTrain.name + " DONE");

// Clears all of the text-boxes
$("#tNameInput").val("");
$("#tdestinationInput").val("");
$("#FTrainInput").val("");
$("#freqInput").val("");

return false;
});


// Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot, prevChildKey){

// Store everything into a variable.
var data = childSnapshot.val();
var tName = data.name;
var tDestination = data.destination;
var tFrequency = data.frequency;
var tFirstTrain = data.firstTrain;
// To calculate the minutes till left to arrival and storing in a variable
var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
var tMinutes = tFrequency - tRemainder;

// To calculate the arrival time, add the tMinutes to the currrent time
var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 


// console.log(nextTrain);
// Add each train's data into the table 
$("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td id='min'>" + tFrequency + "</td><td id='min'>" + tArrival + "</td><td id='min'>" + tMinutes + "</td></tr>");

});
