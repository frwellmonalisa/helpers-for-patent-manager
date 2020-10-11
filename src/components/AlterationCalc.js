import React, { useState } from "react";
import CalcHeading from "../utilites/CalcHeading";
import { Form, Row, Col } from "react-bootstrap";
import ResultOfCalculation from "../utilites/ResultOfCalculation";

// Калькулятор для внесения изменений
const AlterationCalc = () => {
    // Константы
    const basicCost = 5000; // Базовая стоимость услуги по дефолту

    const [requestAlterationBaseCost, setRequestAlterationBaseCost] = useState(
        basicCost
    ); // Стейт для базовой стоимости услуги по внесению изменений в заявках
    const [requestAlterationCount, setRequestAlterationCount] = useState(1); // Стейт для количества изменений в заявках

    const [
        trademarkAlterationBaseCost,
        setTrademarkAlterationBaseCost
    ] = useState(basicCost); // Стейт для базовой стоимости услуги по внесению изменений в ТЗ
    const [trademarkAlterationCount, setTrademarkAlterationCount] = useState(1); // Стейт для количества изменений в ТЗ

    // Считаем стоимость услуги по изменениям в товарные знаках
    const calculateTrademarkAlteration = () => {
        const perOneAlteration = 2800;
        const additionalFee = 2000;

        return (
            trademarkAlterationBaseCost +
            perOneAlteration * trademarkAlterationCount +
            additionalFee
        );
    };

    return (
        <div className="jumbotron mb-4">
            <CalcHeading name="Внесение изменений" />
            <Row>
                <Col sm="6">
                    <h4>Изменения в заявках</h4>
                    <Form.Group controlId="requestAlterationServiceCost">
                        <Form.Label>Стоимость услуги</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введите стоимость услуги"
                            value={requestAlterationBaseCost}
                            onChange={e =>
                                setRequestAlterationBaseCost(
                                    Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="requestAlterationCount">
                        <Form.Label>Количество заявок</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            placeholder="Введите количество"
                            value={requestAlterationCount}
                            onChange={e =>
                                setRequestAlterationCount(
                                    Number(e.target.value)
                                )
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <ResultOfCalculation
                            result={
                                requestAlterationBaseCost *
                                requestAlterationCount
                            }
                        />
                    </Form.Group>
                </Col>
                <Col sm="6">
                    <Form>
                        <h4>Изменения в ТЗ</h4>
                        <Form.Group controlId="trademarkAlterationServiceCost">
                            <Form.Label>Стоимость услуги</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Введите стоимость услуги"
                                value={trademarkAlterationBaseCost}
                                onChange={e =>
                                    setTrademarkAlterationBaseCost(
                                        Number(e.target.value)
                                    )
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="trademarkAlterationCount">
                            <Form.Label>Количество знаков</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                placeholder="Введите количество"
                                value={trademarkAlterationCount}
                                onChange={e =>
                                    setTrademarkAlterationCount(
                                        Number(e.target.value)
                                    )
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <ResultOfCalculation
                                result={calculateTrademarkAlteration()}
                            />
                        </Form.Group>
                        <Form.Group>
                            <small className="text-muted">
                                Рассчет идет по принципу: базовая стоимость
                                услуги + (2800 * количество знаков) + 2000
                            </small>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default AlterationCalc;
