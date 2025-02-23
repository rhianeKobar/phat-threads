import { Fragment, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './navigation.styles.scss';
import { auth } from "../../utils/firebase/firebase.utils";
import { signOut } from "firebase/auth";

const Navigation = () => {

	let navigate = useNavigate();

	// const defaultUsername = 'Stranger';
	// const [username, setUsername] = useState(defaultUsername);

	const signOutUser = () => {
		signOut(auth)
			.then(()=>{
				// setUsername(defaultUsername);
        alert("Sign out successful!");
				navigate("/");
			})
			.catch(
				(error) => { alert(error.message) }
			)
	}

	// useEffect(()=>{
	// 	let name;
	// 	console.log(auth.currentUser)
	// 	auth.currentUser ? name = auth.currentUser.displayName : name = defaultUsername;
	// 	setUsername(name)
	// },[])

	return (
    <Fragment>
      <div className="nav">
        <Link className="nav-logo-container" to="/">
          <CrwnLogo className="nav-logo" />
        </Link>
        <div className="nav-links-container">
					{/* <p>Howdy {username}!</p> */}
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {!auth.currentUser && (
            <Link className="nav-link" to="/authentication">
              Sign in
            </Link>
          )}
          {auth.currentUser && (
            <Link className="nav-link" to="/" onClick={signOutUser}>
              Sign out
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}
export default Navigation;