import type { ReactNode } from "react";

interface DashboardPageTitleProps {
    title: string;
    description: string;
    children?: ReactNode;
}

export function DashboardPageTitle({ title, description, children }: DashboardPageTitleProps) {
    return (
        <div className="flex items-start sm:items-center justify-start sm:justify-between flex-col-reverse sm:flex-row mb-4 gap-2">
            <div className="px-3 sm:px-0">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            {children}
        </div>
    );
}
