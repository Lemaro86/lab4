import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useAppDispatch, useAppSelector} from "../store/store.ts";
import {useEffect, useState} from "react";
import {getOrder, getUserById} from "../api/getData.ts";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../components/Header/Header.tsx";
import {BreadCrumbs} from "../components/BreadCrumbs/BreadCrumbs.tsx";
import {leaveOrder, useData} from "../store/data/orderSlice.ts";
import {format} from "date-fns";
import {getStatus} from "../components/OrdersTable/OrdersTable.tsx";
import {User} from "../api/Api.ts";
import './Pages.css'
import {useUserData} from "../store/data/userSlice.ts";

export const OrderDetail = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const {item} = useAppSelector(useData);
    const userInfo = useAppSelector(useUserData);
    const [creator, setCreator] = useState<User>();
    const [moderator, setModerator] = useState<User>();
    const navigate = useNavigate();

    const getUser = async () => {
        dispatch(getUserById(item?.creator_id || 0)).unwrap().then((data) => {
            setCreator(data);
        });
    }

    const getModerator = async () => {
        dispatch(getUserById(item?.moderator_id || 0)).unwrap().then((data) => {
            setModerator(data);
        });
    }

    useEffect(() => {
        dispatch(getOrder(id as unknown as any))

        return () => {
            dispatch(leaveOrder());
        }
    }, []);

    useEffect(() => {
        if (item?.creator_id) {
            getUser();
        }
        if (item?.moderator_id) {
            getModerator();
        }
    }, [item]);

    useEffect(() => {
        if (!userInfo?.isAuthorized){
            navigate('/login');
        }
    }, [userInfo]);

    return (
        <>
            <Header/>
            <div className="wrapper">
                <BreadCrumbs crumbs={[{label: 'Список заявок', path: '/orders'}, {label: "Заявка"}]}/>
                <h1 className='head-1'>Страница заявки</h1>
                {item && (
                    <Card style={{width: '25rem'}}>
                        <Card.Body>
                            <Card.Title className='status-style'>Статус
                                заявки: {getStatus(item.status as unknown as any)}</Card.Title>
                            {(userInfo.isStaff || userInfo.isSuperuser) && creator && <Card.Text>Создатель: {creator?.email}</Card.Text>}
                            {(userInfo.isStaff || userInfo.isSuperuser) && moderator && <Card.Text>Модератор: {moderator?.email}</Card.Text>}
                            {item.created && (
                                <Card.Text>
                                    Создана: {format(new Date(item.created), 'dd.MM.yyyy HH:mm')}
                                </Card.Text>
                            )}
                            {(userInfo.isStaff || userInfo.isSuperuser) && item.activated && (
                                <Card.Text>
                                    Активирована: {format(new Date(item.activated), 'dd.MM.yyyy HH:mm')}
                                </Card.Text>
                            )}
                            {item.completed && (
                                <Card.Text>
                                    Завершена: {format(new Date(item.completed), 'dd.MM.yyyy HH:mm')}
                                </Card.Text>
                            )}
                            {(userInfo.isStaff || userInfo.isSuperuser) && (
                                <div className='control-panel'>
                                    {item.status === "created" && <Button variant="primary" className='del-button'>Активировать</Button>}
                                    {item.status === "activated" && <Button variant="success" className='del-button'>Завершить</Button>}
                                    {item.status === "activated" || item.status === "created" &&
                                        <Button variant="danger" className='del-button'>Отклонить</Button>}
                                    <Button variant="danger" className='del-button'>Удалить</Button>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                )}
            </div>
        </>
    )
};
