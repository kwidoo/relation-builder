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
    };
}