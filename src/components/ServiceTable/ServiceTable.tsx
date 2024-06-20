import {Service} from "../../api/Api.ts";
import {getServiceList, removeService} from "../../api/getData.ts";
import {useAppDispatch} from "../../store/store.ts";

export const ServiceTable = ({pk, title, description, cost}: Service) => {
    const dispatch = useAppDispatch();

    const deleteService = () => {
        dispatch(removeService({id: String(pk)}))
            .unwrap()
            .then(() => dispatch(getServiceList()))
    }

    return (
        <>
            <td>{pk}</td>
            <td>{title}</td>
            <td>
                <div className='desc-short'>{description}</div>
            </td>
            <td>{cost}</td>
            <td>
                <button className='edit-btn'>редактировать</button>
            </td>
            <td>
                <button className='remove-btn' onClick={deleteService}>удалить</button>
            </td>
        </>
    )
}
