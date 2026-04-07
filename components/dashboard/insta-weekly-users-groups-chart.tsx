"use client";

import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InstaNewestRow } from "@/services/insta";

interface InstaWeeklyUsersGroupsChartProps {
    data: InstaNewestRow[];
}

export function InstaWeeklyUsersGroupsChart({ data }: InstaWeeklyUsersGroupsChartProps) {
    const normalized = (data ?? []).map((item) => ({ ...item, dateSlice: item.dateSlice ?? String(item.date).slice(0, 5) }));

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
                            <Tooltip contentStyle={{ fontSize: 14, borderRadius: "8px", backgroundColor: "#F3F3F3", fontWeight: "600" }} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="groups"
                                name="guruhlar soni"
                                stroke="#8884d8"
                                dot={{ r: 4, fill: "#8884d8", stroke: "#8884d8" }}
                                activeDot={{ r: 8, fill: "#8884d8", stroke: "#8884d8" }}
                                fontSize={11}
                            />
                            <Line
                                type="monotone"
                                dataKey="users"
                                name="foydalanuvchilar soni"
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
