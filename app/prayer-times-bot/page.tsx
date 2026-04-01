import { PrayerHourlyRecipientsChart } from "@/components/dashboard/prayer-hourly-recipients-chart";
import { PrayerLatestSubscribersCard } from "@/components/dashboard/prayer-latest-subscribers-card";
import { PrayerUsersByStatusCard } from "@/components/dashboard/prayer-users-by-status-card";
import { PrayerActivityTrendCard } from "@/components/dashboard/prayer-activity-trend-card";
import { PrayerBotMetricCards } from "@/components/dashboard/prayer-bot-metric-cards";
import { PrayerRegionsMap } from "@/components/dashboard/prayer-regions-map";
import { MonitoringAppHeader } from "@/components/dashboard/app-header";
import { DashboardPageTitle } from "@/components/dashboard/app-title";
import { getLastActivities } from "@/services/pray";
import { getActivePerTimes } from "@/services/pray";
import { getLatestUsers } from "@/services/pray";
import { getUserStatus } from "@/services/pray";
import { ExternalLink } from "lucide-react";
import { getTitles } from "@/services/pray";
import { getMap } from "@/services/pray";
import { Bell } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Namoz vaqtlari bot",
    description: "Namoz vaqtlari Telegram botini monitoring qilish tizimi | Najmiddin Nazirov",
};

export default async function DashboardPage() {
    const response = await Promise.all([getActivePerTimes(), getLatestUsers(), getLastActivities(), getUserStatus(), getTitles(), getMap()]);
    const [activePerTimes, latestUsers, updatedUsersLast5Days, userStatus, activeUsersAndCities, mapData] = response;

    const headerMenuItems = [
        { label: "Bot yangiliklari", href: "https://t.me/meni_botlarim", target: "_blank", icon: <Bell /> },
        { label: "Botga o'tish", href: "https://t.me/bugungi_namoz_bot", target: "_blank", icon: <ExternalLink /> },
    ];

    return (
        <div className="min-h-screen bg-background p-0 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-[1400px] mx-auto">
                <DashboardPageTitle title="Bot statistikasi" description="Namoz vaqtlari boti foydalanuvchilari bo'yicha statistika">
                    <MonitoringAppHeader headerMenuItems={headerMenuItems} />
                </DashboardPageTitle>
                <div className="px-2 sm:p-0">
                    <PrayerBotMetricCards data={activeUsersAndCities} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4 sm:mb-6">
                        <div className="lg:col-span-2">
                            <PrayerHourlyRecipientsChart data={activePerTimes} />
                        </div>
                        <div>
                            <PrayerLatestSubscribersCard data={latestUsers} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4 sm:mb-6">
                        <div className="lg:col-span-2 h-full">
                            <PrayerUsersByStatusCard data={userStatus} />
                        </div>
                        <div className="h-full lg:col-span-3">
                            <PrayerActivityTrendCard data={updatedUsersLast5Days} />
                        </div>
                    </div>

                    <PrayerRegionsMap data={mapData} />
                </div>
            </div>
        </div>
    );
}
