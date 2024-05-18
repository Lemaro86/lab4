import {BreadCrumbs} from "../components/BreadCrumbs/BreadCrumbs.tsx";
import Header from "../components/Header/Header.tsx";

const Orders = () => {
    return (
        <>
            <Header/>
            <div className="wrapper">
                <BreadCrumbs crumbs={[{label: "Заявки"}]}/>
                <h1>Заявки будут позже, но это не точно...</h1>
            </div>
        </>
    )
}

export default Orders
