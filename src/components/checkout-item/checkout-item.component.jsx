import { useContext } from 'react';
import './checkout-item.styles.scss';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({item}) => {

	const { imageUrl, name, quantity, price } = item;
	const { removeItemFromCart, addItemToCart, clearItemFromCart } = useContext(CartContext);

	const removeProductHandler = () => removeItemFromCart(item);
	const addProductHandler= () =>  addItemToCart(item);
	const clearProductHandler = () =>	clearItemFromCart(item);

	return (
    <div className="checkout-item-container">
      <img src={imageUrl} alt={name} className="image-container" />
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeProductHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addProductHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={clearProductHandler}>
        &#10005;
      </span>
    </div>
  );
}

export default CheckoutItem;