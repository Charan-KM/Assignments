import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const IncomeStatementChart = ({ data }) => {
    const chartData = data.map((report) => ({
        year: report.fiscalDateEnding.split("-")[0],
        revenue: Number(report.totalRevenue),
    }));

    return (
        <div className="w-full h-[400px] px-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ left: 60, right: 30, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                        dataKey="year" 
                        tick={{ fill: "#6B7280", fontSize: 14 }} 
                        angle={-45}  
                        textAnchor="end" 
                        height={80}
                    />
                    <YAxis 
                        tickFormatter={(value) => value.toLocaleString()}
                        tick={{ fill: "#6B7280", fontSize: 14 }} 
                    />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="revenue" fill="#4F46E5" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default IncomeStatementChart;