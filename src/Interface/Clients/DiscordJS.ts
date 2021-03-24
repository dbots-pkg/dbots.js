import { AnyObject } from '../../Utils/Util'
import { Shard } from '../../Utils/Constants'
import { ClientFiller } from '../ClientFiller'

/**
 * Represents the client filler for discord.js clients.
 * @private
 */
export default class DiscordJS extends ClientFiller {
  get userCount(): number {
    if (this.client.guilds?.constructor?.name === 'UserManager')
      return this.client.guilds?.cache?.reduce(
        (count: number, guild: AnyObject) => count + guild.memberCount,
        0
      )
    else
      return this.client.guilds?.reduce(
        (count: number, guild: AnyObject) => count + guild.memberCount,
        0
      )
  }

  get serverCount(): number {
    if (this.client.guilds?.constructor?.name === 'GuildManager')
      return this.client.guilds?.cache?.size
    else return this.client.guilds?.size
  }

  get voiceConnections(): number {
    if (this.client.voice) return this.client.voice.broadcasts?.length || 0
    else return this.client.broadcasts?.size
  }

  get clientID(): string | undefined {
    return this.client.user?.id
  }

  get shard(): Shard | undefined {
    return this.client.shard
      ? {
          id: this.client.shard.id,
          count: this.client.shard.count
        }
      : undefined
  }
}
