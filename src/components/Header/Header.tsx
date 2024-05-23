import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {useUserData} from "../../store/data/userSlice.ts";
import {logout} from "../../api/getData.ts";

const Header = () => {
    const data = useAppSelector(useUserData);
    const dispatch = useAppDispatch();

    const handlerLogout = () => {
        dispatch(logout());
    }

    return (
        <div className="header">
            <h1><Link to="/">Станция дэзинфекции</Link></h1>
            <ul>
                <li><Link to="/">Услуги</Link></li>
                <li><Link to="/orders">Заявки</Link></li>
                <li>
                    {data.isAuthorized ? <Link to='/' onClick={handlerLogout}>Выйти</Link> : <Link to="/login">Войти</Link>}
                </li>
            </ul>
        </div>
    )
}

export default Header
