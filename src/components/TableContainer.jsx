import React from "react";
import PropTypes from "prop-types";

const TableContainer = ({children})=>(
    <div className="overflow-x-auto">
        {children}
    </div>
)

TableContainer.propTypes={
    children:PropTypes.node.isRequired
}

export default TableContainer;