export const ROUTES = {
    HOME: "/",
    DETAILS: "/page",
    ORDERS: "/orders",
    ORDER: "/order",
    LOGIN: "/login",
    REGISTRATION: "/registration"
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    DETAILS: "Услуга",
    ORDERS: " Заявки",
    LOGIN: "Вход",
    REGISTRATION: "Регистрация",
    ORDER: "Заявка"
};
