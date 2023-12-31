import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user.slice";

const store = configureStore({
    reducer: {
        userStore: userReducer
    }
})

export default store