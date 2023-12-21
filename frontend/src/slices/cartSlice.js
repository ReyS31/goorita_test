import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Give case reducers meaningful past-tense "event"-style names
    cartAdded(state, action) {
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.cart.push(action.payload);
    },
    cartRemoved(state, action) {
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.cart.push(action.payload.id);
    },
    todoToggled(state, action) {
      // Look for the specific nested object to update.
      // In this case, `action.payload` is the default field in the action,
      // and can hold the `id` value - no need for `action.id` separately
      const matchingTodo = state.cart.find((todo) => todo.id === action.payload);

      if (matchingTodo) {
        // Can directly "mutate" the nested object
        matchingTodo.completed = !matchingTodo.completed;
      }
    },
  },
});

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { cartAdded, cartToggled } = cartSlice.actions;

// Export the slice reducer as the default export
export default cartSlice.reducer;
