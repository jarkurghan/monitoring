import type { MetricCardData } from "@/components/dashboard/metric-card";
import type { UpdatedUsersLast5Days } from "@/components/dashboard/customer-orders";
import type { UserStatus } from "@/components/dashboard/sales-map";
import type { LatestUser } from "@/components/dashboard/top-products";

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
    const res = await fetch(`${process.env.API_URL}/api/prayer-time/stat/updated-users-last-5-days`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch updated-users-last-5-days data");
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
