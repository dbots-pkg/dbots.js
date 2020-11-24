import ClientFiller from '../ClientFiller';
/**
 * Represents the client filler for Paracord clients.
 * @private
 */
export default class Paracord extends ClientFiller {
    get userCount(): number;
    get serverCount(): number;
    /**
     * <warn>This client does not yet support voice connections.</warn>
     * @private
     */
    get voiceConnections(): number;
    get clientID(): string | undefined;
    /**
     * <warn>This client handles sharding in a way that is not supported by dbots in its current structure.</warn>
     * @private
     */
    get shard(): undefined;
}
