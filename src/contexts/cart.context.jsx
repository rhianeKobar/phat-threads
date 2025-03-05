import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {

	const existingCartItem = cartItems.find(product => product.id === productToAdd.id)
	
	if (existingCartItem) {
		return cartItems.map((cartItem) => 
			cartItem.id === productToAdd.id 
			? { ...cartItem, quantity: cartItem.quantity +1 }
			: cartItem
		);
  }

	return [...cartItems, {...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToDecrease) => {

	const productQuantity = productToDecrease.quantity;

	if(productQuantity < 2) {
		return cartItems.filter((item) => item.id !== productToDecrease.id);
	}
	return cartItems.map((cartItem) =>
		cartItem.id === productToDecrease.id ? 
			{ ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
	);
};

const clearCartItem = ( cartItems, productToClear ) => {
	return cartItems.filter((item) => item.id !== productToClear.id);
}

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	cartCount: 0,
	cartTotal: 0
});

export const CartProvider = ({children}) => {
	const [ isCartOpen, setIsCartOpen ] = useState(false);
	const [ cartItems, setCartItems ] = useState([]);
	const [ cartCount, setCartCount ] = useState(0);
	const [ cartTotal, setCartTotal ] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
      (accumulatedItems, currentProduct) =>
        accumulatedItems + currentProduct.quantity,
      0
    );
		setCartCount(newCartCount);
	}, [cartItems])

	useEffect(() => {
		const newCartTotal = cartItems.reduce(
      (total, currentProduct) =>
        total + currentProduct.quantity * currentProduct.price,
      0
    );
    setCartTotal(newCartTotal);
	}, [cartItems])

	
	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	}

	const removeItemFromCart = (productToRemove) => {
		setCartItems(removeCartItem(cartItems, productToRemove));
	}

	const clearItemFromCart = (productToClear) => {
		setCartItems(clearCartItem(cartItems, productToClear));
	}

	const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

	const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, toggleIsCartOpen, removeItemFromCart, clearItemFromCart, cartTotal };

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
