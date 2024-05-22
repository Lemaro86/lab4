import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Order} from "../../api/Api.ts";
import {getOrder, getOrderList} from "../../api/getData.ts";

type InitState = {
    list: Order[];
    status: string;
    error: boolean;
    loading: boolean;
    item?: Order;
}

const initialState: InitState = {
    list: [],
    status: 'idle',
    error: false,
    loading: false,
    item: undefined,
}

export const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {
        setData(state, action: PayloadAction<Order[]>) {  // изменяем состояние на полученные данные
            state.list = action.payload
        },
        leaveOrder(state){
            state.item = undefined
        }
    },
    selectors: {
        useData: (state) => state
    },
    extraReducers: builder => {
        builder
            .addCase(getOrderList.pending, (state) => {
                state.status = 'loading';
                state.error = false;
                state.loading = true;
            })
            .addCase(getOrderList.fulfilled, (state, action) => {
                state.list = action.payload;
                state.error = false;
                state.loading = false;
            })
            .addCase(getOrderList.rejected, (state) => {
                state.error = true;
                state.loading = false;
            }).addCase(getOrder.fulfilled, (state, action)=>{
                state.item = action.payload
        });
    }
});


export const {setData: setDataAction, leaveOrder} = orderSlice.actions;

export const {useData} = orderSlice.selectors;
