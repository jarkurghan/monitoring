"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PrayerTimeStat = {
    hour: number;
    count: number;
};

interface ProfitChartProps {
    data: PrayerTimeStat[];
}

export function ProfitChart({ data }: ProfitChartProps) {
    const sum = data.reduce((acc, curr) => acc + curr.count, 0);
    return (
        <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-base font-medium">Qabul qiluvchilar soni</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-3xl font-semibold">{sum}</span>
                    </div>
                </div>
                <div className="flex items-center gap-6 mb-4">
                    <div className="ml-auto flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-[#fdba74] flex items-center justify-center">
                                <span className="text-[10px] text-orange-600 font-bold"></span>
                            </div>
                            <div>
                                <p className="text-xs font-medium">Soat bo'yicha</p>
                                <p className="text-xs font-medium">qabul qiluvchilar soni</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="">
                <div className="h-[200px] ml-[-40px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} barGap={2}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                            <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#737373" }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#737373" }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#e5e5e5", border: "none", borderRadius: "8px", color: "#1a1a1a", fontSize: "12px" }}
                                formatter={(value: number) => [value.toLocaleString(), "Soni"]}
                                labelFormatter={(label) => `${label}:00`}
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={20}>
                                {data.map((entry, index) => (
                                    <Cell key={`count-${index}`} fill="#fdba74" />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
