import { Shard } from '../../Utils/Constants'
import ClientFiller from '../ClientFiller'

/**
 * Represents the client filler for discord.io clients.
 * @private
 */
export default class DiscordIO extends ClientFiller {
  get userCount() {
    return Object.keys(this.client.users).length
  }

  get serverCount() {
    return Object.keys(this.client.servers).length
  }

  get voiceConnections() {
    return Object.keys(this.client._vChannels).length
  }

  get clientID(): string | undefined {
    return this.client.id
  }

  get shard(): Shard | undefined {
    return this.client._shard
      ? {
          id: this.client._shard[0],
          count: this.client._shard[1]
        }
      : undefined
  }
}
