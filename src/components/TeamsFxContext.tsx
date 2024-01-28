import { TeamsUserCredential } from "@microsoft/teamsfx";
import { Theme } from "@fluentui/react-components";
import { createContext } from "react";

export const TeamsFxContext = createContext<{
  theme?: Theme;
  themeString: string;
  teamsUserCredential?: TeamsUserCredential;
}>({
  theme: undefined,
  themeString: "",
  teamsUserCredential: undefined,
});
