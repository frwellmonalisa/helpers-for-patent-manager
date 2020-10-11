import React, { useState } from "react";
import { Form } from "react-bootstrap";
import CalcHeading from "../utilites/CalcHeading";
import ResultOfCalculation from "../utilites/ResultOfCalculation";

// Калькулятор регистрации договора отчуждения, лицензиарного и сублицензиарного договора
const AlienationContractCalc = () => {
    // Константы
    const basicCost = 25000; // Базовая стоимость услуги по дефолту
    const trademarkBasicCost = 13500; // Стоимость за один товарный знак
    const extraTrademarkCost = 11500; // Стоимость за каждый товарный знак выше одного

    const [baseCost, setBaseCost] = useState(basicCost);
    const [trademarkCount, setTrademarkCount] = useState(1);
    const [isCountBaseCost, setIsCountBaseCost] = useState(true); // Boolean-значение, отвечающее за то, нужно ли складывать стоимость услуги с пошлиной

    const calculateTotalServiceCost = (trademarkCount = 0) => {
        if (trademarkCount === 0) return 0;

        const fee =
            trademarkCount === 1
                ? trademarkBasicCost
                : trademarkBasicCost +
                  (trademarkCount - 1) * extraTrademarkCost;

        /**
         * Рассчет идет по принципу:
         * стоимость пошлины - если ТЗ один, то +13500; если ТЗ больше двух, то один считается как +13500, а кол-во остальных умножается на 11500 и прибавляется к общей сумме)
         * Галочка отвечает за складывание пошлины с базовой стоимостью услуги
         */
        return isCountBaseCost ? baseCost + fee : fee;
    };

    return (
        <div className="jumbotron">
            <CalcHeading name="Договор отчуждения, лицензионнный и cублицензионный договор" />
            <Form>
                <Form.Group controlId="alienationServiceCost">
                    <Form.Label>Стоимость услуги</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Введите стоимость услуги"
                        value={baseCost}
                        onChange={e => setBaseCost(Number(e.target.value))}
                    />
                </Form.Group>
                <Form.Group controlId="trademarkCount">
                    <Form.Label>Количество товарных знаков</Form.Label>
                    <Form.Control
                        type="number"
                        min="1"
                        placeholder="Введите количество товарных знаков"
                        value={trademarkCount}
                        onChange={e =>
                            setTrademarkCount(Number(e.target.value))
                        }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        id="isCountBaseCost"
                        label="Сложить пошлину со стоимостью услуги"
                        checked={isCountBaseCost}
                        onChange={e => setIsCountBaseCost(e.target.checked)}
                    />
                </Form.Group>
                <Form.Group>
                    <ResultOfCalculation
                        result={calculateTotalServiceCost(trademarkCount)}
                    />
                </Form.Group>
                <Form.Group>
                    <small className="text-muted">
                        Расчет пошлины идет по принципу: если ТЗ один, то
                        +13500; если ТЗ больше двух, то один считается как
                        +13500, а кол-во остальных умножается на 11500 и
                        прибавляется к общей сумме. Галочка "Сложить пошлину"
                        складывает стоимость услуги с пошлиной.
                    </small>
                </Form.Group>
            </Form>
        </div>
    );
};

export default AlienationContractCalc;
