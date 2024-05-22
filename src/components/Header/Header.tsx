import {Link} from "react-router-dom";
import {useAppSelector} from "../../store/store.ts";
import {useUserData} from "../../store/data/userSlice.ts";

const Header = () => {
    const data = useAppSelector(useUserData);

    return (
        <div className="header">
            <h1><Link to="/">Станция дэзинфекции</Link></h1>
            <ul>
                <li><Link to="/">Услуги</Link></li>
                <li><Link to="/orders">Заявки</Link></li>
                <li>
                    {data.isAuthorized ? <Link to="/login">Выйти</Link> : <Link to="/login">Войти</Link>}
                </li>
            </ul>
        </div>
    )
}

export default Header
