import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ServiceDetails} from "./pages/ServiceDetails.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import {ROUTES} from "./routes/Routes";
import Orders from "./pages/Orders.tsx";

function App() {
    return (
        <BrowserRouter basename="/lab4">
            <Routes>
                <Route path={ROUTES.HOME} index element={<ServicePage />}/>
                <Route path={`${ROUTES.DETAILS}/:id`} element={<ServiceDetails />}/>
                <Route path={ROUTES.ORDERS} element={<Orders/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
