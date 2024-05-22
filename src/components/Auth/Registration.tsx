import Form from 'react-bootstrap/Form';
import './Login.css'
import Button from 'react-bootstrap/Button';
import Header from "../Header/Header.tsx";

const Registration = () => {
    return (
        <>
            <Header/>
            <div className="wrapper">
                <Form className='loginWrapper'>
                    <h3>Регистрация</h3>
                    <br/>
                    <Form.Group className="mb-3" controlId="form.email">
                        <Form.Label>Введите email</Form.Label>
                        <Form.Control type="email" placeholder="email@mail.ru"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="form.password">
                        <Form.Label>Введите пароль</Form.Label>
                        <Form.Control type="password" placeholder='******'/>
                    </Form.Group>
                    <Button variant="primary">Войти</Button>
                </Form>
            </div>
        </>

    );
}

export default Registration;
