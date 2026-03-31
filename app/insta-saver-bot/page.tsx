import { PageHeader } from "@/components/dashboard/page-header";
import { ExternalLink } from "lucide-react";
import { Bell } from "lucide-react";
import { MetricCardsInsta } from "@/components/dashboard/metric-card-insta";
import { ActivityCounts } from "@/components/dashboard/activity-counts";
import { LineChartComponent } from "@/components/dashboard/line-chart";
import { TopGroupsComponent } from "@/components/dashboard/top-groups";
import { UsersCountByStatus } from "@/components/dashboard/users-count-by-status";
import { GroupsCountByStatus } from "@/components/dashboard/groups-count-by-status";
import { Header } from "@/components/dashboard/header";
import { getGroupsByStatus, getSummaryBasic, getTopGroups, getUsersByStatus, getNewestLastDays } from "@/services/insta";

export default async function DashboardPage() {
    const response = await Promise.all([getSummaryBasic(), getNewestLastDays(14), getUsersByStatus(), getGroupsByStatus(), getTopGroups(5)]);
    const [summary, newestLastDays, usersByStatus, groupsByStatus, topGroups] = response;

    const headerMenuItems = [
        { label: "Bot yangiliklari", href: "https://t.me/meni_botlarim", target: "_blank", icon: <Bell /> },
        { label: "Botga o'tish", href: "https://t.me/insta_yuklagich_bot", target: "_blank", icon: <ExternalLink /> },
    ];

    return (
        <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
            <div className="max-w-[1400px] mx-auto">
                <PageHeader title="Bot statistikasi" description="Insta saver boti foydalanuvchilari bo'yicha statistika">
                    <Header headerMenuItems={headerMenuItems} />
                </PageHeader>

                <MetricCardsInsta data={summary} />

                <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 mb-6">
                    <div className="lg:col-span-7">
                        <LineChartComponent data={newestLastDays} />
                    </div>
                    <div className="lg:col-span-4">
                        <ActivityCounts topGroups={topGroups} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                    <div className="lg:col-span-1 h-full">
                        <UsersCountByStatus data={usersByStatus} />
                    </div>
                    <div className="lg:col-span-1 h-full">
                        <GroupsCountByStatus data={groupsByStatus} />
                    </div>
                    <div className="h-full lg:col-span-1">
                        <TopGroupsComponent tops={topGroups} />
                    </div>
                </div>
            </div>
        </div>
    );
}
