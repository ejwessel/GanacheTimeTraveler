declare module "ganache-time-traveler" {

    export type JsonRpcResponse = {
        jsonrpc: string,
        error?: any,
        id: number,
        result?: any;
    }

    /**
     * Jump forward in time.
     * @param time The amount of time to increase in seconds.
     * @returns Response 'result' will be the total time adjustment, in seconds.
     */    
    export function advanceTime(time: number): Promise<JsonRpcResponse>;

    /**
     * Force a block to be mined. Mines a block independent of whether or not mining is started or stopped.
     */
    export function advanceBlock(): Promise<JsonRpcResponse>;

    /**
     * Force a block to be mined and set the time.
     * @param time Set the clock to the specified time.
     */
    export function advanceBlockAndSetTime(time: number): Promise<JsonRpcResponse>;

    /**
     * Force a block to be mined and increase the clock by the specified seconds.
     * @param time The amount of time to increase in seconds.
     */
    export function advanceTimeAndBlock(time: number): Promise<JsonRpcResponse>;

    /**
     * Snapshot the state of the blockchain at the current block.
     * @returns Response 'result' will be the integer id of the snapshot created.
     */
    export function takeSnapshot(): Promise<JsonRpcResponse>;

    /**
     * Revert the state of the blockchain to a previous snapshot. 
     * @param id Snapt id to revert to. This will be the 'result' property from takeSnapshot().     * 
     * @returns Response 'result' will be 'true'.
     */
    export function revertToSnapshot(id: string): Promise<JsonRpcResponse>;
    
}
