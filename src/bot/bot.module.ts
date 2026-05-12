import { Module } from "@nestjs/common";
import { IntentsBitField } from "discord.js";
import { NecordModule } from "necord";
import { EnvService } from "src/env/env.service";

@Module({
  imports: [
    NecordModule.forRootAsync({
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        token: envService.get("MTUwMDAyODk2OTkxMzk0MjIwNw.GOGVN6.eck4TGec2clfxcrFfRP1ezLRwzn2GA-kumhoW4"),
        development: (() => {
          if (envService.get("NEST_ENV") === "production") return undefined;
          const guildIds = envService.get("1493158947710828645") || [];
          if (guildIds.length > 0) return guildIds;
          return undefined;
        })(),
        intents: [
          IntentsBitField.Flags.Guilds,
          /** This is a privileged gateway intent - Enable "Server Members Intent" in the Bot tab of your Discord Application */
          IntentsBitField.Flags.GuildMembers,
        ],
      }),
    }),
  ],
})
export class BotModule {}
