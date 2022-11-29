export interface RepoQueryResponse {
    rateLimit: RateLimit
    repository: Repository
}

interface RateLimit {
    __typename: string
    limit: number
    cost: number
    remaining: number
    resetAt: string
}

interface Repository {
    __typename: string
    defaultBranchRef: DefaultBranchRef
}

interface DefaultBranchRef {
    __typename: string
    target: Target
}

interface Target {
    __typename: string
    history: History
}

interface History {
    __typename: string
    totalCount: number
    edges: Edge[]
}

interface Edge {
    __typename: string
    node: Node
    cursor: string
}

interface Node {
    __typename: string
    committedDate: string
    deletions: number
    additions: number
    id: string
}
