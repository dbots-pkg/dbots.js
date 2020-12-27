import { Shard } from '../../Utils/Constants';
import { ClientFiller } from '../ClientFiller';
/**
 * Represents the client filler for discord.io clients.
 * @private
 */
export default class DiscordIO extends ClientFiller {
    get userCount(): number | undefined;
    get serverCount(): number | undefined;
    get voiceConnections(): number | undefined;
    get clientID(): string | undefined;
    get shard(): Shard | undefined;
}
