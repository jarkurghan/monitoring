"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";

const getStatusColor = (status: string) => {
    switch (status) {
        case "Boshqa":
            return "#8b5cf6";
        case "Aktiv":
            return "#22c55e";
        case "Chiqib ketgan":
            return "#f97316";
        default:
            return "#f97316";
    }
};

export type UserStatus = {
    status: string;
    count: number;
    color?: string;
};

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: UserStatus }> }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-card px-3 py-2 rounded-lg shadow-lg text-xs font-medium border border-border">
                <p className="font-semibold">{data.status}</p>
                <p style={{ color: data.color }}>{data.count.toLocaleString()}</p>
            </div>
        );
    }
    return null;
};

interface GroupsCountByStatusProps {
    data: UserStatus[];
}

export function GroupsCountByStatus({ data }: GroupsCountByStatusProps) {
    data.forEach((item) => (item.color = getStatusColor(item.status)));

    return (
        <Card className="bg-card border-border h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-base font-medium">Guruhlar soni</CardTitle>
                    <p className="text-xs text-muted-foreground">Holatiga ko'ra</p>
                </div>

                <div className="hidden sm:flex lg:hidden xl:grid grid-cols-2 gap-2 mt-2">
                    {data.map((item, index) => (
                        <Button
                            size="sm"
                            key={item.status}
                            variant="outline"
                            className={["h-7 text-xs bg-transparent flex items-center gap-2", index === data.length - 1 ? "col-span-2" : ""].join(" ")}
                        >
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-xs text-muted-foreground truncate">{item.status}</span>
                        </Button>
                    ))}
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs text-muted-foreground">Aktiv holatda</p>
                            <p className="text-2xl font-semibold text-[var(--color-positive)]">{data.find((item) => item.status === "Aktiv")?.count || 0}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Foydalanilmayapti</p>
                            <p className="text-2xl font-semibold">{data.find((item) => item.status === "O'chirilgan")?.count || 0}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Boshqa holatdagilar</p>
                            <p className="text-2xl font-semibold">{data.find((item) => item.status === "Boshqa")?.count || 0}</p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="h-[180px] hidden xl:block">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="count">
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="h-[140px] block xl:hidden">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={data} cx="50%" cy="50%" innerRadius={36} outerRadius={64} paddingAngle={2} dataKey="count">
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="grid sm:hidden lg:grid xl:hidden grid-cols-2 gap-2 mt-2">
                    {data.map((item, index) => (
                        <Button
                            size="sm"
                            key={item.status}
                            variant="outline"
                            className={["h-7 text-xs bg-transparent flex items-center gap-2", index === data.length - 1 ? "col-span-2" : ""].join(" ")}
                        >
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-xs text-muted-foreground truncate">{item.status}</span>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
