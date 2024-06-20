import Header from "../components/Header/Header.tsx";
import {useEffect, useState} from "react";
import {Spinner} from "react-bootstrap";
import {BreadCrumbs} from "../components/BreadCrumbs/BreadCrumbs.tsx";
import {useAppDispatch, useAppSelector} from "../store/store.ts";
import {getServiceList} from "../api/getData.ts";
import {useData} from "../store/data/serviceSlice.ts";
import Table from "react-bootstrap/Table";
import {ServiceTable} from "../components/ServiceTable/ServiceTable.tsx";
import {useNavigate} from "react-router-dom";

export const ServiceEdit = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {list} = useAppSelector(useData);

    useEffect(() => {
        dispatch(getServiceList()).then(() => setLoading(false));
    }, [dispatch]);

    return (
        <>
            <Header/>
            <div className="wrapper">
                <h2>Модерирование</h2>

                <BreadCrumbs
                    crumbs={[
                        {label: "Страница модератора"},
                    ]}
                />

                <button className='add-btn' onClick={() => navigate('/add-service')}>Добавить услугу</button>

                {loading && (
                    <div className="loadingBg">
                        <Spinner animation="border"/>
                    </div>
                )}

                {!loading && (
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th style={{width: '277px'}}>Название</th>
                            <th>Описание</th>
                            <th>Цена</th>
                            <th>Действия</th>
                            <th>Очистка</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list.map((item, index) => (
                            <tr key={index}>
                                <ServiceTable {...item} />
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </>
    )
}
