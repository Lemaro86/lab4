import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Service} from "../../api/Api.ts";
import {getServiceList} from "../../api/getData.ts";

type InitState = {
    list: Service[],
    status: string
}

const initialState: InitState = {
    list: [],
    status: 'idle'
}

export const serviceSlice = createSlice({
    name: "service",
    initialState: initialState,
    reducers: {
        setData(state, action: PayloadAction<Service[]>) {  // изменяем состояние на полученные данные
            state.list = action.payload
        }
    },
    selectors: {
        useData: (state) => state
    },
    extraReducers: builder => {
        builder
            .addCase(getServiceList.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getServiceList.fulfilled, (state, action) => {
                state.list = action.payload;
            })
    }
});



export const {setData: setDataAction} = serviceSlice.actions;

export const {useData} = serviceSlice.selectors;
