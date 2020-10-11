import React, { useState, useEffect, Fragment } from "react";
import ReactDadataBox from "react-dadata-box";
import { Card } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

const OrgSearch = () => {
    const [suggestion, setSuggestion] = useState(null);

    return (
        <div className="jumbotron">
            <label htmlFor="react-dadata">ИП, ИНН или организация</label>
            <ReactDadataBox
                id="react-dadata"
                token="6e004021e9b797bf936f09476945461720fbc68f"
                type="party"
                onChange={suggestion => setSuggestion(suggestion)}
                placeholder="Введите ИП, Введите название в свободной форме, адрес, ИНН или ОГРН"
            />
            {suggestion && <AttributesList data={suggestion.data} />}
        </div>
    );
};

const AttributesList = ({ data }) => {
    const [copied, setCopied] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        setText(document.querySelector(".result-content").innerText);
    }, []);

    if (Object.keys(data).length === 0) return null;
    console.log("data :", data);
    const { short_with_opf, full_with_opf } = data.name;
    const { unrestricted_value: full_address } = data.address;
    const { kpp, inn, ogrn } = data;

    return (
        <Card className="my-4">
            <Card.Header>Карточка организации {full_with_opf}</Card.Header>
            <Card.Body>
                <ul className="result-content">
                    <li>Наименование - {short_with_opf}</li>
                    <li>Полное наименование - {full_with_opf}</li>
                    <li>Полный адрес - {full_address}</li>
                    <li>ОГРН - {ogrn}</li>
                    <li>ИНН - {inn}</li>
                    <li>КПП - {kpp}</li>
                    {data.management && (
                        <Fragment>
                            <li>ФИО руководителя - {data.management.name}</li>
                            <li>
                                Должность руководителя - {data.management.post}
                            </li>
                        </Fragment>
                    )}
                </ul>
            </Card.Body>
            <Card.Footer>
                <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
                    <button className="btn btn-primary">
                        Скопировать текст
                    </button>
                </CopyToClipboard>
            </Card.Footer>
        </Card>
    );
};

export default OrgSearch;
