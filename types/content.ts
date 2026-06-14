export type SystemStatus =
    | "ACTIVE"
    | "EXPERIMENTAL"
    | "ARCHIVED"
    | "HYPOTHESIS";

export interface System {
    title: string;
    slug: string;
    status: SystemStatus;
    summary: string;
    since: string;
    domain: string;
    featured?: boolean;
}

export interface Experiment {
    title: string;
    slug: string;
    status: "HYPOTHESIS" | "RUNNING" | "CONCLUDED";
    summary: string;
    domain: string;
    featured?: boolean;
    updatedAt?: string;
}
