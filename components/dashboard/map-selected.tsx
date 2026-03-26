import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapData } from "./map";
import { getMapSelected } from "@/services";

interface CustomBarProps {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    fill?: string;
}

export interface MapSelectedData {
    city_id: number;
    count: number;
    name_2: string;
}

const getPath = (x: number, y: number, width: number, height: number) => {
    return `M${x},${y + height}
            C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
            C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
            Z`;
};

const CustomShapeBar: React.FC<CustomBarProps> = (props) => {
    const { x, y, width, height, fill } = props;

    if (x === undefined || y === undefined || width === undefined || height === undefined) {
        return null;
    }

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const hashStringToInt = (value: string) => {
    let hash = 476;
    for (let i = 0; i < value.length; i += 1) {
        hash = ((hash << 5) + hash) ^ value.charCodeAt(i);
    }
    hash = hash >>> 0;
    hash ^= hash >>> 16;
    hash = Math.imul(hash, 0x7feb352d);
    hash ^= hash >>> 15;
    hash = Math.imul(hash, 0x846ca68b);
    hash ^= hash >>> 16;
    return hash >>> 0;
};

const colorFromName2 = (name2: string) => {
    const h = hashStringToInt(name2) % 360;
    const s = 68;
    const l = 52;
    return `hsl(${h} ${s}% ${l}%)`;
};

const CustomShapeBarChart: React.FC<{ region: MapData }> = ({ region }) => {
    const [data, setData] = useState<MapSelectedData[]>([]);

    useEffect(() => {
        getMapSelected(region.viloyat).then((data) => setData([...data]));
    }, [region.viloyat]);

    return (
        <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-base font-medium">{region.viloyat}</CardTitle>
                </div>
                <div className="flex items-center gap-6 mb-4">
                    <div className="ml-auto flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-base font-medium">Umumiy: {region.count}</CardTitle>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="">
                <ResponsiveContainer width="100%" height={290}>
                    <BarChart data={data} margin={{ top: 0, right: 0, left: -28, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name_2" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" shape={<CustomShapeBar />}>
                            {data.map((entry) => (
                                <Cell key={entry.city_id} fill={colorFromName2(entry.name_2)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default CustomShapeBarChart;
