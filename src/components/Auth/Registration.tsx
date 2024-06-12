import Form from 'react-bootstrap/Form';
import './Login.css'
import Button from 'react-bootstrap/Button';
import Header from "../Header/Header.tsx";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {reg} from "../../api/getData.ts";
import {useEffect, useState} from "react";
import {useUserData} from "../../store/data/userSlice.ts";
import {useNavigate} from "react-router-dom";

const Registration = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [is_superuser, setIs_superuser] = useState(false);
    const [is_staff, setIs_staff] = useState(false);
    const userInfo = useAppSelector(useUserData);
    const navigate = useNavigate();

    const handleSubmit = () => {
        const data = {email, password, is_staff: is_staff, is_superuser: is_superuser}
        dispatch(reg(data));
    }

    const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIs_superuser(e.target.id === 'super');
        setIs_staff(e.target.id === 'staff');
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    useEffect(() => {
        if (userInfo.isRegistered) {
            navigate('/login')
        }
    }, [userInfo.isRegistered]);

    return (
        <>
            <Header/>
            <div className="wrapper">
                <Form className='loginWrapper'>
                    <h3>Регистрация</h3>
                    <br/>
                    <Form.Group className="mb-3" controlId="form.email">
                        <Form.Label>Введите email</Form.Label>
                        <Form.Control type="email" placeholder="email@mail.ru" onChange={handleEmail}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="form.password">
                        <Form.Label>Введите пароль</Form.Label>
                        <Form.Control type="password" placeholder='******' onChange={handlePassword}/>
                    </Form.Group>
                    <div className="mb-3">
                        <Form.Check
                            inline
                            label="Я модератор"
                            name="group"
                            type='radio'
                            id='staff'
                            onChange={handleRadio}
                        />
                    </div>
                    <div className="mb-3">
                        <Form.Check
                            inline
                            label="Я администратор"
                            name="group"
                            type='radio'
                            id='super'
                            onChange={handleRadio}
                        />
                    </div>
                    <Button variant="primary" onClick={handleSubmit}>Зарегистрироваться</Button>
                </Form>
            </div>
        </>

    );
}

export default Registration;
