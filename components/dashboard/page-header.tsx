import type { ReactNode } from "react";

interface PageHeaderProps {
    title: string;
    description: string;
    children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
    return (
        <div className="flex items-start sm:items-center justify-start sm:justify-between flex-col-reverse sm:flex-row mb-6 gap-4">
            <div className="px-1 sm:px-0">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            {children}
        </div>
    );
}
