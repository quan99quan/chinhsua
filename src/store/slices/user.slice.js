import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: null,
        list: null
    },
    reducers: {
        setList: (state, action) => {
            state.list = action.payload;
        },
        addToList: (state, action) => {
            state.list.push(action.payload);
        },
        deleteList: (state, action) => {
            state.list = state.list.filter(user => user.id !== action.payload);
        },
        editList: (state, action) => {
            const { id, name, email } = action.payload;
            state.list = state.list.map(user =>
                user.id == id ? { ...user, name, email } : user
            );

            
        },
    }
})

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
