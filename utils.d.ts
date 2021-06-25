declare module "ganache-time-traveler" {

    export type JsonRpcResponse = {
        jsonrpc: string,
        error?: any,
        id: number,
        result?: any;
    }

    export function advanceTime(time: number): Promise<JsonRpcResponse>;
    export function advanceBlock(): Promise<JsonRpcResponse>;
    export function advanceBlockAndSetTime(time: number): Promise<JsonRpcResponse>;
    export function advanceTimeAndBlock(time: number): Promise<JsonRpcResponse>;
    export function takeSnapshot(): Promise<JsonRpcResponse>;
    export function revertToSnapshot(id: JsonRpcResponse): Promise<JsonRpcResponse>;
    
}