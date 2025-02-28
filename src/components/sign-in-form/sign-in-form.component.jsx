import './sign-in-form.styles.scss';
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithUserEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {

	let navigate = useNavigate();

  const defaultFormFields = {
    email: "",
    password: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
 
	const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

	const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    
		event.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields!");
      return;
    }
		// else if(auth.currentUser){
		// 	alert("Someone is already signed in!");
		// 	return;
		// }

    try {
      const { user } = await signInWithUserEmailAndPassword(
        email,
        password
      );
			createUserDocumentFromAuth(user);
      resetFormFields();
      alert("Sign in successful!");
			navigate("/");
    } catch (error) {
			switch(error.code){
				case 'auth/invalid-credential':
					alert("Incorrect email or password")
					break;
				default:
					alert(error.message)
			}
      alert(error.code);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="sign-in-button-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType={"google"} onClick={signInWithGoogle}>
            Sign in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;