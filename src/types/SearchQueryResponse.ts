export interface SearchQueryResponse {
    rateLimit: RateLimit
    search: Search
}

interface RateLimit {
    __typename: string
    limit: number
    cost: number
    remaining: number
    resetAt: string
}

interface Search {
    __typename: string
    repositoryCount: number
    nodes: Node[]
}

interface Node {
    __typename: string
    id: string
    name: string
    description: string
    nameWithOwner: string
    stargazerCount: number
    owner: Owner
}

interface Owner {
    __typename: string
    avatarUrl: string
}
