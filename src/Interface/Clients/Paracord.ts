import { ClientFiller } from '../ClientFiller'

/**
 * Represents the client filler for Paracord clients.
 * @private
 */
export default class Paracord extends ClientFiller {
  get userCount(): number {
    return this.client.users?.size
  }

  get serverCount(): number {
    return this.client.guilds?.size
  }

  /**
   * <warn>This client does not yet support voice connections.</warn>
   * @private
   */
  get voiceConnections(): number {
    return 0
  }

  get clientID(): string | undefined {
    return this.client.user?.id
  }

  /**
   * <warn>This client handles sharding in a way that is not supported by dbots in its current structure.</warn>
   * @private
   */
  get shard(): undefined {
    return undefined
  }
}
