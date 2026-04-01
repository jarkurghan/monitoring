import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";

export type PrayerLatestSubscriber = {
    id: number;
    city: string | null;
    region: string | null;
    time: string | null;
    status: string;
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "Boshqa":
            return "bg-amber-100 text-amber-800";
        case "Aktiv":
            return "bg-green-100 text-green-800";
        case "Yangi":
            return "bg-blue-100 text-blue-800";
        case "Inactive":
            return "bg-gray-100 text-gray-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

interface PrayerLatestSubscribersCardProps {
    data: PrayerLatestSubscriber[];
}

export function PrayerLatestSubscribersCard({ data }: PrayerLatestSubscribersCardProps) {
    return (
        <Card className="bg-card border-border h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Oxirgi obuna bo'lganlar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {data.slice(0, 4).map((row, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-14 text-xs bg-muted text-muted-foreground rounded-full p-2 flex items-center justify-center">{row.id}</div>
                            {row.city ? (
                                <div>
                                    <p className="text-sm font-medium">{row.city}</p>
                                    <p className="text-xs text-muted-foreground">{row.region}</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-sm font-medium">—</p>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-between w-40">
                            <span className="text-sm font-medium">{row.time || "—"}</span>
                            <Badge variant="secondary" className={getStatusColor(row.status)}>
                                {row.status}
                            </Badge>
                        </div>
                    </div>
                ))}
                <div className="px-2">...</div>
            </CardContent>
        </Card>
    );
}
