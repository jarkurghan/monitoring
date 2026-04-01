"use client";

import { UzbekistanRegionsMapSvg } from "./prayer-regions-map-svg";
import { PrayerRegionCitiesChart } from "./prayer-region-cities-chart";
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

    const handleRegionClick = (region: PrayerRegionCount) => {
        setSelectedRegion(region);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="h-full">
                <UzbekistanRegionsMapSvg data={data} onRegionClick={handleRegionClick} />
            </div>
            <div className="h-full">
                <PrayerRegionCitiesChart region={selectedRegion} />
            </div>
        </div>
    );
}
