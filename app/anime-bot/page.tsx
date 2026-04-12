import type { Metadata } from "next";
import { AnimeTopDubsListCard } from "@/components/dashboard/j-anime-top-dubs-list-card";
import { AnimeTopUsersListCard } from "@/components/dashboard/j-anime-top-users-list-card";
import { AnimeTopAnimesListCard } from "@/components/dashboard/j-anime-top-animes-list-card";
import { AnimeDailyRecipientsChart } from "@/components/dashboard/j-anime-daily-recipients-chart";
import { AnimeBotSummaryMetricCards } from "@/components/dashboard/j-anime-bot-summary-metric-cards";
import { CommonUsersStatusPieCard } from "@/components/dashboard/common-users-status-pie-card";
import { CommonActivityTrendCard } from "@/components/dashboard/common-activity-trend-card";
import { MonitoringAppHeader } from "@/components/dashboard/app-header";
import { DashboardPageTitle } from "@/components/dashboard/app-title";
import { DAY_COUNT, TOP_COUNT } from "@/lib/constants";
import { getDailyTotalUsers } from "@/services/anime";
import { getDailyNewUsers } from "@/services/anime";
import { getUsersByStatus } from "@/services/anime";
import { getSummaryBasic } from "@/services/anime";
import { getTopAnimes } from "@/services/anime";
import { getTopUsers } from "@/services/anime";
import { getTopDubs } from "@/services/anime";
import { ExternalLink } from "lucide-react";
import { Bell } from "lucide-react";

export const metadata: Metadata = {
    title: "Anime bot",
    description: "AniUZ Telegram botini monitoring qilish tizimi | Najmiddin Nazirov",
};

export default async function DashboardPage() {
    const response = await Promise.all([
        getSummaryBasic(),
        getTopDubs(TOP_COUNT),
        getTopAnimes(TOP_COUNT),
        getTopUsers(TOP_COUNT),
        getUsersByStatus(),
        getDailyNewUsers(DAY_COUNT),
        getDailyTotalUsers(DAY_COUNT),
    ]);
    const [summary, topDubs, topAnimes, topUsers, usersByStatus, dailyNewUsers, updatedUsersLast5Days] = response;

    const headerMenuItems = [
        { label: "Bot yangiliklari", href: "https://t.me/meni_botlarim", target: "_blank", icon: <Bell /> },
        { label: "Botga o'tish", href: "https://t.me/aniuz_bot", target: "_blank", icon: <ExternalLink /> },
    ];

    return (
        <div className="min-h-screen bg-background p-0 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-[1400px] mx-auto">
                <DashboardPageTitle title="Bot statistikasi" description="Insta saver boti foydalanuvchilari bo'yicha statistika">
                    <MonitoringAppHeader headerMenuItems={headerMenuItems} />
                </DashboardPageTitle>

                <div className="px-2 sm:p-0">
                    <AnimeBotSummaryMetricCards data={summary} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4 sm:mb-6">
                        <div className="lg:col-span-2">
                            <AnimeDailyRecipientsChart data={dailyNewUsers} />
                        </div>
                        <div className="lg:col-span-1 h-full">
                            <CommonUsersStatusPieCard data={usersByStatus} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4 sm:mb-6">
                        <div className="lg:col-span-2 h-full">
                            <CommonUsersStatusPieCard data={usersByStatus} />
                        </div>
                        <div className="h-full lg:col-span-3">
                            <CommonActivityTrendCard data={updatedUsersLast5Days} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4 sm:mb-6">
                        <div className="lg:col-span-1 h-full">
                            <AnimeTopDubsListCard data={topDubs} />
                        </div>
                        <div className="lg:col-span-1 h-full">
                            <AnimeTopAnimesListCard data={topAnimes} />
                        </div>
                        <div className="h-full lg:col-span-1">
                            <AnimeTopUsersListCard data={topUsers} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
