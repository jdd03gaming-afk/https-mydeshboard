import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3zyL9qZt7tD_O5R8ZBKTeFFxWo7JW7mU",
  authDomain: "my-admin-dashboard-9d32b.firebaseapp.com",
  projectId: "my-admin-dashboard-9d32b",
  storageBucket: "26my-admin-dashboard-9d32b.firebasestorage.app",
  messagingSenderId: "265651411193",
  appId: "1:265651411193:web:95d9d9d1bf7d77e43aaa28" 
  measurementId: "G-R60SXGN0WX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const authSection = document.getElementById("auth-section");
const dashboard = document.getElementById("dashboard");
const userEmail = document.getElementById("userEmail");
const userData = document.getElementById("userData");

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    authSection.style.display = "none";
    dashboard.style.display = "flex";
    userEmail.textContent = email;
    loadData();
  } catch (e) {
    alert(e.message);
  }
}

async function logout() {
  await signOut(auth);
  dashboard.style.display = "none";
  authSection.style.display = "block";
}

async function saveData() {
  const user = auth.currentUser;
  if (!user) return alert("Please login first.");
  const data = userData.value;
  await setDoc(doc(db, "users", user.uid), { text: data });
  alert("Data saved!");
}

async function loadData() {
  const user = auth.currentUser;
  if (!user) return;
  const docSnap = await getDoc(doc(db, "users", user.uid));
  if (docSnap.exists()) {
    userData.value = docSnap.data().text;
  } else {
    userData.value = "";
  }
}

window.signup = signup;
window.login = login;
window.logout = logout;
window.saveData = saveData;
window.loadData = loadData;
