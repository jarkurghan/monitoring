"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { MapData } from "./map";

const getViloyatSize = (count: number, maxSize: number) => {
    if (count === 0) return 0;
    return (count / maxSize) * 18 + 10;
};

const getViloyatCoordinates = (viloyat: string) => {
    switch (viloyat) {
        case "Andijon":
            return { x: 515, y: 188 };
        case "Namangan":
            return { x: 492, y: 180 };
        case "Farg‘ona":
            return { x: 478, y: 202 };
        case "Toshkent sh.":
            return { x: 436, y: 167 };
        case "Toshkent v.":
            return { x: 433, y: 185 };
        case "Jizzax":
            return { x: 407, y: 212 };
        case "Sirdaryo":
            return { x: 381, y: 222 };
        case "Samarqand":
            return { x: 328, y: 238 };
        case "Qashqadaryo":
            return { x: 320, y: 287 };
        case "Surxondaryo":
            return { x: 364, y: 331 };
        case "Navoiy":
            return { x: 241, y: 126 };
        case "Xorazm":
            return { x: 175, y: 168 };
        case "Qoraqalpog‘iston":
            return { x: 110, y: 90 };
        case "Buxoro":
            return { x: 232, y: 219 };
        case "Qozog‘iston":
            return { x: 375, y: 132 };
        case "Tojikiston":
            return { x: 419, y: 264 };
        case "Turkmaniston":
            return { x: 133, y: 249 };
        case "Qirg‘iziston":
            return { x: 535, y: 141 };
        default:
            return { x: 270, y: 210 };
    }
};

interface SalesMapProps {
    data: MapData[];
    onRegionClick: (region: MapData) => void;
}

function HoverTooltip({ data }: { data: MapData }) {
    return (
        <div className="bg-card px-3 py-2 rounded-lg shadow-lg text-xs font-medium border border-border w-[100px]">
            <p className="font-semibold text-[#781B22] text-ellipsis overflow-hidden whitespace-wrap">{data.viloyat}</p>
            <p className="text-sm text-muted-foreground font-bold">{data.count.toLocaleString()}</p>
        </div>
    );
}

export function MapComponent({ data, onRegionClick }: SalesMapProps) {
    const BASE_WIDTH = 540;
    const BASE_HEIGHT = 360;

    const points = useMemo(() => {
        const maxSize = data.length ? Math.max(...data.map((item) => item.count)) : 0;
        return data.map((item) => ({
            ...item,
            coordinates: getViloyatCoordinates(item.viloyat),
            size: maxSize > 0 ? getViloyatSize(item.count, maxSize) : 10,
        }));
    }, [data]);

    const [hovered, setHovered] = useState<MapData | null>(null);
    const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [scale, setScale] = useState<{ x: number; y: number }>({ x: 1, y: 1 });

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const update = () => {
            const rect = el.getBoundingClientRect();
            const nextX = rect.width > 0 ? rect.width / BASE_WIDTH : 1;
            const nextY = rect.height > 0 ? rect.height / BASE_HEIGHT : 1;
            setScale({ x: nextX, y: nextY });
        };

        update();

        const ro = new ResizeObserver(() => update());
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return (
        <Card className="bg-card border-border h-full">
            <CardContent>
                <div className="flex justify-center items-center">
                    <div
                        ref={containerRef}
                        className="relative w-full max-w-[540px] aspect-[3/2]"
                        onMouseLeave={() => {
                            setHovered(null);
                            setTooltipPos(null);
                        }}
                    >
                        <Image src="/uzbekistan.svg" alt="Map" fill className="object-contain" />
                        {hovered && tooltipPos ? (
                            <div className="absolute z-50 pointer-events-none" style={{ left: tooltipPos.x + 5, top: tooltipPos.y + 5 }}>
                                <HoverTooltip data={hovered} />
                            </div>
                        ) : null}

                        {points.map((item) =>
                            (() => {
                                const cx = (item.coordinates?.x ?? 0) + 4;
                                const cy = (item.coordinates?.y ?? 0) + 4;
                                const s = item.size ?? 10;
                                const scaledSize = Math.max(4, s * Math.min(scale.x, scale.y));
                                return (
                                    <div
                                        key={item.viloyat}
                                        className="absolute z-10 bg-[#781B2288] rounded-full transition-all duration-300"
                                        style={{
                                            top: `${cy * scale.y - scaledSize / 2}px`,
                                            left: `${cx * scale.x - scaledSize / 2}px`,
                                            width: scaledSize,
                                            height: scaledSize,
                                        }}
                                        onMouseEnter={(e) => {
                                            const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                                            if (!rect) return;
                                            setHovered(item);
                                            setTooltipPos({ x: e.clientX - rect.left - 100, y: e.clientY - rect.top });
                                        }}
                                        onClick={() => onRegionClick(item)}
                                        onMouseMove={(e) => {
                                            const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                                            if (!rect) return;
                                            setTooltipPos({ x: e.clientX - rect.left - 100, y: e.clientY - rect.top });
                                        }}
                                        onMouseLeave={() => {
                                            setHovered(null);
                                            setTooltipPos(null);
                                        }}
                                    ></div>
                                );
                            })(),
                        )}
                        <div className="text-base font-medium absolute top-0 right-0">Hududlar kesimida</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
