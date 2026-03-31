import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { MousePointerClick } from "lucide-react";
import { UsersRound } from "lucide-react";
import { UserRound } from "lucide-react";
import { Layers } from "lucide-react";

export type MetricCardData = {
    date: { title: string; date: string; weekday: string };
    stats: { title: string; count: number }[];
};

interface InstaMetricCardsProps {
    data: {
        total_users: number;
        total_groups: number;
        total_usages: number;
        total_group_usages: number;
    };
}

export function MetricCardsInsta({ data }: InstaMetricCardsProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-card border border-border hover:shadow-md transition-shadow bg-white p-0 rounded-sm">
                <CardContent className="px-3 py-4 sm:px-4 sm:py-6 md:px-5 md:py-6 bg-rose-300/10 h-full">
                    <div className="flex items-start justify-between mb-1">
                        <span className="text-xs sm:text-sm md:text-base text-muted-foreground">Barcha foydalanuvchilar soni</span>
                        <div className="p-1.5 sm:p-2 bg-rose-500 rounded-xl">
                            <UserRound className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                    </div>
                    <p className="text-lg sm:text-xl md:text-3xl font-semibold mb-1 sm:mb-2">{data.total_users}</p>
                </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:shadow-md transition-shadow bg-white p-0 rounded-sm">
                <CardContent className="px-3 py-4 sm:px-4 sm:py-6 md:px-5 md:py-6 bg-indigo-300/10 h-full">
                    <div className="flex items-start justify-between mb-1">
                        <span className="text-xs sm:text-sm md:text-base text-muted-foreground">Barcha guruhlar soni</span>
                        <div className="p-1.5 sm:p-2 bg-indigo-500 rounded-xl">
                            <UsersRound className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                    </div>
                    <p className="text-lg sm:text-xl md:text-3xl font-semibold mb-1 sm:mb-2">{data.total_groups}</p>
                </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:shadow-md transition-shadow bg-white p-0 rounded-sm">
                <CardContent className="px-3 py-4 sm:px-4 sm:py-6 md:px-5 md:py-6 bg-orange-300/10 h-full">
                    <div className="flex items-start justify-between mb-1">
                        <span className="text-xs sm:text-sm md:text-base text-muted-foreground">Barcha foydalanishlar soni</span>
                        <div className="p-1.5 sm:p-2 bg-orange-500 rounded-xl">
                            <MousePointerClick className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                    </div>
                    <p className="text-lg sm:text-xl md:text-3xl font-semibold mb-1 sm:mb-2">{data.total_usages}</p>
                </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:shadow-md transition-shadow bg-white p-0 rounded-sm">
                <CardContent className="px-3 py-4 sm:px-4 sm:py-6 md:px-5 md:py-6 bg-sky-300/10 h-full">
                    <div className="flex items-start justify-between mb-1">
                        <span className="text-xs sm:text-sm md:text-base text-muted-foreground">Barcha guruh foydalanishlar soni</span>
                        <div className="p-1.5 sm:p-2 bg-sky-500 rounded-xl">
                            <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                    </div>
                    <p className="text-lg sm:text-xl md:text-3xl font-semibold mb-1 sm:mb-2">{data.total_group_usages}</p>
                </CardContent>
            </Card>
        </div>
    );
}
