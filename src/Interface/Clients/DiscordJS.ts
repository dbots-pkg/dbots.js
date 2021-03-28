import { AnyObject } from '../../Utils/Util'
import { Shard } from '../../Utils/Constants'
import { ClientFiller } from '../ClientFiller'

/**
 * Represents the client filler for discord.js clients.
 * @private
 */
export default class DiscordJS extends ClientFiller {
  get userCount(): number {
    if (this.client.guilds?.constructor?.name === 'GuildManager')
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
    if (
      (this.client.shard?.ids && this.client.shard?.ids.length !== 1) ||
      this.client.options?.shards instanceof Array
    )
      // v12 unsupported
      return undefined

    if (this.client.shard?.id)
      // v11
      return {
        id: this.client.shard.id,
        count: this.client.shard.count
      }

    if (this.client.shard?.ids)
      // v12 supported, using a ShardingManager
      return {
        id: this.client.shard.ids[0],
        count: this.client.shard.count
      }

    if (typeof this.client.options?.shards == 'number')
      // v12 supported, manual
      return {
        id: this.client.options.shards,
        count: this.client.options.shardCount
      }

    return undefined
  }
}
