import {useEffect, useState} from "react";
import Header from "../components/Header/Header.tsx";
import ServiceCard from "../components/ServiceCard/ServiceCard.tsx";
import {getServiceList, IServices} from "../modules/serviceApi.ts";

import './ServicePage.css'
import {ServiceMock} from "../modules/mock.ts";
import InputField from "../components/InputField/InputField.tsx";
import {Spinner} from "react-bootstrap";


const ServicePage = () => {
    const [serviceList, setServiceList] = useState<IServices>([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");

    const getServices = (search: string) => {
        getServiceList(search).then((response) => {
            if (Array.isArray(response)) {
                setServiceList(response);
            }
        }).catch(() => {
            setServiceList(ServiceMock.filter(item =>
                item.title.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())));
        }).finally(() => {
            setLoading(false)
        });
    }

    useEffect(() => {
        getServices('');
    }, []);

    const handleSearch = () => {
        setLoading(true);
        getServices(searchValue);
    }

    const isEmpty = serviceList.length === 0;

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

                        {serviceList.map((item, index) => (
                            <ServiceCard key={index} {...item} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default ServicePage
