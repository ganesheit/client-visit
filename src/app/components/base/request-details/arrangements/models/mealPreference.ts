export interface MealPreference {
    type: string;
    menu: string;
    totalMembers: number;
    comments?: string;
    editMode?: boolean;
}