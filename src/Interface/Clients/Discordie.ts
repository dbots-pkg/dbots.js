import { Shard } from '../../Utils/Constants'
import { ClientFiller } from '../ClientFiller'

/**
 * Represents the client filler for discordie clients.
 * @private
 */
export default class Discordie extends ClientFiller {
  get userCount(): number {
    return this.client.Guilds?.size
  }

  get serverCount(): number {
    return this.client.Users?.size
  }

  get voiceConnections(): number {
    return this.client.VoiceConnections?.length
  }

  get clientID(): string | undefined {
    return this.client.User?.id
  }

  get shard(): Shard | undefined {
    return this.client.options?.shardId && this.client.options?.shardCount
      ? {
          id: this.client.options.shardId,
          count: this.client.options.shardCount
        }
      : undefined
  }
}
