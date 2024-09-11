 const firebaseConfig = {
    apiKey: "AIzaSyC-D1aLXoqrzdZQJ95E_f1uqKDOBeXr8fc",
    authDomain: "class-2-693ed.firebaseapp.com",
    projectId: "class-2-693ed",
    storageBucket: "class-2-693ed.appspot.com",
    messagingSenderId: "674780174704",
    appId: "1:674780174704:web:d890a15ac00965581cd7b5",
    measurementId: "G-VGZEGM831J"
  };


  
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();

function signUp() {
    var email = document.getElementById('email')
    var password = document.getElementById('password')
    var userName = document.getElementById('userName')


    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(user) 
            db.collection("user").add({
              userName: userName.value,
              Email: email.value,
              uid:user.uid
              
          })
          .then((e) => {
              console.log("Document written with ID: ", e.id);
          })
          .catch((error) => {
              console.error("Error adding document: ", error);
          });
          
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error msg===>",errorMessage)
            // ..
        });


}

function signIn(){
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value    

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("user", user)




      db.collection("user").where("uid", "==", user.uid)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });

      






      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error Msg===>>", errorMessage)
    });
  


}


