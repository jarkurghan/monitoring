import type { MovieLatestMovies } from "@/services/movie";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MovieLatestMoviesTableCardProps {
    data: MovieLatestMovies[];
    limit?: number;
}

export function MovieLatestMoviesTableCard({ data }: MovieLatestMoviesTableCardProps) {
    return (
        <Card className="bg-card border-border h-full gap-4">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-medium">Oxirgi qo‘shilgan multfilmlar</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm">
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-6 text-center text-muted-foreground">
                                        Hozircha ma’lumot yo‘q
                                    </td>
                                </tr>
                            ) : (
                                data.map((row, idx) => (
                                    <tr key={`${row.movie_name}-${idx}`} className="border-b border-border/60 last:border-b-0 hover:bg-muted/30">
                                        <td className="py-2 pr-3">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium truncate max-w-[10rem]" title={row.movie_name}>
                                                    {row.movie_name}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="py-2 pr-3 tabular-nums">
                                            {row.quality?.map((quality, index) => (
                                                <Badge key={index} variant="outline" className="bg-emerald-100 text-emerald-900 ml-1">
                                                    {quality}
                                                </Badge>
                                            ))}
                                        </td>
                                        <td className="py-2 pr-3 text-right">
                                            <Badge variant="outline" className="text-muted-foreground">
                                                {row.code}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-2 font-bold text-xs text-muted-foreground">...</div>
            </CardContent>
        </Card>
    );
}
