module.exports = {
  Poster: require('./Interface/Poster'),

  Arcane: require('./Interface/Lists/Arcane'),
  BotListSpace: require('./Interface/Lists/BotListSpace'),
  BotsForDiscord: require('./Interface/Lists/BotsForDiscord'),
  BotsOnDiscord: require('./Interface/Lists/BotsOnDiscord'),
  Carbon: require('./Interface/Lists/Carbon'),
  CloudBotList: require('./Interface/Lists/CloudBotList'),
  CloudList: require('./Interface/Lists/CloudList'),
  DBLista: require('./Interface/Lists/DBLista'),
  DiscordAppsDev: require('./Interface/Lists/DiscordAppsDev'),
  DiscordBoats: require('./Interface/Lists/DiscordBoats'),
  DiscordBotList: require('./Interface/Lists/DiscordBotList'),
  DiscordBotsGG: require('./Interface/Lists/DiscordBotsGG'),
  DiscordBotWorld: require('./Interface/Lists/DiscordBotWorld'),
  DiscordExtremeList: require('./Interface/Lists/DiscordExtremeList'),
  DivineDiscordBots: require('./Interface/Lists/DivineDiscordBots'),
  GlennBotList: require('./Interface/Lists/GlennBotList'),
  LBots: require('./Interface/Lists/LBots'),
  MythicalBots: require('./Interface/Lists/MythicalBots'),
  TopGG: require('./Interface/Lists/TopGG'),
  WonderBotList: require('./Interface/Lists/WonderBotList'),
  YABL: require('./Interface/Lists/YABL'),

  Constants: require('./Utils/Constants'),
  DBotsError: require('./Utils/DBotsError'),
  EnsurePromise: require('./Utils/EnsurePromise'),
  FormatRequest: require('./Utils/FormatRequest'),
  Util: require('./Utils/Util'),

  ServiceBase: require('./Interface/ServiceBase'),
  getService: require('./Interface/ServiceBase').get
};