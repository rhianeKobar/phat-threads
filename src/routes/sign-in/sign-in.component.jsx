import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithUserEmailAndPassword } from "../../utils/firebase/firebase.utils";

const SignIn = () => {

	const logGoogleUser = async() => {
		const { user } = await signInWithGooglePopup();
		createUserDocumentFromAuth(user);
	}
	
	return(
		<div>
			<h1>sign in page</h1>
			<button onClick={logGoogleUser}>Sign in with Google</button>
			<SignUpForm />
		</div>
	);
}

export default SignIn;