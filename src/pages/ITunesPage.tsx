import {FC, useState} from 'react'
import {Col, Row, Spinner} from 'react-bootstrap'

import {ITunesMusic, getMusicByName} from '../modules/itunesApi.ts'
import MusicCard from '../components/MusicCard/MusicCard.tsx'
import InputField from "../components/InputField/InputField.tsx";
import {useNavigate} from "react-router-dom";
import {BreadCrumbs} from "../components/BreadCrumbs/BreadCrumbs.tsx";
import {ROUTE_LABELS, ROUTES} from "../routes/Routes.tsx";
import {ALBUMS_MOCK} from "../modules/mock.ts"

import './ITunesPage.css'

const ITunesPage: FC = () => {
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [music, setMusic] = useState<ITunesMusic[]>([]);

    const navigate = useNavigate();

    const handleSearch = () => {
        setLoading(true);
        getMusicByName(searchValue)
            .then((response) => {
                setMusic(
                    response.results.filter((item) => item.wrapperType === "track")
                );
                setLoading(false);
            })
            .catch(() => { // В случае ошибки используем mock данные, фильтруем по имени
                setMusic(
                    ALBUMS_MOCK.results.filter((item) =>
                        item.collectionCensoredName
                            .toLocaleLowerCase()
                            .startsWith(searchValue.toLocaleLowerCase())
                    )
                );
                setLoading(false);
            });
    };

    const handleCardClick = (id: number) => {
        // клик на карточку, переход на страницу альбома
        navigate(`${ROUTES.DETAILS}/${id}`);
    };

    return (
        <div className="container">
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.DETAILS}]}/>

            <InputField
                value={searchValue}
                setValue={(value) => setSearchValue(value)}
                loading={loading}
                onSubmit={handleSearch}
            />

            {loading && (
                <div className="loadingBg">
                    <Spinner animation="border"/>
                </div>
            )}
            {!loading &&
                (!music.length ? (
                    <div>
                        <h1>К сожалению, пока ничего не найдено :(</h1>
                    </div>
                ) : (
                    <Row xs={4} md={4} className="g-4">
                        {music.map((item, index) => (
                            <Col key={index}>
                                <MusicCard
                                    imageClickHandler={() => handleCardClick(item.collectionId)}
                                    {...item}
                                />
                            </Col>
                        ))}
                    </Row>
                ))}
        </div>
    );
};

export default ITunesPage;
