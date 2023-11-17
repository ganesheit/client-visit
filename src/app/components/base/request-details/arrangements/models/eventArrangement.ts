import { Arrangement } from "./arrangement";
import { EventItem } from "./eventItem";

export interface EventArrangement extends Arrangement {
    title: string;
    description: string;
    type: string;
    startTime: string;
    endTime: string;
    place: string;
    totalMembers: number;
    agendaDetailId: number;
    items: EventItem[];
}