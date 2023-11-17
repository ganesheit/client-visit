export interface AgendaDetail {
    fromDate: Date;
    toDate: Date;
    duration: string;
    agendaTitle: string;
    agendaDescription: string;
    rabobankParticipants: string;
    cognizantParticipant: string;
    clientProposedTopics: string;
    dressCode: string;
    venue: string;
    comments: string;
    id?: string;
    presenters?: string;
  }