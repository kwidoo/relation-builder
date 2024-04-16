import { Ref, ref } from 'vue';
import traitFile from '@/assets/stubs/trait.txt';

const useAsTrait = async (): Promise<{ trait: (namespace: string, traitName: string, output: string) => string }> => {
    const traitResponse = await fetch(traitFile);
    const traitStub: Ref<string> = ref(await traitResponse.text());

    function trait(
        namespace: string, 
        traitName: string, 
        output: string
    ): string {
        return  traitStub.value
            .replace(/{{\s*namespace\s*}}/g, namespace)
            .replace(/{{\s*traitName\s*}}/g, traitName)
            .replace(/{{\s*traitCode\s*}}/g, output);
    }

    return { trait };
};

export default useAsTrait;
