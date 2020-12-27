import { Shard } from '../../Utils/Constants'
import { ClientFiller } from '../ClientFiller'

/**
 * Represents the client filler for discord.io clients.
 * @private
 */
export default class DiscordIO extends ClientFiller {
  get userCount() {
    if (!this.client.users) return undefined
    return Object.keys(this.client.users).length
  }

  get serverCount() {
    if (!this.client.servers) return undefined
    return Object.keys(this.client.servers).length
  }

  get voiceConnections() {
    if (!this.client._vChannels) return undefined
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
