"use server";

import type { PrayerBotMetricSummary } from "@/components/dashboard/prayer-bot-metric-cards";
import type { PrayerActivityTrendPoint } from "@/components/dashboard/prayer-activity-trend-card";
import type { PrayerUserStatusCount } from "@/components/dashboard/prayer-users-by-status-card";
import type { PrayerLatestSubscriber } from "@/components/dashboard/prayer-latest-subscribers-card";
import type { PrayerRegionCount } from "@/components/dashboard/prayer-regions-map";
import type { PrayerRegionCityCount } from "@/components/dashboard/prayer-region-cities-chart";
import { DAY_COUNT } from "@/lib/constants";

export type PrayerTimeStat = { hour: number; count: number };

export async function getActivePerTimes(): Promise<PrayerTimeStat[]> {
    const res = await fetch(`${process.env.API_URL}/api/prayer-time/stat/active-per-times`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch active-per-times data");
    const data = await res.json();
    return data as PrayerTimeStat[];
}

export async function getLatestUsers(): Promise<PrayerLatestSubscriber[]> {
    const res = await fetch(`${process.env.API_URL}/api/prayer-time/stat/latest-users`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch latest-users data");
    const data = await res.json();
    return data as PrayerLatestSubscriber[];
}

export async function getLastActivities(): Promise<PrayerActivityTrendPoint[]> {
    const res = await fetch(`${process.env.API_URL}/api/prayer-time/stat/created-users-till-days/${DAY_COUNT}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch created-users-till-days data");
    const data = await res.json();
    return data as PrayerActivityTrendPoint[];
}

export async function getUserStatus(): Promise<PrayerUserStatusCount[]> {
    const res = await fetch(`${process.env.API_URL}/api/prayer-time/stat/user-status`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch user-status data");
    const data = await res.json();
    return data as PrayerUserStatusCount[];
}

export async function getTitles(): Promise<PrayerBotMetricSummary> {
    const res = await fetch(`${process.env.API_URL}/api/prayer-time/stat/active-users-and-cities`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch active-users-and-cities data");
    const data = await res.json();
    return data as PrayerBotMetricSummary;
}

export async function getMap(): Promise<PrayerRegionCount[]> {
    const res = await fetch(`${process.env.API_URL}/api/prayer-time/stat/city-count-with-region`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch map data");
    const data = await res.json();
    return data as PrayerRegionCount[];
}

export async function getMapSelected(viloyat: string): Promise<PrayerRegionCityCount[]> {
    const res = await fetch(`${process.env.API_URL}/api/prayer-time/stat/city-count-with-region/${viloyat}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch map selected data");
    const data = await res.json();
    return data as PrayerRegionCityCount[];
}
