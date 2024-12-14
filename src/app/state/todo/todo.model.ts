
export interface Todo {
    id?: string;
    ownerId: string;
    title: string;
    content: string;
    status: 'scheduled' | 'started' | 'finished';
}

export interface TodoToUpdate {
    title?: string;
    content?: string;
    status?: 'scheduled' | 'started' | 'finished';
}