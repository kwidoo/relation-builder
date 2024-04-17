declare module '@composables' {
    export function useAsTrait(): 
    Promise<{ trait: (
        namespace: string, 
        traitName: string, 
        output: string
    ) => string }>;

    export function useHighlight(): {
        highlight: (code: string) => string
    };

    export function useConstants(): {
        BELONGS_TO(model: string): string,
        belongsToStub(): Promise<string>,
        belongsToScopes(): Promise<string>
        BELONGS_TO_MANY(model: string): string,
        belongsToManyStub(): Promise<string>,
        belongsToManyScopes(): Promise<string>
        hasManyThroughStub(): Promise<string>,
        HAS_MANY_THROUGH(model: string): string
        hasManyThroughScopes(): Promise<string>
    };
}