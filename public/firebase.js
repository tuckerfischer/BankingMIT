// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX8w5xdVMTX_6KMTtOj_Y0gFRVcyGfnWk",
  authDomain: "courso-c56d4.firebaseapp.com",
  projectId: "courso-c56d4",
  storageBucket: "courso-c56d4.appspot.com",
  messagingSenderId: "345078365243",
  appId: "1:345078365243:web:1cc58c7bf46ff662c3701e",
  measurementId: "G-ET05CSRDD4"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// clear any existing log-in sessions
firebase.auth().signOut()

console.log("app initialized...");


// firebase login state
firebase.auth().onAuthStateChanged((firebaseUser) => {
  const depositLink    = document.getElementById('depositLink');	
  const withdrawLink   = document.getElementById('withdrawLink');	
  const balanceLink    = document.getElementById('balanceLink');	
  const createLink     = document.getElementById('createLink');	
  //const userEmail      = document.getElementById("LoginAnchor");
  if (firebaseUser) {
    console.log('Firebase Auth Logged-In: ' + firebaseUser.email);
    createLink.style.display = "none";
    depositLink.style.display = "inline-block";
    withdrawLink.style.display = "inline-block";
    balanceLink.style.display = "inline-block";
  } else {
    console.log('Firebase Auth Logged-Out');
    createLink.style.display = "inline-block";
    depositLink.style.display = "none";
    withdrawLink.style.display = "none";
    balanceLink.style.display = "none";
  }
});
