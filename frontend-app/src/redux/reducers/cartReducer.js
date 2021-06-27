import { v4 as uuidv4 } from "uuid";

import { CART } from "../defines";

const initialState = [];

export default function cartReducer(state = initialState, action) {
  const cartItem = state.find((item) => item.cartId === action.cartId);
  const cartItemIndex = cartItem && state.indexOf(cartItem);
  switch (action.type) {
    case CART.ADD_TO_CART:
      const foundItem = state.find((item) => item.cartId === action.product.itemModelId);
      console.log('FOUND ITEM: ', foundItem);
      const foundItemIndex = foundItem && state.indexOf(foundItem);
      console.log('FOUND ITEM IDENX, ', foundItemIndex);
      if(foundItemIndex > -1){
        console.log('TAWNG LEN');
        return [
          ...state.slice(0, foundItemIndex),
          { ...foundItem, cartQuantity: foundItem.cartQuantity + 1 },
          ...state.slice(foundItemIndex + 1),
        ];
      } else {
        let newName = action.product.name;
        if(action.product.variation){
          
          newName += (' (');
          let first = true;
          for (const key in action.product.variation) {
            if(!first){
              newName += ', '
            }else first = false;
            
            const name = action.product.variation[key];
            newName += name;
          }
          newName += (')');
        }
        return [
        ...state,
        {
          ...action.product,
          name: newName,
          cartQuantity: action.quantity || 1,
          cartId: action.product.itemModelId,
        }]
      }
      // return [
      //   ...state,
      //   {
      //     ...action.product,
      //     cartQuantity: action.quantity || 1,
      //     selectedColor: action.color,
      //     selectedSize: action.size,
      //     cartId: uuidv4(),
      //   }]
    case CART.REMOVE_FROM_CART:
      return [
        ...state.slice(0, cartItemIndex),
        ...state.slice(cartItemIndex + 1),
      ];
    case CART.REMOVE_ALL_FROM_CART:
      return [];
    case CART.INCREASE_QUANTITY_CART:
      return [
        ...state.slice(0, cartItemIndex),
        { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 },
        ...state.slice(cartItemIndex + 1),
      ];
    case CART.DECREASE_QUANTITY_CART:
      if (cartItem.cartQuantity < 2) {
        return;
      }
      return [
        ...state.slice(0, cartItemIndex),
        { ...cartItem, cartQuantity: cartItem.cartQuantity - 1 },
        ...state.slice(cartItemIndex + 1),
      ];
    default:
      return state;
  }
}
