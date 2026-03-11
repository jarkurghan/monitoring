"use server";

import type { MetricCardData } from "@/components/dashboard/metric-card";
import type { UpdatedUsersLast5Days } from "@/components/dashboard/customer-orders";
import type { UserStatus } from "@/components/dashboard/sales-map";
import type { LatestUser } from "@/components/dashboard/top-products";
import { MapData } from "@/components/dashboard/map";
import { MapSelectedData } from "@/components/dashboard/map-selected";

export type PrayerTimeStat = { hour: number; count: number };

export async function getActivePerTimes(): Promise<PrayerTimeStat[]> {
    const res = await fetch(`${process.env.API_URL}/api/prayer-time/stat/active-per-times`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch active-per-times data");
    const data = await res.json();
    return data as PrayerTimeStat[];
}

export async function getLatestUsers(): Promise<LatestUser[]> {
    const res = await fetch(`${process.env.API_URL}/api/prayer-time/stat/latest-users`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch latest-users data");
    const data = await res.json();
    return data as LatestUser[];
}

export async function getLastActivities(): Promise<UpdatedUsersLast5Days[]> {
    const res = await fetch(`${process.env.API_URL}/api/prayer-time/stat/updated-users-last-days/14`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch updated-users-last-days data");
    const data = await res.json();
    return data as UpdatedUsersLast5Days[];
}

export async function getUserStatus(): Promise<UserStatus[]> {
    const res = await fetch(`${process.env.API_URL}/api/prayer-time/stat/user-status`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch user-status data");
    const data = await res.json();
    return data as UserStatus[];
}

export async function getTitles(): Promise<MetricCardData> {
    const res = await fetch(`${process.env.API_URL}/api/prayer-time/stat/active-users-and-cities`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch active-users-and-cities data");
    const data = await res.json();
    return data as MetricCardData;
}

export async function getMap(): Promise<MapData[]> {
    const res = await fetch(`${process.env.API_URL}/api/prayer-time/stat/city-count-with-region`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch map data");
    const data = await res.json();
    return data as MapData[];
}

export async function getMapSelected(viloyat: string): Promise<MapSelectedData[]> {
    const res = await fetch(`${process.env.API_URL}/api/prayer-time/stat/city-count-with-region/${viloyat}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch map selected data");
    const data = await res.json();
    return data as MapSelectedData[];
}
