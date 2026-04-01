import { InstaWeeklyUsersGroupsChart } from "@/components/dashboard/insta-weekly-users-groups-chart";
import { InstaBotSummaryMetricCards } from "@/components/dashboard/insta-bot-summary-metric-cards";
import { InstaGroupsStatusPieCard } from "@/components/dashboard/insta-groups-status-pie-card";
import { InstaUsersStatusPieCard } from "@/components/dashboard/insta-users-status-pie-card";
import { InstaTopGroupsListCard } from "@/components/dashboard/insta-top-groups-list-card";
import { InstaTopGroupsBarChart } from "@/components/dashboard/insta-top-groups-bar-chart";
import { MonitoringAppHeader } from "@/components/dashboard/app-header";
import { DashboardPageTitle } from "@/components/dashboard/app-title";
import { getGroupsByStatus } from "@/services/insta";
import { getUsersByStatus } from "@/services/insta";
import { getSummaryBasic } from "@/services/insta";
import { getWeeklyCount } from "@/services/insta";
import { getTopGroups } from "@/services/insta";
import { ExternalLink } from "lucide-react";
import { Bell } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Insta saver bot",
    description: "Insta saver Telegram botini monitoring qilish tizimi | Najmiddin Nazirov",
};

export default async function DashboardPage() {
    const response = await Promise.all([getSummaryBasic(), getWeeklyCount(14), getUsersByStatus(), getGroupsByStatus(), getTopGroups(5)]);
    const [summary, newest, usersByStatus, groupsByStatus, topGroups] = response;

    const headerMenuItems = [
        { label: "Bot yangiliklari", href: "https://t.me/meni_botlarim", target: "_blank", icon: <Bell /> },
        { label: "Botga o'tish", href: "https://t.me/insta_yuklagich_bot", target: "_blank", icon: <ExternalLink /> },
    ];

    return (
        <div className="min-h-screen bg-background p-0 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-[1400px] mx-auto">
                <DashboardPageTitle title="Bot statistikasi" description="Insta saver boti foydalanuvchilari bo'yicha statistika">
                    <MonitoringAppHeader headerMenuItems={headerMenuItems} />
                </DashboardPageTitle>

                <div className="px-2 sm:p-0">
                    <InstaBotSummaryMetricCards data={summary} />

                    <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 mb-4 sm:mb-6">
                        <div className="lg:col-span-7">
                            <InstaWeeklyUsersGroupsChart data={newest} />
                        </div>
                        <div className="lg:col-span-4">
                            <InstaTopGroupsBarChart data={topGroups} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4 sm:mb-6">
                        <div className="lg:col-span-1 h-full">
                            <InstaUsersStatusPieCard data={usersByStatus} />
                        </div>
                        <div className="lg:col-span-1 h-full">
                            <InstaGroupsStatusPieCard data={groupsByStatus} />
                        </div>
                        <div className="h-full lg:col-span-1">
                            <InstaTopGroupsListCard data={topGroups} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
