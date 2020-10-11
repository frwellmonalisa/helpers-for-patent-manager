import React, { useState, Fragment } from "react";
import { Form, Row, Col } from "react-bootstrap";
import ResultOfCalculation from "../utilites/ResultOfCalculation";

/**
 * Калькулятор для
 * формальной экспертизы (formalExpertise)
 * экспертизы по существу (substantiveExpertise)
 * пошлины для регистрации (registrationFee)
 */
const ExpertiseCalc = () => {
    // Объекты данных с форм
    const [formalExpertise, setFormalExperise] = useState({
        classesCount: 1,
        isElectronic: false,
        hasComission: false,
        comissionPercent: 3
    });

    const [substantiveExpertise, setSubstantiveExperise] = useState({
        classesCount: 1,
        isElectronic: false,
        hasComission: false,
        comissionPercent: 3
    });

    const [registrationFee, setRegistrationFee] = useState({
        classesCount: 1,
        isElectronic: false,
        hasComission: false,
        comissionPercent: 3
    });

    // Обработчик для свойств, имеющих числовое значение (кол-во классов, комиссия банка)
    // Type - тип объекта (formal, substantive, registration)
    // Property - свойство (classesCount, comissionPercent)
    const handleValueChange = (type, property, value) => {
        switch (type) {
            case "formal":
                setFormalExperise({ ...formalExpertise, [property]: value });
                break;
            case "substantive":
                setSubstantiveExperise({
                    ...substantiveExpertise,
                    [property]: value
                });
                break;
            case "registration":
                setRegistrationFee({ ...registrationFee, [property]: value });
                break;
            default:
                break;
        }
    };

    // Обработчик для свойств, имеющих булево значение (электронная ли заявка, есть ли комиссия банка)
    // Type - тип объекта (formal, substantive, registration)
    // Property - свойство (isElectronic, hasComission)
    const handleBooleanPropertyChange = (type, property) => {
        switch (type) {
            case "formal":
                setFormalExperise({
                    ...formalExpertise,
                    [property]: !formalExpertise[property]
                });
                break;
            case "substantive":
                setSubstantiveExperise({
                    ...substantiveExpertise,
                    [property]: !substantiveExpertise[property]
                });
                break;
            case "registration":
                setRegistrationFee({
                    ...registrationFee,
                    [property]: !registrationFee[property]
                });
                break;
            default:
                break;
        }
    };

    // Помощники для подсчета процентов
    const calcMinusPercent = (value, percent) => {
        return value - (value / 100) * percent;
    };

    const calcPlusPercent = (value, percent) => {
        return value + (value / 100) * percent;
    };

    const calculateResult = type => {
        let result = 0;
        switch (type) {
            case "formal":
                // Первичный подсчет
                if (formalExpertise.classesCount <= 5) {
                    result = 3500;
                } else {
                    result = 3500 + (formalExpertise.classesCount - 5) * 1000;
                }

                // С учетом электронной подачи
                if (formalExpertise.isElectronic) {
                    result = calcMinusPercent(result, 30);
                }

                // Комиссия банка
                if (formalExpertise.hasComission) {
                    result = calcPlusPercent(
                        result,
                        formalExpertise.comissionPercent
                    );
                }
                return result;
            case "substantive":
                if (substantiveExpertise.classesCount === 1) {
                    result = 11500;
                } else {
                    result =
                        11500 + (substantiveExpertise.classesCount - 1) * 2500;
                }

                // С учетом электронной подачи
                if (substantiveExpertise.isElectronic) {
                    result = calcMinusPercent(result, 30);
                }

                // Комиссия банка
                if (substantiveExpertise.hasComission) {
                    result = calcPlusPercent(
                        result,
                        substantiveExpertise.comissionPercent
                    );
                }

                return result;
            case "registration":
                // Первичный подсчет
                if (registrationFee.classesCount <= 5) {
                    result = 18000;
                } else {
                    result = 18000 + (registrationFee.classesCount - 5) * 1000;
                }

                // С учетом электронной подачи
                if (registrationFee.isElectronic) {
                    result = calcMinusPercent(result, 30);
                }

                // Комиссия банка
                if (registrationFee.hasComission) {
                    result = calcPlusPercent(
                        result,
                        registrationFee.comissionPercent
                    );
                }
                return result;
            default:
                break;
        }
    };

    return (
        <Fragment>
            <style type="text/css">
                {`
                    .form-check-label,
                    .form-check-input {
                       cursor:pointer;
                    }
                `}
            </style>
            <div className="jumbotron">
                <Row>
                    <Col md="4">
                        <h4 className="text-center">Формальная экспертиза</h4>
                        <hr />
                        <Form>
                            <Form.Group controlId="formalClassesCount">
                                <Form.Label>Количество классов</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    placeholder="Введите количество"
                                    value={formalExpertise.classesCount}
                                    onChange={e =>
                                        handleValueChange(
                                            "formal",
                                            "classesCount",
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </Form.Group>
                            <Form.Group
                                controlId="formalElectronic"
                                style={{ cursor: "pointer" }}
                            >
                                <Form.Check
                                    type="checkbox"
                                    label="Заявка в электронном виде"
                                    value={formalExpertise.isElectronic}
                                    onChange={e =>
                                        handleBooleanPropertyChange(
                                            "formal",
                                            "isElectronic"
                                        )
                                    }
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="formalHasComission"
                                    label="Учитывать комиссию банка"
                                    value={formalExpertise.hasComission}
                                    onChange={e =>
                                        handleBooleanPropertyChange(
                                            "formal",
                                            "hasComission"
                                        )
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="formalComissionPercent">
                                <Form.Label>Комиссия банка</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    placeholder="Введите комиссию"
                                    value={formalExpertise.comissionPercent}
                                    onChange={e =>
                                        handleValueChange(
                                            "formal",
                                            "comissionPercent",
                                            Number(e.target.value)
                                        )
                                    }
                                    disabled={!formalExpertise.hasComission}
                                />
                            </Form.Group>
                            <Form.Group>
                                <ResultOfCalculation
                                    result={calculateResult("formal")}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md="4">
                        <h4 className="text-center">Экспертиза по существу</h4>
                        <hr />
                        <Form>
                            <Form.Group controlId="substantiveClassesCount">
                                <Form.Label>Количество классов</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    placeholder="Введите количество"
                                    value={substantiveExpertise.classesCount}
                                    onChange={e =>
                                        handleValueChange(
                                            "substantive",
                                            "classesCount",
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="substantiveElectronic">
                                <Form.Check
                                    type="checkbox"
                                    label="Заявка в электронном виде"
                                    value={substantiveExpertise.isElectronic}
                                    onChange={e =>
                                        handleBooleanPropertyChange(
                                            "substantive",
                                            "isElectronic"
                                        )
                                    }
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="substantiveHasComission"
                                    label="Учитывать комиссию банка"
                                    value={substantiveExpertise.hasComission}
                                    onChange={e =>
                                        handleBooleanPropertyChange(
                                            "substantive",
                                            "hasComission"
                                        )
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="substantiveComissionPercent">
                                <Form.Label>Комиссия банка</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    placeholder="Введите комиссию"
                                    value={
                                        substantiveExpertise.comissionPercent
                                    }
                                    onChange={e =>
                                        handleValueChange(
                                            "substantive",
                                            "comissionPercent",
                                            Number(e.target.value)
                                        )
                                    }
                                    disabled={
                                        !substantiveExpertise.hasComission
                                    }
                                />
                            </Form.Group>
                            <Form.Group>
                                <ResultOfCalculation
                                    result={calculateResult("substantive")}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md="4">
                        <h4 className="text-center">Пошлина за регистрацию</h4>
                        <hr />
                        <Form>
                            <Form.Group controlId="registrationClassesCount">
                                <Form.Label>Количество классов</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    placeholder="Введите количество"
                                    value={registrationFee.classesCount}
                                    onChange={e =>
                                        handleValueChange(
                                            "registration",
                                            "classesCount",
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="registrationElectronic">
                                <Form.Check
                                    type="checkbox"
                                    label="Заявка в электронном виде"
                                    value={registrationFee.isElectronic}
                                    onChange={e =>
                                        handleBooleanPropertyChange(
                                            "registration",
                                            "isElectronic"
                                        )
                                    }
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="registrationHasComission"
                                    label="Учитывать комиссию банка"
                                    value={registrationFee.hasComission}
                                    onChange={e =>
                                        handleBooleanPropertyChange(
                                            "registration",
                                            "hasComission"
                                        )
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="registrationComissionPercent">
                                <Form.Label>Комиссия банка</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    placeholder="Введите комиссию"
                                    value={registrationFee.comissionPercent}
                                    onChange={e =>
                                        handleValueChange(
                                            "registration",
                                            "comissionPercent",
                                            Number(e.target.value)
                                        )
                                    }
                                    disabled={!registrationFee.hasComission}
                                />
                            </Form.Group>
                            <Form.Group>
                                <ResultOfCalculation
                                    result={calculateResult("registration")}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
            <p className="h2">
                Итого (ФС + ЭС):{" "}
                {calculateResult("formal") + calculateResult("substantive")}
            </p>
        </Fragment>
    );
};

export default ExpertiseCalc;
