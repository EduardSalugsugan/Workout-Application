function gotData(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var useruid = user.uid;
            //console.log(useruid);
        } 
        else {
            // window.alert("No user is signed in");
        }

        firebase.database().ref('users/'+useruid).once('value').then(function (snapshot){
            document.getElementById("user_param").innerHTML = "Name : " + snapshot.val().username;
            document.getElementById("email_param").innerHTML = "Email : " + snapshot.val().email;
            document.getElementById("weight_param").innerHTML = "Weight : " + snapshot.val().weight + " lbs";
            document.getElementById("height_param").innerHTML = "Height : " + snapshot.val().height_ft + "\'" + snapshot.val().height_in + "\"";
            // document.getElementById("first_param").innerHTML = "Gender : " + snapshot.val().firsttime;
        })
    });
}

function logout(){
    firebase.auth().signOut();
    window.location.href = "index.html";
}