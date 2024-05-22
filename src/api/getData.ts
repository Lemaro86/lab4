import {createAsyncThunk} from '@reduxjs/toolkit';
import {Order, Service, User} from "./Api.ts";
import {api} from "./index.ts";

export const getServiceList = createAsyncThunk<Service[]>('ServiceList',
    async () => api.service.serviceList().then(({data}) => data));

export const getOrderList = createAsyncThunk<Order[]>('OrderList',
    async () => api.order.orderList({
        withCredentials: true,
        headers: {
            'X-CSRFToken': document.cookie
                .split('; ')
                .filter(row => row.startsWith('csrftoken='))
                .map(c => c.split('=')[1])[0],
        },
    }).then(({data}) => data));

export const login = createAsyncThunk<User, User>('login',
    async ({email, password}) => api.login.loginCreate({
        email: email,
        password: password
    }).then(({data}) => data));
