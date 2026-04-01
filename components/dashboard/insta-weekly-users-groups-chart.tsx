"use client";

import React from "react";
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface LineChartProps {
    date: string;
    users: number;
    groups: number;
    dateSlice?: string;
}

interface LineChartComponentProps {
    data: LineChartProps[];
}

export function LineChartComponent({ data }: LineChartComponentProps) {
    const normalized = (data ?? []).map((item) => ({
        ...item,
        dateSlice: item.dateSlice ?? String(item.date).slice(0, 5),
    }));

    return (
        <Card className="bg-card border-border gap-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-base font-medium">Yangi foydalanuvchilar soni</CardTitle>
                </div>
                <div className="hidden sm:flex items-center gap-6 mb-4">
                    <div className="ml-auto flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-[#fdba74] flex items-center justify-center">
                                <span className="text-[10px] text-orange-600 font-bold"></span>
                            </div>
                            <div>
                                <p className="text-xs font-medium">Hafta bo'yicha</p>
                                <p className="text-xs font-medium">yangi foydalanuvchilar soni</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="">
                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={normalized} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="dateSlice" tick={{ fontSize: 11 }} />
                            <Tooltip contentStyle={{ fontSize: 14, borderRadius: "8px", backgroundColor: "#e5e5e5", fontWeight: "600" }} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="groups"
                                stroke="#8884d8"
                                dot={{ r: 4, fill: "#8884d8", stroke: "#8884d8" }}
                                activeDot={{ r: 8, fill: "#8884d8", stroke: "#8884d8" }}
                                fontSize={11}
                            />
                            <Line
                                type="monotone"
                                dataKey="users"
                                stroke="#82ca9d"
                                connectNulls={true}
                                dot={{ r: 4, fill: "#82ca9d", stroke: "#82ca9d" }}
                                activeDot={{ r: 8, fill: "#82ca9d", stroke: "#82ca9d" }}
                                fontSize={11}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
