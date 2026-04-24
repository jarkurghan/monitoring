"use server";

export type MovieSummaryBasic = {
    total_movies: number;
    total_uses: number;
    total_users: number;
    total_active_users: number;
};

export type MovieTopMovie = {
    description: string;
    movie_name?: string;
    total_count: number;
    today_count: number;
};

export type MovieTopUsers = {
    user_name: string;
    total_count: number;
    today_count: number;
};

export type MovieStatusCount = {
    status: string;
    count: number;
    color?: string;
};

export type MovieDailyNewUsers = {
    date: string;
    users: number;
    dateSlice?: string;
};

export type MovieTotalUsers = {
    date: string;
    users: number;
    dateSlice?: string;
};

export type MovieLatestMovies = {
    code: string;
    description: string | null;
    movie_name?: string;
    quality?: string[];
};

export type MovieCommonPieCardData =
    | { name?: string; dub_name: string; count: number; color?: string }
    | { name?: string; movie_name: string; count: number; color?: string }
    | { name?: string; movie_name: string; count: number; color?: string };

const MOVIE_BASE = `${process.env.API_URL}/api/movie/stat`;

async function fetchMovie<T>(path: string): Promise<T> {
    const res = await fetch(`${MOVIE_BASE}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch movie ${path}`);
    return (await res.json()) as T;
}

export async function getSummaryBasic(): Promise<MovieSummaryBasic> {
    return await fetchMovie<MovieSummaryBasic>("/summary-basic");
}

// export async function getTopDubs(topCount: number): Promise<MovieTopDub[]> {
//     return await fetchMovie<MovieTopDub[]>(`/top-dubs/${topCount}`);
// }

// export async function getTop5Dubs(): Promise<MovieCommonPieCardData[]> {
//     return await fetchMovie<MovieCommonPieCardData[]>(`/top-dubs`);
// }

export async function getTopMovies(topCount: number): Promise<MovieTopMovie[]> {
    const data = await fetchMovie<MovieTopMovie[]>(`/top-movies/${topCount}`);
    return data.map((item) => ({ ...item, movie_name: item.description?.split("\n")[0] }));
}

export async function getTop5Movies(): Promise<MovieCommonPieCardData[]> {
    const data = await fetchMovie<MovieTopMovie[]>(`/top-movies`);
    return data.map((item) => ({ count: item.total_count, movie_name: item.description?.split("\n")[0] }));
}

export async function getTopUsers(topCount: number): Promise<MovieTopUsers[]> {
    return await fetchMovie<MovieTopUsers[]>(`/top-users/${topCount}`);
}

export async function getUsersByStatus(): Promise<MovieStatusCount[]> {
    return await fetchMovie<MovieStatusCount[]>("/users-by-status");
}

export async function getDailyNewUsers(dayCount: number): Promise<MovieDailyNewUsers[]> {
    return await fetchMovie<MovieDailyNewUsers[]>(`/daily-new-users/${dayCount}`);
}

export async function getDailyTotalUsers(dayCount: number): Promise<MovieTotalUsers[]> {
    return await fetchMovie<MovieTotalUsers[]>(`/daily-total-users/${dayCount}`);
}

export async function getLatestMovies(limit: number): Promise<MovieLatestMovies[]> {
    const data = await fetchMovie<MovieLatestMovies[]>(`/latest-movies/${limit}`);

    data.forEach((item) => {
        const qrow = (item.description || "").split("\n").filter((line) => line.includes("Sifat:"))[0] || "";
        item.quality = (qrow.split(":")[1] || "").split(",").map((e) => e.trim());
        item.movie_name = item.description?.split("\n")[0];
    });

    return data;
}
