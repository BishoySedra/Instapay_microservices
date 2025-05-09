import { createSlice, configureStore } from "@reduxjs/toolkit";


const initialAuthState = {
    isLoggedIn: false,
    profilePicture: null,
    username: "",
    email:"",
    id:"",
    datasetOwnerId:"",
    country:"",
    jobTitle:"",
    isAdmin: null,
    dateCreated:"",
    balance:""
    
}



const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state,action) {
            state.isLoggedIn = true; 
        },
        logout(state) {
            state.isLoggedIn = false;
            state.email = null;
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("email");
            localStorage.removeItem("token");
            const userId = localStorage.getItem("userId"); 
            localStorage.removeItem(`chatMessages_${userId}`);
            localStorage.removeItem("userId");
        },
        addProfilePicture(state,action){
            state.profilePicture = action.payload;
        },
        addUsername(state,action){
            state.username = action.payload;
        },
        addID(state,action){
            state.id = action.payload;
        },
        addEmail(state,action){
            state.email = action.payload;
        },
        addDatasetOwnerId(state,action){
            state.datasetOwnerId=action.payload;
        },
        addCountry(state,action){
            state.country=action.payload;
        },
        addJobTitle(state,action){
            state.jobTitle=action.payload;
        },
        addDateCreated(state,action){
            state.dateCreated=action.payload;
        },
        isAdmin(state,action){
            state.isAdmin = action.payload;

        },
        addBalance(state,action){
            state.balance=action.payload;
        }
    }
});




export const authActions = authSlice.actions;


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
});
export default store;