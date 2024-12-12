
export interface Todo {
    id: string;
    title: string;
    content: string;
    status: 'wating' | 'started' | 'finished';
}