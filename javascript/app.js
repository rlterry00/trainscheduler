window.onload = function() {
    $("#trainResult").empty();
    $("#destResult").empty();
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAFvBR7xrqtrpIZiHi3OzRCptMyQffH3eg",
        authDomain: "train-8980b.firebaseapp.com",
        databaseURL: "https://train-8980b.firebaseio.com",
        projectId: "train-8980b",
        storageBucket: "train-8980b.appspot.com",
        messagingSenderId: "1004097048851"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var trainName = "";
    var destination = "";
    var firstTrain = 0;
    var frequency = 0;



    $("#submit").on("click", function(event) {
        event.preventDefault();

        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#firstTrain").val().trim();
        frequency = $("#frequency").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency







        });

        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");

        return false;

    });

    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        var train = childSnapshot.val().trainName;
        var dest = childSnapshot.val().destination;
        var ft = childSnapshot.val().firstTrain;
        var freq = childSnapshot.val().frequency;

        var firstTrainConverted = moment(ft, "HH:mm").subtract(1, "years");
        console.log(firstTrainConverted);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

        var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        var remainder = diffTime % freq;
        console.log(remainder);

        var minutesTillTrain = freq - remainder;
        console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

        var nextTrain = moment().add(minutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        var nextTrainTime = moment(nextTrain).format("HH:mm");

        console.log(train);
        console.log(dest);
        console.log(ft);
        console.log(freq);

        $("#trainResult").append("<tr><td>" + train + "</td></tr>");
        $("#destResult").append("<tr><td>" + dest + "</td></tr>");
        $("#freqResult").append("<tr><td>" + freq + "</td></tr>");
        $("#nextResult").append("<tr><td>" + nextTrainTime + "</td></tr>");
        $("#minResult").append("<tr><td>" + minutesTillTrain + "</td></tr>");
    });
    $("#clear").on("click", function(event) {
        event.preventDefault();
        $("#trainResult").empty();
        $("#destResult").empty();
        $("#freqResult").empty();
        $("#nextResult").empty();
        $("#minResult").empty();
    });
};
