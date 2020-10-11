import React, { Fragment } from "react";

const CalcHeading = props => {
    return (
        <Fragment>
            <h2 className="text-center mb-4">{props.name}</h2>
            <hr />
        </Fragment>
    );
};

export default CalcHeading;
