import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0-4gcLZHrbOgc6-YthAyHCu20ib8p52w",

  authDomain: "phat-threads-db.firebaseapp.com",

  projectId: "phat-threads-db",

  storageBucket: "phat-threads-db.firebasestorage.app",

  messagingSenderId: "765278608131",

  appId: "1:765278608131:web:1e84976599ceaca8e56736",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithUserEmailAndPassword = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInformation={}) => {
	
	if(!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);
	
	const userSnapshot = await getDoc(userDocRef);

	if(!userSnapshot.exists()){
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		}catch(error) {
			console.log('Error creating user:', error.message);
		}
	}
	return userDocRef;	
	}

	export const createAuthUserWithEmailAndPassword = async(email, password) => {
		
		if (!email || !password || !auth) return;

		return await createUserWithEmailAndPassword(auth, email, password);
	};