import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {User} from "../../api/Api.ts";
import {login, reg} from "../../api/getData.ts";

type InitState = {
    isAuthorized: boolean;
    status: string;
    error: boolean;
    success: boolean;
    isStaff?: boolean;
    isSuperuser?: boolean
    isRegistered?: boolean;
    regError?: boolean;
}

const initialState: InitState = {
    isAuthorized: false,
    status: 'idle',
    error: false,
    success: false,
    isStaff: false,
    isSuperuser: false,
    isRegistered: false,
    regError: false
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setData(state) {  // изменяем состояние на полученные данные
            state.isAuthorized = true
        }
    },
    selectors: {
        useUserData: (state) => state
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = false;
                state.success = false;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
                state.isAuthorized = true;
                state.success = true;
                state.error = false;
                state.isStaff = action.payload.is_staff;
                state.isSuperuser = action.payload.is_superuser;
                state.status = 'success';
            })
            .addCase(login.rejected, (state) => {
                state.error = true;
                state.success = false;
                state.status = 'error';
            })
            .addCase(reg.fulfilled, (state) => {
                state.isRegistered = true
                state.regError = false
            })
            .addCase(reg.rejected, (state) => {
                state.regError = true
            });
    }
});


export const {setData: setDataAction} = userSlice.actions;

export const {useUserData} = userSlice.selectors;
