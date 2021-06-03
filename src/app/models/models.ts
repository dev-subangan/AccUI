export interface MasterType {
    id: number;
    name: string;
}

export interface ExpenditureType {
    id: number;
    name: string;
    subTypes?: ExpenditureType[];
}