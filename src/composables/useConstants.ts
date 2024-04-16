import belongsToFile from '@/assets/stubs/belongsTo.txt';
import belongsToScopesFile from '@/assets/stubs/belongsToScopes.txt';


const useConstants = (): {
    BELONGS_TO(model: string): string,
    belongsToStub(): Promise<string>,
    belongsToScopes(): Promise<string>
} => {
    
    const BELONGS_TO = (model: string): string => `BelongsTo${model}`;
    const belongsToStub = async () => {
        const relationResponse = await fetch(belongsToFile);
        return await relationResponse.text();
    };

    const belongsToScopes = async () => {
        const relationResponse = await fetch(belongsToScopesFile);
        return await relationResponse.text();
    }
    
    return {
        BELONGS_TO,
        belongsToStub,
        belongsToScopes,
    }
}

export default useConstants;