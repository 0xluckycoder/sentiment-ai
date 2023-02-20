export type UserRequest = {
    id: string,
    federated_id: string,
    currentUnixTime: number,
    pricingPlan: "basic" | "pro" | "enterprise"
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