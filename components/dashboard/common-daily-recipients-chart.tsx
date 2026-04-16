"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DAY_COUNT } from "@/lib/constants";

type CommonDailyRecipientsStat = {
    date: string;
    users: number;
    dateSlice?: string;
};

interface CommonDailyRecipientsChartProps {
    data: CommonDailyRecipientsStat[];
    color: string;
}

export function CommonDailyRecipientsChart({ data, color }: CommonDailyRecipientsChartProps) {
    data.forEach((item) => (item.dateSlice = item.date.slice(0, 2)));

    return (
        <Card className="bg-card border-border h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-base font-medium">Yangi foydalanuvchilar soni</CardTitle>
                </div>
                <div className="flex items-center gap-6 mb-4">
                    <div className="ml-auto flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded flex items-center justify-center`} style={{backgroundColor: color}}>
                                <span className="text-[10px] text-orange-600 font-bold"></span>
                            </div>
                            <div>
                                <p className="text-xs font-medium">Oxirgi {DAY_COUNT} kundagi</p>
                                <p className="text-xs font-medium">yangi foydalanuvchilar soni</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="mt-auto">
                <div className="h-[200px] ml-[-40px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} barGap={2}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                            <XAxis dataKey="dateSlice" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#737373" }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#737373" }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#e5e5e5", border: "none", borderRadius: "8px", color: "#1a1a1a", fontSize: "12px" }}
                                formatter={(value: number) => [value.toLocaleString(), "Yangi foydalanuvchilar soni"]}
                                labelFormatter={(_, payload) => payload?.[0]?.payload?.date || ""}
                            />
                            <Bar dataKey="users" radius={[4, 4, 0, 0]} maxBarSize={20}>
                                {data.map((entry, index) => (
                                    <Cell key={`count-${index}`} fill={color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
