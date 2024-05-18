import {IServiceResult} from "../../modules/serviceApi.ts";

const ServiceCard = ({title, description, cost, pk, url}: IServiceResult) => {
    return (
        <div className="card">
            <div className="media">
                <img src={url || 'net.jpg'} className="image" alt="covid"/>
            </div>
            <div className="content">
                <div className="content-top">
                    <p className="title">{title}</p>
                    <p className="desc">{description}</p>
                </div>
                <div className="control">
                    <p className="cost"><b>{cost}</b> ₽</p>
                    <a href={`/page/${pk}`} className="more">Подробнее</a>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard
