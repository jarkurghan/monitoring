"use client";

import { UzbekistanRegionsMapSvg } from "./prayer-regions-map-svg";
import { PrayerRegionCitiesChart } from "./prayer-region-cities-chart";
import { PrayerRegionCityCount } from "./prayer-region-cities-chart";
import { CommonPartPieCard } from "./common-part-pie-card";
import { getMapSelected } from "@/services/pray";
import { useEffect } from "react";
import { useState } from "react";

export type PrayerRegionCount = {
    viloyat: string;
    count: number;
    coordinates?: { x: number; y: number };
    size?: number;
};

interface PrayerRegionsMapProps {
    data: PrayerRegionCount[];
}

export function PrayerRegionsMap({ data }: PrayerRegionsMapProps) {
    const [selectedRegion, setSelectedRegion] = useState<PrayerRegionCount>(data[0]);
    const [data1, setData] = useState<PrayerRegionCityCount[]>([]);

    const handleRegionClick = (region: PrayerRegionCount) => {
        setSelectedRegion(region);
    };

    useEffect(() => {
        getMapSelected(selectedRegion.viloyat).then((data) => setData([...data]));
    }, [selectedRegion.viloyat]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="h-full">
                <UzbekistanRegionsMapSvg data={data} onRegionClick={handleRegionClick} />
            </div>
            <div className="h-full">
                <CommonPartPieCard
                    data={data1.map((item) => ({ movie_name: item.name_2, count: item.count }))}
                    title1={selectedRegion.viloyat}
                    title2={`Umumiy: ${data1.reduce((acc, item) => acc + item.count || 0, 0) || 0}`}
                />
            </div>
        </div>
    );
}
