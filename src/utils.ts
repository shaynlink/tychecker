import type {
    PipelineObject,
    InsertStateFn
} from './types';

export function newRefRegex(rgx: RegExp): RegExp {
    return new RegExp(rgx.source, rgx.flags);
}

export function parseData(data: any | [any, string]) {
    if (Array.isArray(data)) return [data[0], data[1]];
    else return [data, null];
}

export function initiateState(refPipeline: PipelineObject[]): InsertStateFn {
    return  function(pass: boolean, test: string, config: any, origin: any, key?: string) {
        refPipeline.push({
            pass,
            test,
            config,
            origin,
            key
        });

        return refPipeline;
    }
}