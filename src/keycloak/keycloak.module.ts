import { DynamicModule, Module } from "@nestjs/common";
import { NickeycloakModule } from "@nicbrasil/nickeycloak-nestjs";

@Module({
  imports: [KeycloakModule.getKeycloakConnection()],
  exports: [NickeycloakModule],
})
export class KeycloakModule {
  static getKeycloakConnection(): DynamicModule {
    return NickeycloakModule.forRoot({
          realm: process.env.KEYCLOAK_REALM,
          url: process.env.KEYCLOAK_AUTH_SERVER_URL,
          clientId: process.env.KEYCLOAK_CLIENT_ID,
          clientSecret: process.env.KEYCLOAK_SECRET,
    });
  }
}
