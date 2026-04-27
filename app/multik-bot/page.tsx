import type { Metadata } from "next";
import { AnimeTopUsersListCard } from "@/components/dashboard/j-anime-top-users-list-card";
import { MovieLatestMoviesTableCard } from "@/components/dashboard/movie-latest-movies-table-card";
import { CommonDailyRecipientsChart } from "@/components/dashboard/common-daily-recipients-chart";
import { CommonUsersStatusPieCard } from "@/components/dashboard/common-users-status-pie-card";
import { CommonActivityTrendCard } from "@/components/dashboard/common-activity-trend-card";
import { MovieTopMoviesListCard } from "@/components/dashboard/movie-top-movies-list-card";
import { MovieSummaryMetricCards } from "@/components/dashboard/movie-summary-metric-cards";
import { CommonPartPieCard } from "@/components/dashboard/common-part-pie-card";
import { MonitoringAppHeader } from "@/components/dashboard/app-header";
import { DashboardPageTitle } from "@/components/dashboard/app-title";
import { DAY_COUNT, TOP_COUNT } from "@/lib/constants";
import { getDailyNewUsers } from "@/services/movie";
import { getDailyTotalUsers } from "@/services/movie";
import { getUsersByStatus } from "@/services/movie";
import { getLatestMovies } from "@/services/movie";
import { getSummaryBasic } from "@/services/movie";
import { getTopMovies } from "@/services/movie";
import { getTopStudios } from "@/services/movie";
import { getGenres } from "@/services/movie";
import { getTopUsers } from "@/services/movie";
import { ExternalLink } from "lucide-react";
import { Bell } from "lucide-react";

export const metadata: Metadata = {
    title: "Multfilm bot",
    description: "Multfilm kodlari botini monitoring qilish tizimi | Najmiddin Nazirov",
};

export default async function DashboardPage() {
    const response = await Promise.all([
        getSummaryBasic(),
        getTopMovies(TOP_COUNT),
        getTopUsers(TOP_COUNT),
        getTopStudios(TOP_COUNT),
        getGenres(TOP_COUNT),
        getUsersByStatus(),
        getDailyNewUsers(DAY_COUNT),
        getDailyTotalUsers(DAY_COUNT),
        getLatestMovies(5),
    ]);
    const [summary, topMovies, topUsers, topStudios, topGenres, usersByStatus, dailyNewUsers, updatedUsersLast5Days, latestMovies] = response;

    const headerMenuItems = [
        { label: "Bot yangiliklari", href: "https://t.me/meni_botlarim", target: "_blank", icon: <Bell /> },
        { label: "Botga o'tish", href: "https://t.me/uz_multfilm_bot", target: "_blank", icon: <ExternalLink /> },
    ];

    const color = "#55a6cc";

    return (
        <div className="min-h-screen bg-background p-0 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-[1400px] mx-auto">
                <DashboardPageTitle title="Bot statistikasi" description="Multfilm boti foydalanuvchilari bo'yicha statistika">
                    <MonitoringAppHeader headerMenuItems={headerMenuItems} />
                </DashboardPageTitle>

                <div className="px-2 sm:p-0">
                    <MovieSummaryMetricCards data={summary} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4 sm:mb-6">
                        <div className="lg:col-span-2 h-full">
                            <CommonDailyRecipientsChart data={dailyNewUsers} color="#55a6cc" />
                        </div>
                        <div className="lg:col-span-1 h-full">
                            <CommonUsersStatusPieCard data={usersByStatus} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 mb-4 sm:mb-6">
                        <div className="lg:col-span-4 h-full">
                            <CommonPartPieCard
                                data={topMovies.map((item) => ({ name: item.description?.split("\n")[0], count: item.total_count }))}
                                title1="Eng ko'p ko'rishlar"
                                title2={"qaysi multfilmlarga to'g'ri keladi"}
                            />
                        </div>
                        <div className="lg:col-span-3 h-full">
                            <MovieTopMoviesListCard data={topMovies} />
                        </div>
                        <div className="h-full lg:col-span-3">
                            <AnimeTopUsersListCard data={topUsers} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4 sm:mb-6">
                        <div className="lg:col-span-2 h-full">
                            <MovieLatestMoviesTableCard data={latestMovies} />
                        </div>
                        <div className="h-full lg:col-span-3">
                            <CommonActivityTrendCard data={updatedUsersLast5Days} color={color} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 mb-4 sm:mb-6">
                        <div className="lg:col-span-5 h-full">
                            <CommonPartPieCard data={topStudios} title1="Eng ko'p ko'rishlar" title2={"qaysi studiyalarga to'g'ri keladi"} />
                        </div>
                        <div className="lg:col-span-5 h-full">
                            <CommonPartPieCard data={topGenres} title1="Eng ko'p ko'rishlar" title2={"qaysi janrlarga to'g'ri keladi"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
