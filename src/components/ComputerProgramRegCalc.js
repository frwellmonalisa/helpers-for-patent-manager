import React, { Fragment, useState } from "react";
import { Form } from "react-bootstrap";
import CalcHeading from "../utilites/CalcHeading";
import ResultOfCalculation from "../utilites/ResultOfCalculation";

// Калькулятор для регистрации ЭВМ
const ComputerProgramRegCalc = () => {
    // Константы
    const basicCost = 25000; // Базовая стоимость услуги по дефолту
    const yurCost = 4500; // Доп. стоимость для юридических лиц
    const fizCost = 3500; // Доп. стоимость для физических лиц

    const [baseCost, setBaseCost] = useState(basicCost); // Стейт для базовой стоимости
    const [additionalCost, setAdditionalCost] = useState(0); // Стейт дополнительной стоимости

    // Возвращаем дополнительную стоимость в зависимости от типа клиента
    const getAdditionalCostFromClientType = type => {
        switch (type) {
            case "fiz":
                return fizCost;
            case "yur":
                return yurCost;
            default:
                return 0;
        }
    };

    return (
        <Fragment>
            {/* Небольшая стилизация (согласно документации react-bootstrap) */}
            <style type="text/css">
                {`
                    .form-check-label,
                    .form-check-input {
                       cursor:pointer;
                    }
                `}
            </style>
            <div className="jumbotron">
                <CalcHeading name="Программа ЭВМ" />
                <Form>
                    <Form.Group>
                        <Form.Group controlId="programRegisterServiceCost">
                            <Form.Label>Стоимость услуги</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Введите стоимость услуги"
                                value={baseCost}
                                onChange={e =>
                                    setBaseCost(Number(e.target.value))
                                }
                            />
                        </Form.Group>
                        <Form.Check
                            type="radio"
                            label="Для юридических лиц (+4500)"
                            name="clientType"
                            value="yur"
                            id="program-yur"
                            onChange={e =>
                                setAdditionalCost(
                                    getAdditionalCostFromClientType(
                                        e.target.value
                                    )
                                )
                            }
                        />
                        <Form.Check
                            type="radio"
                            label="Для физических лиц (+3500)"
                            name="clientType"
                            value="fiz"
                            id="program-fiz"
                            onChange={e =>
                                setAdditionalCost(
                                    getAdditionalCostFromClientType(
                                        e.target.value
                                    )
                                )
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <ResultOfCalculation
                            result={baseCost + additionalCost}
                        />
                    </Form.Group>
                </Form>
            </div>
        </Fragment>
    );
};

export default ComputerProgramRegCalc;
