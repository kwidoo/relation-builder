import belongsToFile from '@/assets/stubs/belongsTo.txt';
import belongsToScopesFile from '@/assets/stubs/belongsToScopes.txt';
import belongsToManyFile from '@/assets/stubs/belongsToMany.txt';
import belongsToManyScopesFile from '@/assets/stubs/belongsToManyScopes.txt';
import hasManyThroughFile from '@/assets/stubs/hasManyThrough.txt';
import hasManyThroughScopesFile from '@/assets/stubs/hasManyThroughScopes.txt';


const useConstants = (): {
    BELONGS_TO(model: string): string,
    belongsToStub(): Promise<string>,
    belongsToScopes(): Promise<string>
    BELONGS_TO_MANY(model: string): string,
    belongsToManyStub(): Promise<string>,
    belongsToManyScopes(): Promise<string>
    HAS_MANY_THROUGH(model: string): string,
    hasManyThroughStub(): Promise<string>,
    hasManyThroughScopes(): Promise<string>
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

    // Define a function to generate the relation name based on the model.
    const BELONGS_TO_MANY = (model: string): string => `BelongsToMany${model}`;

    // Function to fetch the stub file for a "belongs to many" relationship.
    const belongsToManyStub = async () => {
        const relationResponse = await fetch(belongsToManyFile); // Ensure 'belongsToManyFile' is defined and holds the correct path
        return await relationResponse.text();
    };

    // Function to fetch scopes associated with a "belongs to many" relationship.
    const belongsToManyScopes = async () => {
        const relationResponse = await fetch(belongsToManyScopesFile); // Ensure 'belongsToManyScopesFile' is defined and holds the correct path
        return await relationResponse.text();
    };

    // Define a function to generate the relation name based on the model.
    const HAS_MANY_THROUGH = (model: string): string => `HasManyThrough${model}`;

    // Function to fetch the stub file for a "belongs to many" relationship.
    const hasManyThroughStub = async () => {
        const relationResponse = await fetch(hasManyThroughFile); // Ensure 'belongsToManyFile' is defined and holds the correct path
        return await relationResponse.text();
    };

    // Function to fetch scopes associated with a "belongs to many" relationship.
    const hasManyThroughScopes = async () => {
        const relationResponse = await fetch(hasManyThroughScopesFile); // Ensure 'belongsToManyScopesFile' is defined and holds the correct path
        return await relationResponse.text();
    };


    return {
        BELONGS_TO,
        belongsToStub,
        belongsToScopes,
        BELONGS_TO_MANY,
        belongsToManyStub,
        belongsToManyScopes,
        HAS_MANY_THROUGH,
        hasManyThroughStub,
        hasManyThroughScopes,
    }
}

export default useConstants;