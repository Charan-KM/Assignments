import React from "react";
import PropTypes from "prop-types";
import { HEADER_LABELS } from "../../constants/stocks";
import { Link } from "react-router-dom";

const TableComponent = ({ headers, data }) => {
    if (!headers?.length || !data?.length) {
        return <div>Data Unavailable</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="p-3 text-left border-b-2 border-gray-200 bg-gray-100 font-semibold">
                                {HEADER_LABELS[header] || header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="cursor-pointer hover:bg-gray-200">
                            <td colSpan={headers.length} className="p-3 border-b border-gray-200">
                                <Link to={`/company/${row.ticker}`} className="flex w-full">
                                    {headers.map((header, colIndex) => (
                                        <span key={colIndex} className="px-2">
                                            {row[header] || ""}
                                        </span>
                                    ))}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

TableComponent.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableComponent;