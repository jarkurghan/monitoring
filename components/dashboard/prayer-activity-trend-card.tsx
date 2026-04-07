"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export type PrayerActivityTrendPoint = { date: string; weekday: string; count: number; date_slice?: string };

interface PrayerActivityTrendCardProps {
    data: PrayerActivityTrendPoint[];
}

export function PrayerActivityTrendCard({ data }: PrayerActivityTrendCardProps) {
    const startCount = data[0]?.count ?? 0;
    const endCount = data[data.length - 1]?.count ?? 0;
    data.forEach((item) => (item.date_slice = item.date.slice(0, 5)));

    const diff = endCount - startCount;
    const diffSign = diff > 0 ? "+" : diff < 0 ? "-" : "";
    const diffLabel = diff > 0 ? "↗" : diff < 0 ? "↘" : "";
    const relativeChange = endCount > 0 ? (startCount > 0 ? (diff / startCount) * 100 : 100) : 100;

    return (
        <Card className="bg-card border-border h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex justify-between w-full">
                    <div>
                        <CardTitle className="text-base font-medium">Aktivlik diagrammasi</CardTitle>
                        <p className="text-xs text-muted-foreground">
                            {data[0].date} - {data[data.length - 1].date}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <p className="text-3xl font-semibold">{data.reduce((acc, curr) => acc + curr.count, 0)}</p>
                        <div className="flex flex-col">
                            <span
                                className={`text-xs px-2 py-0.5 rounded-full ${diff > 0 ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : diff < 0 ? "bg-red-500/20 text-red-600 dark:text-red-400" : "bg-muted text-muted-foreground"}`}
                            >
                                {diffSign}
                                {Math.abs(diff)} {diffLabel}
                            </span>
                            <span className="text-xs text-muted-foreground">{relativeChange.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date_slice" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#737373" }} />
                            <YAxis hide />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#1a1a1a", border: "none", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
                                formatter={(value: number) => [value.toLocaleString(), "Faollik"]}
                            />
                            <Area type="monotone" dataKey="count" stroke="#a3a6f1" strokeWidth={2} fill="url(#orderGradient)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
