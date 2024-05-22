import {useEffect, useState} from "react";
import Header from "../components/Header/Header.tsx";
import ServiceCard from "../components/ServiceCard/ServiceCard.tsx";

import './ServicePage.css'
import InputField from "../components/InputField/InputField.tsx";
import {Spinner} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../store/store.ts";
import {useData} from "../store/data/serviceSlice.ts";
import {getServiceList} from "../api/getData.ts";


const ServicePage = () => {
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useAppDispatch();

    const {list} = useAppSelector(useData);

    useEffect(() => {
        dispatch(getServiceList());
    }, [dispatch]);

    const handleSearch = () => {
        setLoading(true);
    }

    const isEmpty = list.length === 0;

    return (
        <>
            <Header/>

            <div className="wrapper">
                <h2>Дэзстанция </h2>

                <InputField
                    value={searchValue}
                    setValue={(value) => setSearchValue(value)}
                    loading={loading}
                    onSubmit={handleSearch}
                />

                {loading && (
                    <div className="loadingBg">
                        <Spinner animation="border"/>
                    </div>
                )}

                {!loading && (
                    <div className="card-list">
                        {isEmpty && <div><h1>К сожалению, пока ничего не найдено :(</h1></div>}

                        {list.map((item, index) => (
                            <ServiceCard key={index} {...item} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default ServicePage
