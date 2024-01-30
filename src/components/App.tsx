
import {
  FluentProvider,
  Spinner,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
} from "@fluentui/react-components";
import { Navigate, Route, HashRouter as Router, Routes } from "react-router-dom";
import Privacy from "./Privacy";
import React from "react";
import Tab from "./Tab";
import { TeamsFxContext } from "./TeamsFxContext";
import TermsOfUse from "./TermsOfUse";
import config from "../common/config";
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { loading, theme, themeString, teamsUserCredential } = useTeamsUserCredential({
    initiateLoginEndpoint: config.initiateLoginEndpoint!,
    clientId: config.clientId!,
  });
  return (
    <TeamsFxContext.Provider value={{ theme, themeString, teamsUserCredential }}>
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
              ? teamsHighContrastTheme
              : teamsLightTheme
        }
        style={{ width: "100%", }}
      >
        <Router>
          {loading ? (
            <Spinner className="center" size="huge" label="Loading application ..." />
          ) : (
            <Routes>
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/termsofuse" element={<TermsOfUse />} />
              <Route path="/tab" element={<Tab />} />
              <Route path="*" element={<Navigate to={"/tab"} />}></Route>
            </Routes>
          )}
        </Router>
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}
