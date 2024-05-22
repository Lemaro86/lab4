import Form from 'react-bootstrap/Form';
import './Login.css'
import Button from 'react-bootstrap/Button';
import Header from "../Header/Header.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {login} from "../../api/getData.ts";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {useUserData} from "../../store/data/userSlice.ts";

const Login = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userInfo = useAppSelector(useUserData);
    const navigate = useNavigate();

    const submit = () => {
        const data = {email, password};
        dispatch(login(data));
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    useEffect(() => {
        if (userInfo.isAuthorized) {
            navigate('/');
        }
    }, [userInfo.isAuthorized]);

    return (
        <>
            <Header/>
            <div className="wrapper">
                <Form className='loginWrapper'>
                    <h3>Вход в систему</h3>
                    <br/>
                    <Form.Group className="mb-3" controlId="form.email">
                        <Form.Label>Введите email</Form.Label>
                        <Form.Control type="email" placeholder="email@mail.ru" onChange={handleEmail}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="form.password">
                        <Form.Label>Введите пароль</Form.Label>
                        <Form.Control type="password" placeholder='******' onChange={handlePassword}/>
                    </Form.Group>
                    <Button variant="primary" onClick={submit}>Войти</Button>
                    <br/>
                    <br/>
                    <br/>
                    <h4>Если все плохо, то вот есть
                        <br/>
                        <br/>
                        <Link to="/registration">Регистрация</Link></h4>
                </Form>
            </div>
        </>

    );
}

export default Login;
