export type ExpressionObject = {
    [key: string]: any
}

export type ReviewRequest = {
    product_id: string,
    id: string,
    user_federated_id: string,
    title?: string,
    description: string,
    star_rate?: number,
    occupation?: string,
    // sentiment_rate: string,
    // automated_suggestion: string[],
    // sentiments: string,
    // automated_reply: string,
    // sent_reply: string,
    created_at: number,
    updated_at: number
}

export type UserRequest = {
    id: string,
    federated_id: string,
    user_created_at: number,
    pricing_plan: "basic" | "pro" | "enterprise"
}

export type ProductRequest = {
    id: string,
    user_id: string,
    title: string
}

export type UserTableObject = {
    id?: unknown,
    federated_id?: string,
    is_unpaid?: boolean,
    last_payment_date?: number,
    pricing_plan?: string,
    remaining_reviews?: number,
    user_created_at?: number
}

export type constructedResponseType = {
    [key: string]: string
}

export type ErrorTypes = {
    [key: string]: number
} 