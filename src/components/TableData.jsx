import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableContainer from "./TableContainer";

const TableData = ({headers, data}) => {
    if (!headers || !data || headers.length == 0 || data.length == 0) {
        return(
            <div>Data Unavailable</div>
        )
    }

    return(
        <TableContainer>
            <table className="w-full border-collapse">
                <TableHeader headers={headers} />
                <tbody>
                    {data.map((row, index) => (
                        <TableRow key={index} row={row} headers={headers} />
                    ))}
                </tbody>
            </table>
        </TableContainer>
    )
}

TableData.PropTypes = {
    headers:PropTypes.arrayOf(PropTypes.string).isRequired,
    data:PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TableData;