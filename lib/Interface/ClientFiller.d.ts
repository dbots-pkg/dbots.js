import { Library, Shard } from '../Utils/Constants';
import { AnyObject } from '../Utils/Util';
/**
 * A class that gets certain values from a client.
 * @private
 */
export declare class ClientFiller {
    /** The client that will be used for the filler. */
    client: AnyObject;
    /**
     * @param client The client that will be used
     */
    constructor(client: object);
    /** Gets the amount of users the bot has cached. */
    get userCount(): number | undefined;
    /** Gets the amount of servers the bot has cached. */
    get serverCount(): number | undefined;
    /** Gets the amount of voice connectinos the bot is using. */
    get voiceConnections(): number | undefined;
    /** Gets the client ID (technically the user ID) of the bot. */
    get clientID(): string | undefined;
    /** Gets the shard of the bot. */
    get shard(): Shard | undefined;
}
/**
 * Gets a client filler from a library.
 * @param libraryName The name of the library to get
 * @param client The client that the library made
 */
export declare function getClientFiller(libraryName: Library, client: object): ClientFiller;
