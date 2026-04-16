import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { MovieSummaryBasic } from "@/services/movie";
import { Clapperboard, ListVideo, UserCheck, Users } from "lucide-react";

interface MovieSummaryMetricCardsProps {
    data: MovieSummaryBasic;
}

export function MovieSummaryMetricCards({ data }: MovieSummaryMetricCardsProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Card className="bg-card border border-border hover:shadow-md transition-shadow bg-white p-0 rounded-sm">
                <CardContent className="px-3 py-4 sm:px-4 sm:py-6 md:px-5 md:py-6 bg-violet-500/10 h-full">
                    <div className="flex items-start justify-between mb-1">
                        <span className="text-xs sm:text-sm md:text-base text-muted-foreground">Barcha multfilmlar soni</span>
                        <div className="p-1.5 sm:p-2 bg-violet-600 rounded-xl">
                            <Clapperboard className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                    </div>
                    <p className="text-lg sm:text-xl md:text-3xl font-semibold mb-1 sm:mb-2">{data.total_movies}</p>
                </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:shadow-md transition-shadow bg-white p-0 rounded-sm">
                <CardContent className="px-3 py-4 sm:px-4 sm:py-6 md:px-5 md:py-6 bg-sky-500/10 h-full">
                    <div className="flex items-start justify-between mb-1">
                        <span className="text-xs sm:text-sm md:text-base text-muted-foreground">Barcha ko'rishlar soni</span>
                        <div className="p-1.5 sm:p-2 bg-sky-600 rounded-xl">
                            <ListVideo className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                    </div>
                    <p className="text-lg sm:text-xl md:text-3xl font-semibold mb-1 sm:mb-2">{data.total_uses}</p>
                </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:shadow-md transition-shadow bg-white p-0 rounded-sm">
                <CardContent className="px-3 py-4 sm:px-4 sm:py-6 md:px-5 md:py-6 bg-emerald-500/10 h-full">
                    <div className="flex items-start justify-between mb-1">
                        <span className="text-xs sm:text-sm md:text-base text-muted-foreground">Barcha foydalanuvchilar soni</span>
                        <div className="p-1.5 sm:p-2 bg-emerald-600 rounded-xl">
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                    </div>
                    <p className="text-lg sm:text-xl md:text-3xl font-semibold mb-1 sm:mb-2">{data.total_users}</p>
                </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:shadow-md transition-shadow bg-white p-0 rounded-sm">
                <CardContent className="px-3 py-4 sm:px-4 sm:py-6 md:px-5 md:py-6 bg-amber-500/10 h-full">
                    <div className="flex items-start justify-between mb-1">
                        <span className="text-xs sm:text-sm md:text-base text-muted-foreground">Aktiv foydalanuvchilar soni</span>
                        <div className="p-1.5 sm:p-2 bg-amber-600 rounded-xl">
                            <UserCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                    </div>
                    <p className="text-lg sm:text-xl md:text-3xl font-semibold mb-1 sm:mb-2">{data.total_active_users}</p>
                </CardContent>
            </Card>
        </div>
    );
}
