
function calculateWorkout() {
    const database = firebase.database();
    const ref = database.ref('users');
    const auth = firebase.auth();
    let workoutDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayCount = 0;
    var goal;
    var shoulders;
    var legs;
    var arms;
    var bodyFat;
    var chest;
    var userExercises = new Array();
    var exerciseTime;
    var schedule = null;
    var exOBJ;

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var useruid = user.uid;
            console.log(useruid);
        } 
        else {
            window.alert("No user is signed in");
        }
        firebase.database().ref('users/'+useruid).once('value').then(function (snapshot){

            goal = snapshot.val().goal;

            snapshot.child('user_exercises').forEach(function(exDB) {
                exOBJ = new Exercise(exDB.val().name, exDB.val().type);
                exOBJ.record = exDB.child(record);
                exOBJ.procedure = exDB.val().procedure;
                exOBJ.speed = exDB.val().speed;
                exOBJ.muscles = exDB.val().muscles;
                exOBJ.reps = exDB.val().reps;
                exOBJ.sets = exDB.val().sets;
                exOBJ.time = exDB.val().time;
                userExercises.push(Exercise.copy(exOBJ));
                exOBJ = null;
            });

            var i = 0;
            snapshot.child('days').forEach(function(daybool) {
                if (daybool.val()) {
                    workoutDays[dayCount] = workoutDays[i];
                    dayCount++;
                }
                i++;
            });
            workoutDays = workoutDays.slice(0, dayCount);
            exerciseTime = snapshot.val().time;
            bodyFat = snapshot.val().bodyfat;
            shoulders = snapshot.val().shoulders;
            legs = snapshot.val().legs;
            arms = snapshot.val().arms;
            back = snapshot.val().back;
            chest = snapshot.val().chest;
            
            schedule1 = weightloss(exerciseTime, dayCount);
            schedule2 = tone(exerciseTime, dayCount);
            schedule3 = gainmass(exerciseTime, dayCount);
            
            var toneList = {cardio: new Array(), bodyweight: new Array(), strength: new Array() };
            fillToneSchedule(schedule2, dayCount, bodyFat, shoulders, legs, arms, back, chest, userExercises, toneList); 

            setTimeout( function() {
                var str = "";
                for(i = 0; i < toneList.cardio.length; i++) {
                    str = str + toneList.cardio[i].name + ", ";
                }
                document.getElementById("cardio_param").innerHTML = "Cardio Exercises: " + str;
                str = "";
                for(i = 0; i < toneList.bodyweight.length; i++) {
                    str = str + toneList.bodyweight[i].name + ", ";
                }
                document.getElementById("bodyweight_param").innerHTML = "Bodyweight Exercises: " + str;
                str = "";
                for(i = 0; i < toneList.strength.length; i++) {
                    str = str + toneList.strength[i].name + ", ";
                }
                document.getElementById("strength_param").innerHTML = "Strength Exercises: " + str;
                window.alert("\"I still need to do stuff\" - Alex");
            }, 4000);

            /*
            fillToneSchedule(schedule2, dayCount, bodyFat, shoulders, legs, arms, back, chest, userExercises);
            fillStrengthSchedule(schedule3, dayCount, bodyFat, shoulders, legs, arms, back, chest, userExercises);
            switch(goal) {
                case 0:
                    schedule = weightloss(exerciseTime, dayCount);
                    break;
                case 1:
                    schedule = tone(exerciseTime, dayCount);
                    break;
                case 2:
                    schedule = gainmass(exerciseTime, dayCount);
                    break;
            }
            window.alert("hey hey hey");
            */
        });
    });
}

