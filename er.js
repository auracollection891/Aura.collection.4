import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    onAuthStateChanged, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "firebase/auth";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc 
} from "firebase/firestore";

// --- 1. CONFIGURATION ---
const firebaseConfig = {
      apiKey: "AIzaSyB7_cApVv7kiFsubBVsPDSitwCaSFqlo30",
  authDomain: "aura-collection-f2ed6.firebaseapp.com",
  projectId: "aura-collection-f2ed6",
  storageBucket: "aura-collection-f2ed6.firebasestorage.app",
  messagingSenderId: "614511990860",
  appId: "1:614511990860:web:19526036f93b57b44fbce9",
  measurementId: "G-JCK3S1C2RY"
};

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// --- 2. AUTHENTICATION & UI SYNC ---
onAuthStateChanged(auth, async (user) => {
    const profileImg = document.getElementById("profileLogo");
    const nameDisplay = document.getElementById("userName");

    if (user) {
        // Fetch user data from Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data();
            if (profileImg) profileImg.src = data.profilePic || "default-avatar.png";
            if (nameDisplay) nameDisplay.innerText = data.fullName || user.displayName;
        } else {
            // New user? Create their lifetime record
            const newUser = {
                fullName: user.displayName || "New User",
                email: user.email,
                profilePic: user.photoURL || "",
                address: "Not set",
                createdAt: new Date()
            };
            await setDoc(userRef, newUser);
            if (profileImg) profileImg.src = newUser.profilePic;
        }
    } else {
        // Reset UI if logged out
        if (profileImg) profileImg.src = "guest-icon.png";
        if (nameDisplay) nameDisplay.innerText = "Guest";
    }
});

// --- 3. EVENT LISTENERS (Module Style) ---

// Google Login
const loginBtn = document.getElementById("googleSignIn");
if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Login Error:", error);
        }
    });
}

// Image Upload (The "Broke-Friendly" Base64 Way)
const fileInput = document.getElementById("fileInput");
if (fileInput) {
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = async () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 150; 
                canvas.height = 150;
                ctx.drawImage(img, 0, 0, 150, 150);

                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                const user = auth.currentUser;
                if (user) {
                    await updateDoc(doc(db, "users", user.uid), {
                        profilePic: compressedBase64
                    });
                    document.getElementById("profileLogo").src = compressedBase64;
                }
            };
        };
        reader.readAsDataURL(file);
    });
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        signOut(auth).then(() => window.location.reload());
    });
}
