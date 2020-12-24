import { Shard } from '../../Utils/Constants';
import { ClientFiller } from '../ClientFiller';
/**
 * Represents the client filler for discord.io clients.
 * @private
 */
export default class DiscordIO extends ClientFiller {
    get userCount(): number;
    get serverCount(): number;
    get voiceConnections(): number;
    get clientID(): string | undefined;
    get shard(): Shard | undefined;
}
