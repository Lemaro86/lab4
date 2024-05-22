import {BreadCrumbs} from "../components/BreadCrumbs/BreadCrumbs.tsx";
import Header from "../components/Header/Header.tsx";
import {useAppDispatch, useAppSelector} from "../store/store.ts";
import {useData} from "../store/data/orderSlice.ts";
import {useEffect} from "react";
import {getOrderList} from "../api/getData.ts";
import {useNavigate} from "react-router-dom";
import {OrdersTable} from "../components/OrdersTable/OrdersTable.tsx";
import Table from "react-bootstrap/Table";
import {Spinner} from "react-bootstrap";

const Orders = () => {
    const dispatch = useAppDispatch();
    const {list, error, loading } = useAppSelector(useData);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getOrderList());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            return navigate('/login')
        }
    }, [error]);

    return (
        <>
            <Header/>
            <div className="wrapper">
                <BreadCrumbs crumbs={[{label: "Заявки"}]}/>
                <h1>Заявки</h1>

                {loading && <div className="loadingBg">
                    <Spinner animation="border"/>
                </div>}

                {!loading && <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th style={{width: '277px'}}>Дата создания</th>
                        <th>Статус</th>
                        <th>Создатель</th>
                        <th>Модератор</th>
                        <th>Дата активации</th>
                        <th>Дата завершения</th>
                        <th>Подробнее</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <OrdersTable {...item} />
                        </tr>
                    ))}
                    </tbody>
                </Table>}
            </div>
        </>
    )
}

export default Orders
