import { CustomerOrders } from "@/components/dashboard/customer-orders";
import { ProfitChart } from "@/components/dashboard/profit-chart";
import { TopProducts } from "@/components/dashboard/top-products";
import { MetricCards } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { SalesMap } from "@/components/dashboard/sales-map";
import { Map } from "@/components/dashboard/map";
import { Button } from "@/components/ui/button";
import { getLastActivities } from "@/services";
import { getActivePerTimes } from "@/services";
import { getLatestUsers } from "@/services";
import { getUserStatus } from "@/services";
import { getMap } from "@/services";
import { ExternalLink } from "lucide-react";
import { getTitles } from "@/services";
import { Bell } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
    const response = await Promise.all([getActivePerTimes(), getLatestUsers(), getLastActivities(), getUserStatus(), getTitles(), getMap()]);
    const [activePerTimes, latestUsers, updatedUsersLast5Days, userStatus, activeUsersAndCities, mapData] = response;

    return (
        <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
            <div className="max-w-[1400px] mx-auto">
                <PageHeader title="Bot statistikasi" description="Namoz vaqtlari boti foydalanuvchilari bo'yicha statistika">
                    <Link href="https://t.me/meni_botlarim" target="_blank">
                        <Button variant="outline" className="flex items-center gap-2 bg-transparent text-sm">
                            <Bell className="w-4 h-4" />
                            Bot yangiliklari
                        </Button>
                    </Link>
                    <Link href="https://t.me/bugungi_namoz_bot" target="_blank">
                        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                            <ExternalLink className="w-4 h-4" />
                            Botga o'tish
                        </Button>
                    </Link>
                </PageHeader>

                <MetricCards data={activeUsersAndCities} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                    <div className="lg:col-span-2">
                        <ProfitChart data={activePerTimes} />
                    </div>
                    <div>
                        <TopProducts latest={latestUsers} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
                    <div className="lg:col-span-2 h-full">
                        <SalesMap data={userStatus} />
                    </div>
                    <div className="h-full lg:col-span-3">
                        <CustomerOrders data={updatedUsersLast5Days} />
                    </div>
                </div>

                <Map data={mapData} />
            </div>
        </div>
    );
}
