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
        HAS_ONE(model: string): string,
        hasOneStub(): Promise<string>,
        hasOneScopes(): Promise<string>
        HAS_MANY(model: string): string,
        hasManyStub(): Promise<string>,
        hasManyScopes(): Promise<string>
        MORPH_TO(model: string): string,
        morphToStub(): Promise<string>,
        morphToScopes(): Promise<string>
        MORPH_ONE(model: string): string,
        morphOneStub(): Promise<string>,
        morphOneScopes(): Promise<string>
        MORPH_MANY(model: string): string,
        morphManyStub(): Promise<string>,
        morphManyScopes(): Promise<string>
        MORPH_TO_MANY(model: string): string,
        morphToManyStub(): Promise<string>,
        morphToManyScopes(): Promise<string>
        MORPH_BY_MANY(model: string): string,
        morphedByManyStub(): Promise<string>,
        morphedByManyScopes(): Promise<string>
    };
}