import Header from "../components/Header/Header.tsx";
import {useEffect, useState} from "react";
import {getService, IServiceResult} from "../modules/serviceApi.ts";
import {Button, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {BreadCrumbs} from "../components/BreadCrumbs/BreadCrumbs.tsx";
import {ServiceMock} from "../modules/mock.ts";
import {useAppDispatch} from "../store/store.ts";
import {addOrder} from "../api/getData.ts";

export const ServiceDetails = () => {
    const [detail, setDetail] = useState<IServiceResult>();
    const [loading, setLoading] = useState<boolean>(true);
    const {id} = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!id) return;
        getService(id || '').then((response) => {
            setDetail(response);
        }).catch(() => {
            setDetail(ServiceMock.find(el => el.pk === Number(id)))
        }).finally(() => {
            setLoading(false);
        })
    }, [id]);

    const handleOrder = () => {
        const data = {
            data: {
                status: 'DRAFT',
                service_id: Number(id)
            }
        }
        dispatch(addOrder(data));
    }

    return (
        <>
            <Header/>
            <div className="wrapper">
                <h2>Дэзстанция </h2>

                <BreadCrumbs
                    crumbs={[
                        {label: detail?.title || "Услуга"},
                    ]}
                />

                {loading && (
                    <div className="loadingBg">
                        <Spinner animation="border"/>
                    </div>
                )}

                {detail && (
                    <div className="card card-details">
                        <div className="media">
                            <img src={detail.url || '/net.jpg'} className="image" alt="covid"/>
                        </div>
                        <div className="content">
                            <div className="content-top">
                                <p className="title">{detail.title}</p>
                                <p className="desc">{detail.description}</p>
                            </div>
                            <div className="control">
                                <p className="cost"><b>{detail.cost}</b> ₽</p>
                                <Button onClick={handleOrder} className="more">Заказать</Button>
                            </div>

                        </div>
                    </div>)}
            </div>
        </>
    )
}
