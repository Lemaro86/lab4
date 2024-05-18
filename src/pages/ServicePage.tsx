import {useEffect, useState} from "react";
import Header from "../components/Header/Header.tsx";
import ServiceCard from "../components/ServiceCard/ServiceCard.tsx";
import {getServiceList, IServices} from "../modules/serviceApi.ts";

import './ServicePage.css'
import {ServiceMock} from "../modules/mock.ts";


const ServicePage = () => {
    const [serviceList, setServiceList] = useState<IServices>([]);

    const getServices = () => {
        getServiceList().then((response)=> {
            if (Array.isArray(response)) {
                setServiceList(response);
            }
        }).catch(()=> {
            setServiceList(ServiceMock);
        });
    }

    useEffect(() => {
        getServices();
    }, []);

    return (
        <>
            <Header/>
            <div className="wrapper">
                <h2>Дэзстанция</h2>
                <div>Search here</div>
                <div className="card-list">
                    {serviceList.map((item, index) => (
                        <ServiceCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ServicePage
