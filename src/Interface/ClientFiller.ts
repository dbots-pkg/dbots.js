import Discordie from './Clients/Discordie'
import DiscordIO from './Clients/DiscordIO'
import DiscordJS from './Clients/DiscordJS'
import Eris from './Clients/Eris'

import { Shard } from '../Utils/Constants'
import { AnyObject } from '../Utils/Util'

/**
 * A class that gets certain values from a client.
 * @private
 */
export default class ClientFiller {
  /** The client that will be used for the filler. */
  client: AnyObject

  /**
   * @param client The client that will be used
   */
  constructor(client: object) {
    this.client = client
  }

  /**
   * Gets a client filler from a library.
   * @param libraryName The name of the library to get
   * @param client The client that the library made
   */
  static get(libraryName: string, client: object): ClientFiller {
    if (!client)
      throw new Error('No client was provided!')

    switch (libraryName) {
      case 'discordie':
      case 'die': {
        return new Discordie(client)
      }

      case 'discord.io':
      case 'discordio':
      case 'd.io':
      case 'dio': {
        return new DiscordIO(client)
      }

      case 'discord.js':
      case 'discordjs':
      case 'd.js':
      case 'djs':
      case 'discord.js-commando':
      case 'discordjs-commando':
      case 'd.js-commando':
      case 'djs-commando':
      case 'commando': {
        return new DiscordJS(client)
      }

      case 'eris': {
        return new Eris(client)
      }

      default: {
        throw new Error(`Unknown client '${libraryName}'`)
      }
    }
  }

  /** Gets the amount of users the bot has cached. */
  get userCount() {
    return 0
  }

  /** Gets the amount of servers the bot has cached. */
  get serverCount() {
    return 0
  }

  /** Gets the amount of voice connectinos the bot is using. */
  get voiceConnections() {
    return 0
  }

  /** Gets the client ID (technically the user ID) of the bot. */
  get clientID(): string | undefined {
    return undefined
  }

  /** Gets the shard of the bot. */
  get shard(): Shard | undefined {
    return undefined
  }
}
