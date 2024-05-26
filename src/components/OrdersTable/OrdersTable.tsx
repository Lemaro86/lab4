import {Order} from "../../api/Api.ts";
import {format} from "date-fns";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../store/store.ts";
import {useUserData} from "../../store/data/userSlice.ts";

import './OrdersTables.css'

export const getStatus = (status: 'DRAFT' | 'activated' | 'declined' | 'completed') => {
    const statuses = {
        activated: 'Активна',
        declined: 'Отклонена',
        completed: 'Завершена',
        DRAFT: 'Черновик'
    }

    return statuses[status]
}

export const OrdersTable = (data: Order) => {
    const userInfo = useAppSelector(useUserData);

    return (
        <>
            <td>{data.created && format(new Date(data.created), 'dd.MM.yyyy HH:mm')}</td>
            <td className={data.status === 'activated' || data.status === 'completed' ? 'green' : 'simple'}>{getStatus(data.status as unknown as any)}</td>
            <td>{data.creator_id}</td>
            <td>{data.moderator_id}</td>
            <td>{data.activated && format(new Date(data.activated), 'dd.MM.yyyy HH:mm')}</td>
            <td>{data.completed && format(new Date(data.completed), 'dd.MM.yyyy HH:mm')}</td>
            <td>{(userInfo.isStaff || userInfo.isSuperuser) ? <Link to={`/order/${data.pk}`}>Открыть</Link> : '-'}</td>
        </>
    )
}
