"use client";

import { MapComponent } from "./map-1";
import MapSelected from "./map-selected";
import { useState } from "react";

export type MapData = {
    viloyat: string;
    count: number;
    coordinates?: { x: number; y: number };
    size?: number;
};

interface MapProps {
    data: MapData[];
}

export function Map({ data }: MapProps) {
    const [selectedRegion, setSelectedRegion] = useState<MapData>(data[0]);

    const handleRegionClick = (region: MapData) => {
        setSelectedRegion(region);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="h-full">
                <MapComponent data={data} onRegionClick={handleRegionClick} />
            </div>
            <div className="h-full">
                <MapSelected region={selectedRegion} />
            </div>
        </div>
    );
}
