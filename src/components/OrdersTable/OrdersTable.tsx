import {Order} from "../../api/Api.ts";
import {format} from "date-fns";
import './OrdersTables.css'
import {Link} from "react-router-dom";

export const OrdersTable = (data: Order) => {
    const getStatus = (status: 'created' | 'activated' | 'declined' | 'completed') => {
        const statuses = {
            created: 'Создана',
            activated: 'Активна',
            declined: 'Отклонена',
            completed: 'Завершена'
        }

        return statuses[status]
    }
    return (
        <>
            <td>{data.created && format(new Date(data.created), 'dd.MM.yyyy HH:mm')}</td>
            <td className={data.status === 'activated' || data.status === 'completed' ? 'green' : 'simple'}>{getStatus(data.status as unknown as any)}</td>
            <td>{data.creator_id}</td>
            <td>{data.moderator_id}</td>
            <td>{data.activated && format(new Date(data.activated), 'dd.MM.yyyy HH:mm')}</td>
            <td>{data.completed && format(new Date(data.completed), 'dd.MM.yyyy HH:mm')}</td>
            <td><Link to={`/order/${data.order_id}`}>Заявка</Link></td>
        </>
    )
}
