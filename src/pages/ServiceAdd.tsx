import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link, useNavigate,} from "react-router-dom";
import {useState} from "react";
import Header from "../components/Header/Header.tsx";
import {addService} from "../api/getData.ts";
import {useAppDispatch} from "../store/store.ts";

import './ServicePage.css'

export const ServiceAdd = () => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState('');
    const [pk, setPk] = useState('');
    const [desc, setDesc] = useState('');
    const [cost, setCost] = useState('');
    const [pic, setPic] = useState<File>();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const submit = () => {
        dispatch(addService({pk: Number(pk), title, description: desc, cost, pic}))
            .unwrap()
            .then(() => navigate('/service'))
            .catch((err) => {
                setError(`Ошибка запроса: ${err.message}`);
            });
        ;
    }

    const handlePK = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPk(e.target.value);
    }
    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    const handleDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(e.target.value);
    }
    const handleCost = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCost(e.target.value);
    }

    const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        const imagedata = e?.target?.files?.[0];
        imagedata && formData.append('inputname', imagedata);
        setPic(imagedata);
    }

    return (
        <>
            <Header/>
            <div className="wrapper">
                <Form className='loginWrapper'>
                    <h3>Добавление услуги</h3>
                    <br/>
                    <Form.Group className="mb-3" controlId="form.pk">
                        <Form.Label>Добавьте айди</Form.Label>
                        <Form.Control type="text" placeholder="PK" onChange={handlePK}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="form.title">
                        <Form.Label>Введите название</Form.Label>
                        <Form.Control type="text" placeholder="Название" onChange={handleTitle}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="form.desc">
                        <Form.Label>Введите описание</Form.Label>
                        <Form.Control type="text" placeholder="Описание" onChange={handleDesc}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="form.cost">
                        <Form.Label>Введите цену</Form.Label>
                        <Form.Control type="text" placeholder="5000" onChange={handleCost}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="form.pic">
                        <Form.Label>Добавьте изображение</Form.Label>
                        <Form.Control type="file" onChange={handleImg}/>
                    </Form.Group>

                    {error !== '' && (
                        <div className='error-server'>
                            <div>{error}</div>
                            <div>Если вы не авторизованы, попробуйте <Link to={'/login'}>войти</Link></div>
                        </div>
                    )}

                    <Button className='add-btn-submit' variant="primary" onClick={submit}>Добавить</Button>
                    <h4>
                        <Link to="/service">К списку услуг</Link>
                    </h4>
                </Form>
            </div>
        </>

    );
}
