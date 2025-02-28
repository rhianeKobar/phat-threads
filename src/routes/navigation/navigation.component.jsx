import { Fragment, useContext } from "react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './navigation.styles.scss';
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {

	let navigate = useNavigate();

	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);
	
	const username = currentUser
    ? currentUser.displayName
    : "Stranger";

	const signOutHandler = async() => {
		await signOutUser();
		alert("Sign out successful!");
		navigate("/");
	
	}

	return (
    <Fragment>
      <div className="nav">
        <Link className="nav-logo-container" to="/">
          <CrwnLogo className="nav-logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/">
            Howdy {username}!
          </Link>
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {!currentUser ? (
            <Link className="nav-link" to="/authentication">
              Sign in
            </Link>
          ) : (
            <Link className="nav-link" to="/" onClick={signOutHandler}>
              Sign out
            </Link>
          )}
          <CartIcon />
        </div>
				{ isCartOpen && <CartDropdown /> }
      </div>
      <Outlet />
    </Fragment>
  );
}
export default Navigation;