import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {TypedUseSelectorHook, useSelector, useDispatch} from "react-redux";
import {setupListeners} from "@reduxjs/toolkit/query";
import {serviceSlice} from "./data/serviceSlice.ts";
import {orderSlice} from "./data/orderSlice.ts";
import {userSlice} from "./data/userSlice.ts";

export const rootReducer = combineReducers({
    [serviceSlice.name]: serviceSlice.reducer,
    [orderSlice.name]: orderSlice.reducer,
    [userSlice.name]: userSlice.reducer,
})

export function makeStore() {
    const store = configureStore({
        reducer: rootReducer
    });
    setupListeners(store.dispatch);
    return store;

}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

