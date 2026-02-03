import type {ProjectAssignee} from "@/types/ProjectAssignee.ts";
import type {ProjectLabel} from "@/types/ProjectLabel.ts";

export type ProjectItem = {
    organisation: string;
    projectNumber: number;
    issueNumber: number;
    title: string;
    url: string;
    status: string;
    assignees: ProjectAssignee[],
    createdAt: string; // e.g. "2026-02-02T03:55:39Z",
    updatedAt: string;
    labels: ProjectLabel[];
}