import {IServiceResult} from "../../modules/serviceApi.ts";
import {Link} from "react-router-dom";
import {IMAGE_DEFAULT} from "../../constants/common.ts";

const ServiceCard = ({title, description, cost, pk, url}: IServiceResult) => {
    return (
        <div className="card">
            <div className="media">
                <img src={url || IMAGE_DEFAULT} className="image" alt="covid"/>
            </div>
            <div className="content">
                <div className="content-top">
                    <p className="title">{title}</p>
                    <p className="desc">{description}</p>
                </div>
                <div className="control">
                    <p className="cost"><b>{cost}</b> ₽</p>
                    <Link to={`/page/${pk}`} className="more">Подробнее</Link>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard
