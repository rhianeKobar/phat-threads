import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import { getAuth, signOut, onAuthStateChanged, updateProfile, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password || !auth) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const updateUserProfile = async (displayName, photoURL) => {
  updateProfile(auth.currentUser, {
    displayName: displayName,
    photoURL: photoURL,
  }).catch((error) => {
    alert(error.message);
  });
};

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)