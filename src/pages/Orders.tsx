import {BreadCrumbs} from "../components/BreadCrumbs/BreadCrumbs.tsx";
import Header from "../components/Header/Header.tsx";
import {useAppDispatch, useAppSelector} from "../store/store.ts";
import {useData} from "../store/data/orderSlice.ts";
import {useEffect, useState} from "react";
import {getOrderList} from "../api/getData.ts";
import {OrdersTable} from "../components/OrdersTable/OrdersTable.tsx";
import Table from "react-bootstrap/Table";
import {Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";

const Orders = () => {
    const dispatch = useAppDispatch();
    const {list, loading} = useAppSelector(useData);
    const [errors, setErrors] = useState('');

    useEffect(() => {
        dispatch(getOrderList()).unwrap().catch(err => {
            setErrors(`Ошибка запроса: ${err.message}`);
        });
    }, [dispatch]);

    return (
        <>
            <Header/>
            <div className="wrapper">
                <BreadCrumbs crumbs={[{label: "Заявки"}]}/>
                <h1>Заявки</h1>

                {loading && <div className="loadingBg">
                    <Spinner animation="border"/>
                </div>}

                {errors !== '' && <div className='error-server'>
                    <div>{errors}</div>
                    <div>Если вы не авторизованы, попробуйте <Link to={'/login'}>войти</Link></div>
                </div>}

                {!loading && errors === '' && (
                    <Table striped bordered hover>
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
                    </Table>
                )}
            </div>
        </>
    )
}

export default Orders
