import { OnBehalfOfCredentialAuthConfig, OnBehalfOfUserCredential, UserInfo } from "@microsoft/teamsfx";
import { TeamsFxContext } from "@microsoft/teamsfx-react";
import config from "../config";

export const getUser = (teamsfxContext: TeamsFxContext): UserInfo => {
  const oboAuthConfig: OnBehalfOfCredentialAuthConfig = {
    authorityHost: config.authorityHost,
    clientId: config.clientId,
    tenantId: config.tenantId,
    clientSecret: config.clientSecret,
  };

  const token = teamsfxContext["AccessToken"];
  const credentials = new OnBehalfOfUserCredential(token, oboAuthConfig);
  return credentials.getUserInfo();
}