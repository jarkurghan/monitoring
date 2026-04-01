import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { MapPin } from "lucide-react";
import { Users } from "lucide-react";

export type PrayerBotMetricSummary = {
    date: { title: string; date: string; weekday: string };
    stats: { title: string; count: number }[];
};

interface PrayerBotMetricCardsProps {
    data: PrayerBotMetricSummary;
}

export function PrayerBotMetricCards({ data }: PrayerBotMetricCardsProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Card className="bg-card border border-border hover:shadow-md transition-shadow bg-white p-0 rounded-sm">
                <CardContent className="px-3 py-4 sm:px-4 sm:py-6 md:px-5 md:py-6 bg-sky-300/10 h-full">
                    <div className="flex items-start justify-between mb-1">
                        <span className="text-xs sm:text-sm md:text-base text-muted-foreground">{data.date.title}</span>
                        <div className="p-1.5 sm:p-2 bg-sky-500 rounded-xl">
                            <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                    </div>
                    <p className="text-lg sm:text-xl md:text-3xl font-semibold mb-1 sm:mb-2">{data.date.date}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-medium">{data.date.weekday}</span>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:shadow-md transition-shadow bg-white p-0 rounded-sm">
                <CardContent className="px-3 py-4 sm:px-4 sm:py-6 md:px-5 md:py-6 bg-rose-300/10 h-full">
                    <div className="flex items-start justify-between mb-1">
                        <span className="text-xs sm:text-sm md:text-base text-muted-foreground">
                            {data.stats.find((stat) => stat.title === "Hududlar soni")?.title}
                        </span>
                        <div className="p-1.5 sm:p-2 bg-rose-500 rounded-xl">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                    </div>
                    <p className="text-lg sm:text-xl md:text-3xl font-semibold mb-1 sm:mb-2">
                        {data.stats.find((stat) => stat.title === "Hududlar soni")?.count}
                    </p>
                    <div className="flex items-center gap-2">
                        {/* <span className="text-xs sm:text-sm font-medium text-[var(--color-positive)]">+0%</span> */}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:shadow-md transition-shadow bg-white p-0 rounded-sm">
                <CardContent className="px-3 py-4 sm:px-4 sm:py-6 md:px-5 md:py-6 bg-indigo-300/10 h-full">
                    <div className="flex items-start justify-between mb-1">
                        <span className="text-xs sm:text-sm md:text-base text-muted-foreground">
                            {data.stats.find((stat) => stat.title === "Barcha foydalanuvchilar soni")?.title}
                        </span>
                        <div className="p-1.5 sm:p-2 bg-indigo-500 rounded-xl">
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                    </div>
                    <p className="text-lg sm:text-xl md:text-3xl font-semibold mb-1 sm:mb-2">
                        {data.stats.find((stat) => stat.title === "Barcha foydalanuvchilar soni")?.count}
                    </p>
                    <div className="flex items-center gap-2">
                        {/* <span className="text-xs sm:text-sm font-medium text-[var(--color-positive)]">+3.1%</span> */}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:shadow-md transition-shadow bg-white p-0 rounded-sm">
                <CardContent className="px-3 py-4 sm:px-4 sm:py-6 md:px-5 md:py-6 bg-indigo-300/10 h-full">
                    <div className="flex items-start justify-between mb-1">
                        <span className="text-xs sm:text-sm md:text-base text-muted-foreground">
                            {data.stats.find((stat) => stat.title === "Aktiv foydalanuvchilar soni")?.title}
                        </span>
                        <div className="p-1.5 sm:p-2 bg-indigo-500 rounded-xl">
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                    </div>
                    <p className="text-lg sm:text-xl md:text-3xl font-semibold mb-1 sm:mb-2">
                        {data.stats.find((stat) => stat.title === "Aktiv foydalanuvchilar soni")?.count}
                    </p>
                    <div className="flex items-center gap-2">
                        {/* <span className="text-xs sm:text-sm font-medium text-[var(--color-positive)]">+1.8%</span> */}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
