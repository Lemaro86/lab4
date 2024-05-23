import {createAsyncThunk} from '@reduxjs/toolkit';
import {Order, Service, User} from "./Api.ts";
import {api} from "./index.ts";

export type OrderRequest = {
    id: string;
    data: Order;
}
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

export const reg = createAsyncThunk<User, User>('registration',
    async ({email, password, is_staff, is_superuser}) => api.api.apiUserCreate({
        email: email,
        password: password,
        is_superuser: is_superuser,
        is_staff: is_staff
    }).then(({data}) => data));

export const getUserById = createAsyncThunk<any, any>('getUserById',
    async (id) => api.api.apiUserRead(id, {
        withCredentials: true,
        headers: {
            'X-CSRFToken': document.cookie
                .split('; ')
                .filter(row => row.startsWith('csrftoken='))
                .map(c => c.split('=')[1])[0],
        },
    }).then(({data}) => data));

export const getOrder = createAsyncThunk<Order, Order>('getOrder',
    async (order_id) => api.order.orderRead(String(order_id), {
        withCredentials: true,
        headers: {
            'X-CSRFToken': document.cookie
                .split('; ')
                .filter(row => row.startsWith('csrftoken='))
                .map(c => c.split('=')[1])[0],
        },
    }).then(({data}) => data));

export const updateOrderById = createAsyncThunk<Order, OrderRequest>('updateOrder',
    async (data) => api.order.orderUpdate(String(data.id), data.data, {
        withCredentials: true,
        headers: {
            'X-CSRFToken': document.cookie
                .split('; ')
                .filter(row => row.startsWith('csrftoken='))
                .map(c => c.split('=')[1])[0],
        },
    }).then(({data}) => data));

export const deleteOrder = createAsyncThunk<any, any>('deleteOrder',
    async (id) => api.order.orderDelete(id, {
        withCredentials: true,
        headers: {
            'X-CSRFToken': document.cookie
                .split('; ')
                .filter(row => row.startsWith('csrftoken='))
                .map(c => c.split('=')[1])[0],
        },
    }).then(({data}) => data));

export const logout = createAsyncThunk<any>('logout',
    async () => api.logout.logoutList().then(({data}) => data));
