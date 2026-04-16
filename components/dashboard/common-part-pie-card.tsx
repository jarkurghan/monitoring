"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { generateColor } from "@/lib/generate-color";

export type CommonPartPieCardData =
    | { name?: string; dub_name: string; count: number; color?: string }
    | { name?: string; anime_name: string; count: number; color?: string };

interface CommonPartPieCardProps {
    data: CommonPartPieCardData[];
    title: string;
}

export function CommonPartPieCard({ data, title }: CommonPartPieCardProps) {
    data.forEach((item) => {
        item.name = "dub_name" in item ? item.dub_name : item.anime_name;
        item.color = generateColor(item.name);
    });

    return (
        <Card className="bg-card border-border h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-base font-medium">Eng ko'p ko'rishlar</CardTitle>
                    <p className="text-xs text-muted-foreground">qaysi {title}larga to'g'ri keladi</p>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid xl:grid-cols-2 gap-2">
                    <div className="mt-auto hidden xl:flex flex-col gap-2">
                        {data.map((item, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="h-7 px-4 text-xs w-fit max-w-40 justify-start border-0"
                                style={{ backgroundColor: item.color }}
                            >
                                <span className="truncate text-white/95">{item.name}</span>
                            </Badge>
                        ))}
                    </div>

                    {/* <div className="w-[300px] h-[220px]"> */}
                    <div className="w-full xl:w-[240px] h-[240px]">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={data} cx="50%" cy="50%" label outerRadius={70} fill="#8884d8" dataKey="count">
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* </div> */}

                    <div className="mt-auto flex xl:hidden flex-row flex-wrap gap-2">
                        {data.map((item, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="h-7 px-4 text-xs w-fit justify-start border-0"
                                style={{ backgroundColor: item.color }}
                            >
                                <span className="truncate text-white/95">
                                    {item.name} - {item.count}
                                </span>
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
