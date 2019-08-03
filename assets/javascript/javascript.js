var name;
var dest;
var firsttime;
var freq;
var tdnt;
var nexttime;
var secret = apikeys.SECRETAPI;
var firebaseConfig = {
    apiKey: secret,
    authDomain: "trainscheduler-4ef21.firebaseapp.com",
    databaseURL: "https://trainscheduler-4ef21.firebaseio.com",
    projectId: "trainscheduler-4ef21",
    storageBucket: "",
    messagingSenderId: "472024285091",
    appId: "1:472024285091:web:e2709b478ccd7d5d"
  };
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
$("#submit").on("click", function(){
    event.preventDefault();
    name = $("#name").val();
    dest = $("#dest").val();
    firsttime = $("#firsttime").val();
    freq = $("#frequency").val();
    console.log(name);
    console.log(dest);
    console.log(firsttime);
    console.log(freq);
    var firstTimeConverted = moment(firsttime, "HH:mm").subtract(0, "years");
    console.log(firstTimeConverted.format("hh:mm A"));
    var currentTime = moment();
    console.log(currentTime.format("hh:mm A"));
    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(timeDiff);
    if (timeDiff >= 0){
        var remainder = freq - (timeDiff % freq);
        console.log(remainder);
        nexttime = moment().add(remainder, "minutes").format("hh:mm A");
        console.log(nexttime);
        var tdminutestill = remainder;
    }
    else if (timeDiff < 0){
        var tdminutestill = timeDiff * -1;
        nexttime = moment(firsttime, "hh:mm A").format("hh:mm A");
        console.log(nexttime);
    }
    var newTrain = {
        name: name,
        dest: dest,
        nexttime: nexttime,
        freq: freq,
        tdminutestill: tdminutestill
    };
    database.ref().push(newTrain);
    $("#table").append()
    $("#name").val("");
    $("#dest").val("");
    $("#firsttime").val("");
    $("#frequency").val("");
});
database.ref().on("child_added", function(childSnapshot) {

    // Print the initial data to the console.
    console.log(childSnapshot.val());

    var empName = childSnapshot.val().name;
    var empDest = childSnapshot.val().dest;
    var empNext = childSnapshot.val().nexttime;
    var empFreq = childSnapshot.val().freq;
    var empStill = childSnapshot.val().tdminutestill;

    // Log the value of the various properties
    console.log(empName);
    console.log(empDest);
    console.log(empNext);
    console.log(empFreq);
    console.log(empStill);

    // Change the HTML
    var row = $("<tr>");
    row.append("<td>"+empName+"</td>");
    row.append("<td>"+empDest+"</td>");
    row.append("<td>"+empFreq+"</td>");
    row.append("<td>"+empNext+"</td>");
    row.append("<td>"+empStill+"</td>");
    $("#table").append(row);

    // If any errors are experienced, log them to console.
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });