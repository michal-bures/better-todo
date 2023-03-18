export type Urgency = 'low' | 'medium' | 'high' | 'critical'

export interface Topic {
    title: string,
    actionItems: Array<string>,
    urgency: Urgency,
    completed?: Date,
    deadline?: Date
}
