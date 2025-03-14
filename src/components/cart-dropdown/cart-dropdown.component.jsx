import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {

	const navigate = useNavigate();

	const { cartItems, toggleIsCartOpen } = useContext(CartContext);

	const goToCheckoutHandler = () => {
		toggleIsCartOpen();
		return navigate("/checkout");
	}

	return(
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.map(item => <CartItem key={item.id} cartItem={item} />)}
			</div>
			<Button onClick={goToCheckoutHandler} >GO TO CHECKOUT</Button>
		</div>
	)
}

export default CartDropdown;