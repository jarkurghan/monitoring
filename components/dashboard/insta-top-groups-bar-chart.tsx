"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { InstaTopGroup } from "@/services/insta";

interface InstaTopGroupsBarChartProps {
    data: InstaTopGroup[];
}

export function InstaTopGroupsBarChart({ data }: InstaTopGroupsBarChartProps) {
    const normalized = (data ?? []).map((group) => ({ ...group, sliced: group.group_name.slice(0, 7) }));

    return (
        <Card className="bg-card border-border h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Top guruhlar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={normalized} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="sliced" fontSize={13} />
                        <Tooltip
                            labelFormatter={(_, payload) => payload?.[0]?.payload?.group_name || ""}
                            contentStyle={{ fontSize: 14, borderRadius: "8px", backgroundColor: "#F3F3F3", fontWeight: "600" }}
                        />
                        <Legend wrapperStyle={{ fontSize: 15 }} />
                        <Bar dataKey="total_count" name="foydalanishlar soni" fontSize={11} fill="#8884d8" background={{ fill: "#eee" }} />
                        <Bar dataKey="today_count" name="bugungi foydalanishlar soni" fontSize={11} fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
