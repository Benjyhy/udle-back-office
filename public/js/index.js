const firebaseConfig = {
    apiKey: "AIzaSyAHzf4Q4RbL8Zu0nZ-tDIBhKog5XfdYA1g",
    authDomain: "udle-c3db5.firebaseapp.com",
    databaseURL: "https://udle-c3db5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "udle-c3db5",
    storageBucket: "udle-c3db5.appspot.com",
    messagingSenderId: "329469301017",
    appId: "1:329469301017:web:9b3555937fe389e317f588"
};

const app = initializeApp(firebaseConfig);

const BTN_LOGIN = document.getElementById("login-btn");

BTN_LOGIN.addEventListener("click", function () {
    let email = document.getElementById("mail-field").value;
    let pwd = document.getElementById("pass-field").value;
    if (email != "" && pwd != "") {
        let result = firebase.auth().signInWithEmailAndPassword();
        result.catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            window.alert("Message :" + errorMessage + errorCode);
        });
    } else {
        window.alert("Oops");
    }
});