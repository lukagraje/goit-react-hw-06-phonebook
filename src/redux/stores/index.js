import { configureStore } from "@reduxjs/toolkit";
import { reducer as contactsReducer } from "../slices/contactsSlice";
import { reducer as filtersReducer } from "../slices/filtersSlice";

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        filter: filtersReducer,
    }
})

export default store;