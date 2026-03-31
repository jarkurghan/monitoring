"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EmptyCard() {
    return (
        <Card className="bg-card border-border h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Tezlik diagrammasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
            </CardContent>
        </Card>
    );
}
