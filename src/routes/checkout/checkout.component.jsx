
import { useContext } from 'react';
import './checkout.styles.scss';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {

	const { cartItems, cartTotal } = useContext(CartContext);

	const headings = ["Product", "Description", "Quantity", "Price", "Remove"];

	return(
		<div className='checkout-container'>
			<div className='checkout-header'>
				{
					headings.map((heading) => { return ( <span className='header-block'>{heading}</span> ) })
				}
			</div>
			{
				cartItems.map((item) => <CheckoutItem item={item} key={item.id} />)
			}
			<div className='total'>
				TOTAL: ${cartTotal}
			</div>
		</div>
	)
}
 
export default Checkout;