import React, { useState, useEffect, useCallback } from "react";
import { Form } from "react-bootstrap";

const FIPSRegisters = () => {
    const [zayav, setZayav] = useState("");
    const [resultLink, setResultLink] = useState("");
    const [register, setRegister] = useState("");

    const registers = {
        izobr:
            "https://www.fips.ru/registers-doc-view/fips_servlet?DB=RUPAT&rn=4244&DocNumber=",
        izobrPatent:
            "https://www.fips.ru/registers-doc-view/fips_servlet?DB=RUPATAP&rn=813&DocNumber=",
        polezModel:
            "https://www.fips.ru/registers-doc-view/fips_servlet?DB=RUPM&rn=6113&DocNumber=",
        zayavPatentModel:
            "https://www.fips.ru/registers-doc-view/fips_servlet?DB=RUPMAP&rn=6036&DocNumber=",
        promyshObraz:
            "https://www.fips.ru/registers-doc-view/fips_servlet?DB=RUDE&DocNumber=",
        zayavPromyshObraz:
            "https://www.fips.ru/registers-doc-view/fips_servlet?DB=RUDEAP&rn=9547&DocNumber=",
        tovZnak:
            "https://www.fips.ru/registers-doc-view/fips_servlet?DB=RUTM&rn=9557&DocNumber=",
        zayavTovZnak:
            "https://www.fips.ru/registers-doc-view/fips_servlet?DB=RUTMAP&rn=8782&DocNumber=",
        tovZnakInternational:
            "https://www.fips.ru/registers-doc-view/fips_servlet?DB=WOTM&rn=1552&DocNumber=",
        NMPT:
            "https://www.fips.ru/registers-doc-view/fips_servlet?DB=RUGP&DocNumber=",
        zayavNMPT:
            "https://www.fips.ru/registers-doc-view/fips_servlet?DB=RUGPAP&rn=4612&DocNumber=",
        EVM:
            "https://www.fips.ru/registers-doc-view/fips_servlet?DB=EVM&rn=8816&DocNumber=",
        database:
            "https://www.fips.ru/registers-doc-view/fips_servlet?DB=DB&rn=6871&DocNumber=",
        gosZayav:
            "https://www.fips.ru/registers-doc-view/fips_servlet?DB=PRAVO&rn=1491&DocNumber="
    };

    const returnLink = useCallback(
        type => {
            return `${registers[type]}${zayav}&TypeFile=html`;
        },
        [registers, zayav]
    );

    useEffect(() => {
        setResultLink(returnLink(register));
    }, [zayav, register, returnLink]);

    return (
        <div className="jumbotron">
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    window.location = resultLink;
                }}
            >
                <Form.Group controlId="register select">
                    <Form.Label>Выбрать реестр</Form.Label>
                    <Form.Control
                        as="select"
                        value={register}
                        onChange={e => {
                            setRegister(e.target.value);
                        }}
                    >
                        <option value="" disabled>
                            Выбрать реестр
                        </option>
                        <optgroup label="Изобретения">
                            <option value="izobr">Реестр изобретений</option>
                            <option value="izobrPatent">
                                Реестр заявок на выдачу патента на изобретение
                            </option>
                        </optgroup>
                        <optgroup label="Полезные модели">
                            <option value="polezModel">
                                Реестр полезных моделей
                            </option>
                            <option value="zayavPatentModel">
                                Реестр заявок на выдачу патента на полезную
                                модель
                            </option>
                        </optgroup>
                        <optgroup label="Промышленные образцы">
                            <option value="promyshObraz">
                                Реестр промышленных образцов
                            </option>
                            <option value="zayavPromyshObraz">
                                Реестр заявок на выдачу патента на промышленный
                                образец
                            </option>
                        </optgroup>
                        <optgroup label="Товарные знаки">
                            <option value="tovZnak">
                                Реестр товарных знаков и знаков обслуживания
                            </option>
                            <option value="zayavTovZnak">
                                Реестр заявок на регистрацию товарного знака и
                                знака обслуживания
                            </option>
                            <option value="tovZnakInternational">
                                Реестр товарных знаков по международным
                                регистрациям, по которым имеются сведения о
                                зарегистрированных на территории Российской
                                Федерации распоряжениях исключительным правом по
                                договорам о предоставлении права использования
                            </option>
                        </optgroup>
                        <optgroup label="Программы для ЭВМ, базы данных">
                            <option value="EVM">Реестр программ для ЭВМ</option>
                            <option value="database">Реестр баз данных</option>
                        </optgroup>
                        <option value="gosZayav">
                            Реестр заявлений о государственной регистрации
                            распоряжения исключительным правом по договору и
                            заявлений о государственной регистрации перехода
                            права без договора
                        </option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="zayav enter">
                    <Form.Label>Номер заявки:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введите номер заявки"
                        value={zayav}
                        onChange={e => {
                            setZayav(e.target.value);
                        }}
                    />
                </Form.Group>
            </Form>
            <div className="row">
                <p>
                    Результирующая ссылка:{" "}
                    <a
                        href={resultLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        перейти
                    </a>
                </p>
            </div>
        </div>
    );
};

export default FIPSRegisters;
