export interface FeedbackEntry {
    id: string;
    userEmail: string;
    userName: string;
    plantName: string;
    diseaseName: string;
    isAccurate: boolean;
    comment: string;
    createdAt: string;
}

const FEEDBACK_KEY = "arivision_feedbacks";

export function saveFeedback(feedback: Omit<FeedbackEntry, "id" | "createdAt">) {
    const entries = getFeedbacks();
    const newEntry: FeedbackEntry = {
        ...feedback,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
    };
    entries.unshift(newEntry);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(entries));
}

export function getFeedbacks(): FeedbackEntry[] {
    const data = localStorage.getItem(FEEDBACK_KEY);
    return data ? JSON.parse(data) : [];
}

export function clearFeedbacks() {
    localStorage.removeItem(FEEDBACK_KEY);
}
