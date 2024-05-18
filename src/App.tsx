import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ServiceDetails} from "./components/ServiceDetails/ServiceDetails.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import {ROUTES} from "./routes/Routes";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} index element={<ServicePage />}/>
                {/*<Route path={ROUTES.DETAILS} element={<AlbumsPage/>}/>*/}
                <Route path={`${ROUTES.DETAILS}/:id`} element={<ServiceDetails />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
