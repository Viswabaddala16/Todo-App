import { createSlice } from "@reduxjs/toolkit";
import { usersList } from "./Data";

const userSlice  = createSlice({
    name : "users",
    initialState : usersList,
    reducers : {
        addUser : (state,action) => {
            state.push(action.payload);
            
        },
        updateUser : (state,action) => {
            const {id,name,email} = action.payload;
            const existingUser = state.find(user => user.id === id);
            if (existingUser) {
                existingUser.name = name;
                existingUser.email = email;
            }
        },
        deleteUser : (state,action) => {
            const {id} = action.payload;
            const uu = state.find(user => user.id === id);
            if(uu){
                return state.filter(f => f.id !== id);
            }
        }
    }
});
export const{addUser,updateUser,deleteUser} = userSlice.actions;
export default userSlice.reducer;