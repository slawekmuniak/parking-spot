import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import config from "../config"
import { OnBehalfOfCredentialAuthConfig, OnBehalfOfUserCredential } from "@microsoft/teamsfx";
import { TeamsFxContext } from "@microsoft/teamsfx-react";
import { Response } from "../models/Response";

const vehicle: AzureFunction = function (context: Context, req: HttpRequest, teamsfxContext: TeamsFxContext): Promise<Response> {
  context.log('HTTP trigger function - start processing [vehicle] request.');

  const oboAuthConfig: OnBehalfOfCredentialAuthConfig = {
    authorityHost: config.authorityHost,
    clientId: config.clientId,
    tenantId: config.tenantId,
    clientSecret: config.clientSecret,
  };

  try {
    context.log(teamsfxContext);
    const token = teamsfxContext["AccessToken"];
    const credentials = new OnBehalfOfUserCredential(token, oboAuthConfig);
    const currentUser = credentials.getUserInfo();

    context.log("Success");
    return Promise.resolve({
      status: 200,
      body: {
        data: currentUser.displayName
      }
    })
  } catch (e) {
    context.log(e);
    return Promise.resolve({
      status: 500,
      body: {
        error: "Cannot process your request"
      }
    })
  }
};

export default vehicle;