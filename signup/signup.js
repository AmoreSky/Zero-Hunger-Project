import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMDYlFX-iCBtWM5Feqc1Sg72lgr2AlAus",
  authDomain: "zero-hunger-project-c92ea.firebaseapp.com",
  databaseURL: "https://zero-hunger-project-c92ea-default-rtdb.firebaseio.com",
  projectId: "zero-hunger-project-c92ea",
  storageBucket: "zero-hunger-project-c92ea.firebasestorage.app",
  messagingSenderId: "242178592978",
  appId: "1:242178592978:web:cb8b5439c5f59982be1d0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let userIndex = 0
let users;
let userName;
let userEmail;
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
let userPassword;
let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
let userType;
let radios = document.querySelectorAll('input[name="type"]');
radios.forEach(type => {
  type.addEventListener('change', function () {
    console.log('Selected value:', this.value);
    userType = this.value
  });
});

function create() {
  userName = document.getElementById('name').value
  userEmail = document.getElementById('email').value
  userPassword = document.getElementById('password').value


  if (userName.trim() == '' || userEmail.trim() == '' || userPassword.trim() == '' || userType == undefined) {
    // alert('All inputs has to be filled')
    document.getElementById('errorMessage').innerText = 'All inputs has to be filled'
  } else if (!emailPattern.test(userEmail)) {
    // alert('Kindly input a valid email address')
    document.getElementById('errorMessage').innerText = 'Kindly input a valid email address'
    email.value = ''
    password.value = ''
  } else if (!passwordPattern.test(userPassword)) {
    // alert('Kindly input a valid password (ensure it contails at least one capital letter, one digit, a special character and is not less than 8)')
    document.getElementById('errorMessage').innerText = 'Kindly input a valid password (ensure it contails at least one capital letter, one digit, a special character and is not less than 8)'
    email.value = ''
    password.value = ''
  }
  else {
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        users = { userName, userType, userEmail }
        console.log(users);
        let userRef = ref(database, `users/${user.uid}`)
        set(userRef, users)

        if (userType == 'donor') {
          setTimeout(() => {
            user ? window.location.href = '../donate/donate.html' : window.location.href = '../signup/signup.html'
          }, 1500
          )
        } else {
          setTimeout(() => {
            user ? window.location.href = '../find_food/find_food.html' : window.location.href = '../signup/signup.html'
          }, 1500)
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

        // ..
      });
  }
}
window.create = create







