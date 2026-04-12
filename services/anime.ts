"use server";

export type AnimeSummaryBasic = {
    total_users: number;
    total_dubs: number;
    total_animes: number;
    total_episodes: number;
};

export type AnimeTopDub = {
    dub_name: string;
    total_count: number;
    today_count: number;
};

export type AnimeTopAnime = {
    anime_name: string;
    total_count: number;
    today_count: number;
};

export type AnimeTopUsers = {
    user_name: string;
    total_count: number;
    today_count: number;
};

export type AnimeStatusCount = {
    status: string;
    count: number;
    color?: string;
};

export type AnimeDailyNewUsers = {
    date: string;
    users: number;
    dateSlice?: string;
};

export type AnimeTotalUsers = {
    date: string;
    users: number;
    dateSlice?: string;
};

const ANIME_BASE = `${process.env.API_URL}/api/anime/stat`;

async function fetchAnime<T>(path: string): Promise<T> {
    const res = await fetch(`${ANIME_BASE}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch anime ${path}`);
    return (await res.json()) as T;
}

export async function getSummaryBasic(): Promise<AnimeSummaryBasic> {
    return await fetchAnime<AnimeSummaryBasic>("/summary-basic");
}

export async function getTopDubs(topCount: number): Promise<AnimeTopDub[]> {
    return await fetchAnime<AnimeTopDub[]>(`/top-dubs/${topCount}`);
}

export async function getTopAnimes(topCount: number): Promise<AnimeTopAnime[]> {
    return await fetchAnime<AnimeTopAnime[]>(`/top-animes/${topCount}`);
}

export async function getTopUsers(topCount: number): Promise<AnimeTopUsers[]> {
    return await fetchAnime<AnimeTopUsers[]>(`/top-users/${topCount}`);
}

export async function getUsersByStatus(): Promise<AnimeStatusCount[]> {
    return await fetchAnime<AnimeStatusCount[]>("/users-by-status");
}

export async function getDailyNewUsers(dayCount: number): Promise<AnimeDailyNewUsers[]> {
    return await fetchAnime<AnimeDailyNewUsers[]>(`/daily-new-users/${dayCount}`);
}

export async function getDailyTotalUsers(dayCount: number): Promise<AnimeTotalUsers[]> {
    return await fetchAnime<AnimeTotalUsers[]>(`/daily-total-users/${dayCount}`);
}
