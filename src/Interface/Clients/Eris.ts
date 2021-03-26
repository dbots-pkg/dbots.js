import { AnyObject } from '../../Utils/Util'
import { ClientFiller } from '../ClientFiller'

/**
 * Represents the client filler for Eris clients.
 * @private
 */
export default class Eris extends ClientFiller {
  get userCount(): number {
    return this.client.guilds?.reduce(
      (count: number, guild: AnyObject) => count + guild.memberCount,
      0
    )
  }

  get serverCount(): number {
    return this.client.guilds?.size
  }

  get voiceConnections(): number {
    if (
      this.client.voiceConnections?.constructor?.name ===
      'VoiceConnectionManager'
    )
      return this.client.voiceConnections?.size
    else
      return (
        this.client.voiceConnections?.pendingGuilds &&
        Object.keys(this.client.voiceConnections.pendingGuilds).length
      )
  }

  get clientID(): string | undefined {
    return this.client.user?.id
  }

  /**
   * <warn>This client does not natively support sharding.</warn>
   * @private
   */
  get shard(): undefined {
    return undefined
  }
}
