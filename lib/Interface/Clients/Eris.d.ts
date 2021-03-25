import { ClientFiller } from '../ClientFiller';
/**
 * Represents the client filler for Eris clients.
 * @private
 */
export default class Eris extends ClientFiller {
    get userCount(): number;
    get serverCount(): number;
    get voiceConnections(): number;
    get clientID(): string | undefined;
    /**
     * <warn>This client does not natively support sharding.</warn>
     * @private
     */
    get shard(): undefined;
}
