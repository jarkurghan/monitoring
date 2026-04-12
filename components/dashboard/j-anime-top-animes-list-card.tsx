import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimeTopAnime } from "@/services/anime";
import { Badge } from "../ui/badge";

const getRankColor = (rank: number) => {
    switch (rank) {
        case 1:
            return "bg-gradient-to-b from-amber-200 to-amber-400 text-amber-950 border border-amber-300 shadow-sm";
        case 2:
            return "bg-gradient-to-b from-slate-100 to-slate-300 text-slate-950 border border-slate-300 shadow-sm";
        case 3:
            return "bg-gradient-to-b from-orange-200 to-orange-400 text-orange-950 border border-orange-300 shadow-sm";
        default:
            return "bg-transparent text-muted-foreground border border-border";
    }
};

interface AnimeTopAnimesListCardProps {
    data: AnimeTopAnime[];
}

export function AnimeTopAnimesListCard({ data }: AnimeTopAnimesListCardProps) {
    return (
        <Card className="bg-card border-border h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Top animelar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {data.map((row, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Badge
                                className={[
                                    "h-7 w-7 rounded-full p-0 flex items-center justify-center font-semibold tabular-nums",
                                    getRankColor(index + 1),
                                ].join(" ")}
                            >
                                {index + 1}
                            </Badge>
                            <p className="text-sm font-medium truncate max-w-[8rem] sm:max-w-[24rem] lg:max-w-[6rem] xl:max-w-[11rem]" title={row.anime_name}>
                                {row.anime_name}
                            </p>
                        </div>
                        <div className="flex items-center justify-between w-32">
                            <div className="w-14 text-xs bg-muted text-muted-foreground rounded-full p-2 flex items-center justify-center">
                                {row.today_count}
                            </div>
                            <div className="w-14 text-xs bg-muted text-muted-foreground rounded-full p-2 flex items-center justify-center">
                                {row.total_count}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="px-2">...</div>
            </CardContent>
        </Card>
    );
}
