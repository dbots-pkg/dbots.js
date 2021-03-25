import { AnyObject } from '../../Utils/Util'
import { ClientFiller } from '../ClientFiller'

/**
 * Represents the client filler for Paracord clients.
 * @private
 */
export default class Paracord extends ClientFiller {
  get userCount() {
    if (!this.client.guilds) return undefined
    return Array.from(this.client.guilds.values as ArrayLike<AnyObject>).reduce(
      (count: number, guild: AnyObject) => count + guild.member_count,
      0
    )
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
