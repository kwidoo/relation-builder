import belongsToFile from '@/assets/stubs/belongsTo.txt';
import belongsToScopesFile from '@/assets/stubs/belongsToScopes.txt';
import belongsToManyFile from '@/assets/stubs/belongsToMany.txt';
import belongsToManyScopesFile from '@/assets/stubs/belongsToManyScopes.txt';
import hasManyThroughFile from '@/assets/stubs/hasManyThrough.txt';
import hasManyThroughScopesFile from '@/assets/stubs/hasManyThroughScopes.txt';
import hasOneFile from '@/assets/stubs/hasOne.txt';
import hasOneScopesFile from '@/assets/stubs/hasOneScopes.txt';
import hasManyFile from '@/assets/stubs/hasMany.txt';
import hasManyScopesFile from '@/assets/stubs/hasManyScopes.txt';
import morphManyFile from '@/assets/stubs/morphMany.txt';
import morphManyScopesFile from '@/assets/stubs/morphManyScopes.txt';
import morphOneFile from '@/assets/stubs/morphOne.txt';
import morphOneScopesFile from '@/assets/stubs/morphOneScopes.txt';
import morphToFile from '@/assets/stubs/morphTo.txt';
import morphToScopesFile from '@/assets/stubs/morphToScopes.txt';
import morphTiManyFile from '@/assets/stubs/morphToMany.txt';
import morphToManyScopesFile from '@/assets/stubs/morphToManyScopes.txt';
import morphedByManyFile from '@/assets/stubs/morphedByMany.txt';
import morphedByManyScopesFile from '@/assets/stubs/morphedByManyScopes.txt';
import hasOneThroughFile from '@/assets/stubs/hasOneThrough.txt';
import hasOneThroughScopesFile from '@/assets/stubs/hasOneThroughScopes.txt';



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
    HAS_ONE_THROUGH(model: string): string,
    hasOneThroughStub(): Promise<string>,
    hasOneThroughScopes(): Promise<string>
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
    MORPHED_BY_MANY(model: string): string,
    morphedByManyStub(): Promise<string>,
    morphedByManyScopes(): Promise<string>
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

    const HAS_ONE = (model: string): string => `HasOne${model}`;

    const hasOneStub = async () => {
        const relationResponse = await fetch(hasOneFile);
        return await relationResponse.text();
    };

    const hasOneScopes = async () => {
        const relationResponse = await fetch(hasOneScopesFile);
        return await relationResponse.text();
    }

    const HAS_MANY = (model: string): string => `HasMany${model}`;
    
    const hasManyStub = async () => {
        const relationResponse = await fetch(hasManyFile);
        return await relationResponse.text();
    };

    const hasManyScopes = async () => {
        const relationResponse = await fetch(hasManyScopesFile);
        return await relationResponse.text();
    }

    const MORPH_TO = (model: string): string => `MorphTo${model}`;

    const morphToStub = async () => {
        const relationResponse = await fetch(morphToFile);
        return await relationResponse.text();
    };

    const morphToScopes = async () => {
        const relationResponse = await fetch(morphToScopesFile);
        return await relationResponse.text();
    }

    const MORPH_ONE = (model: string): string => `MorphOne${model}`;

    const morphOneStub = async () => {
        const relationResponse = await fetch(morphOneFile);
        return await relationResponse.text();
    };

    const morphOneScopes = async () => {
        const relationResponse = await fetch(morphOneScopesFile);
        return await relationResponse.text();
    }

    const MORPH_MANY = (model: string): string => `MorphMany${model}`;

    const morphManyStub = async () => {
        const relationResponse = await fetch(morphManyFile);
        return await relationResponse.text();
    };

    const morphManyScopes = async () => {
        const relationResponse = await fetch(morphManyScopesFile);
        return await relationResponse.text();
    }

    const MORPH_TO_MANY = (model: string): string => `MorphToMany${model}`;

    const morphToManyStub = async () => {
        const relationResponse = await fetch(morphTiManyFile);
        return await relationResponse.text();
    };

    const morphToManyScopes = async () => {
        const relationResponse = await fetch(morphToManyScopesFile);
        return await relationResponse.text();
    }

    const MORPHED_BY_MANY = (model: string): string => `MorphedByMany${model}`;

    const morphedByManyStub = async () => {
        const relationResponse = await fetch(morphedByManyFile);
        return await relationResponse.text();
    };

    const morphedByManyScopes = async () => {
        const relationResponse = await fetch(morphedByManyScopesFile);
        return await relationResponse.text();
    }
    
    const BELONGS_TO_MANY = (model: string): string => `BelongsToMany${model}`;

    const belongsToManyStub = async () => {
        const relationResponse = await fetch(belongsToManyFile); 
        return await relationResponse.text();
    };

    const belongsToManyScopes = async () => {
        const relationResponse = await fetch(belongsToManyScopesFile);
        return await relationResponse.text();
    };

    const HAS_MANY_THROUGH = (model: string): string => `HasManyThrough${model}`;

    const hasManyThroughStub = async () => {
        const relationResponse = await fetch(hasManyThroughFile);
        return await relationResponse.text();
    };

    const hasManyThroughScopes = async () => {
        const relationResponse = await fetch(hasManyThroughScopesFile); 
        return await relationResponse.text();
    };

    const HAS_ONE_THROUGH = (model: string): string => `HasOneThrough${model}`;

    const hasOneThroughStub = async () => {
        const relationResponse = await fetch(hasOneThroughFile);
        return await relationResponse.text();
    };

    const hasOneThroughScopes = async () => {
        const relationResponse = await fetch(hasOneThroughScopesFile);
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
        HAS_ONE,
        hasOneStub,
        hasOneScopes,
        HAS_MANY,
        hasManyStub,
        hasManyScopes,
        MORPH_TO,
        morphToStub,
        morphToScopes,
        MORPH_ONE,
        morphOneStub,
        morphOneScopes,
        MORPH_MANY,
        morphManyStub,
        morphManyScopes,
        MORPH_TO_MANY,
        morphToManyStub,
        morphToManyScopes,
        MORPHED_BY_MANY,
        morphedByManyStub,
        morphedByManyScopes,
        HAS_ONE_THROUGH,
        hasOneThroughStub,
        hasOneThroughScopes,
    }
}

export default useConstants;