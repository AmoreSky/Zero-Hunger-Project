import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, deleteUser, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";


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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
let data;
let pendingUser = null;


let usersref = ref(database, 'users')
onValue(usersref, (snapshot) => {
    data = snapshot.val()
    // console.log(data);
    

    if (pendingUser) {
        handleSignedInUser(pendingUser);
        pendingUser = null;
    }

})

function handleSignedInUser(user) {
    if (!data) {
        pendingUser = user;
        return;
    }

    const record = Object.values(data).find(
        item => item.userEmail === user.email
    );

    if (!record) {
        deleteUser(user).then(() => {
            window.location.href = '../signup/signup.html';
        });
        return;
    }

    if (record.userType === 'donor') {
        window.location.href = '../donate/donate.html';
    } else {
        window.location.href = '../find_food/find_food.html';
    }
}
const login = () => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            handleSignedInUser(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            window.location.href = '../signup/signup.html';


        });
}
window.login = login



const signG = async () => {
    if (window.innerWidth >= 768) {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                handleSignedInUser(user);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    } else {
        signInWithRedirect(auth, provider);
    }
}
window.signG = signG

// Handle redirect result when page loads
getRedirectResult(auth)
    .then((result) => {
        if (result && result.user) {
            handleSignedInUser(result.user);
        }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
