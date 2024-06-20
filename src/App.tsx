import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ServiceDetails} from "./pages/ServiceDetails.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import {ROUTES} from "./routes/Routes";
import Orders from "./pages/Orders.tsx";
import Login from "./components/Auth/Login.tsx";
import Registration from "./components/Auth/Registration.tsx";
import {OrderDetail} from "./pages/OrderDetail.tsx";
import {ServiceEdit} from "./pages/ServiceEdit.tsx";
import {ServiceAdd} from "./pages/ServiceAdd.tsx";

function App() {
    return (
        <BrowserRouter basename="/lab4">
            <Routes>
                <Route path={ROUTES.HOME} index element={<ServicePage />}/>
                <Route path={`${ROUTES.DETAILS}/:id`} element={<ServiceDetails />}/>
                <Route path={ROUTES.ORDERS} element={<Orders/>}/>
                <Route path={`${ROUTES.ORDER}/:id`} element={<OrderDetail />}/>
                <Route path={ROUTES.LOGIN} element={<Login/>}/>
                <Route path={ROUTES.REGISTRATION} element={<Registration/>}/>
                <Route path={ROUTES.SERVICE} element={<ServiceEdit/>}/>
                <Route path={ROUTES.ADD_SERVICE} element={<ServiceAdd/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
