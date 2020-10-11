import React from "react";

const ResultOfCalculation = props => {
    return (
        <p>
            <strong>Итоговая стоимость услуги: {props.result}</strong>
        </p>
    );
};

export default ResultOfCalculation;
