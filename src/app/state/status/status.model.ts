export interface StatusState {
    action: string | null;
    error: any;
    currentStatus: "pending" | "loading" | "success" | "failure";
}