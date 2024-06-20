import {Service} from "../../api/Api.ts";

export const ServiceTable = ({pk, title, description, cost, url}: Service) => {
    console.log(123, pk, title, description, cost, url);

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
                <button className='remove-btn'>удалить</button>
            </td>
        </>
    )
}
