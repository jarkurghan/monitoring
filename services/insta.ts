"use server";

export type InstaSummaryBasic = {
    total_users: number;
    total_groups: number;
    total_usages: number;
    total_group_usages: number;
};

export type InstaStatusCount = {
    status: string;
    count: number;
    color?: string;
};

export type InstaTopGroup = {
    group_name: string;
    total_count: number;
    today_count: number;
};

export type InstaNewestRow = {
    date: string;
    users: number;
    groups: number;
    dateSlice?: string;
};

const INSTA_BASE = `${process.env.API_URL}/api/insta-saver/stat`;

async function fetchInsta<T>(path: string): Promise<T> {
    const res = await fetch(`${INSTA_BASE}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch insta ${path}`);
    return (await res.json()) as T;
}

export async function getSummaryBasic(): Promise<InstaSummaryBasic> {
    return await fetchInsta<InstaSummaryBasic>("/summary-basic");
}

export async function getTopGroups(groups: number): Promise<InstaTopGroup[]> {
    return await fetchInsta<InstaTopGroup[]>(`/top-groups/${groups}`);
}

export async function getUsersByStatus(): Promise<InstaStatusCount[]> {
    return await fetchInsta<InstaStatusCount[]>("/users-by-status");
}

export async function getGroupsByStatus(): Promise<InstaStatusCount[]> {
    return await fetchInsta<InstaStatusCount[]>("/groups-by-status");
}

export async function getWeeklyCount(days: number): Promise<InstaNewestRow[]> {
    return await fetchInsta<InstaNewestRow[]>(`/weekly-tashkent/${days}`);
}
