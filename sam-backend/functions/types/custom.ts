export type User = {
    id: string,
    federated_id: string,
    currentUnixTime: number,
    pricingPlan: "basic" | "pro" | "enterprise"
}