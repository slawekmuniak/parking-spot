import React, { useContext, useEffect, useState } from "react";
import { AccessToken } from '@azure/identity';
import Dashboard from "./dashboard/Dashboard";
import Login from "./login/login";
import { Spinner } from "@fluentui/react-components";
import { TeamsFxContext } from "./TeamsFxContext";
import { TeamsUserCredential } from "@microsoft/teamsfx";
import config from "../common/config";

export default function Tab() {

  const [isLoading, setIsLoading] = useState(true);
  const [showLoadingPage, setShowLoadingPage] = useState(true);
  const [token, setToken] = useState<AccessToken | null>();
  const { themeString } = useContext(TeamsFxContext);

  const scope = ["User.Read", "User.ReadBasic.All"];
  const credential = new TeamsUserCredential({
    clientId: config.clientId!,
    initiateLoginEndpoint: config.initiateLoginEndpoint!,
  });

  useEffect(() => {
    async function getToken() {
      try {
        const token = await credential.getToken(scope);
        setToken(token);
        setShowLoadingPage(token === null);
      } catch (error) {
        setShowLoadingPage(true);
      }
    } if (!token) {
      getToken();
    }
    setIsLoading(false);
  }, [])

  const loginBtnClick = async () => {
    try {
      await credential.login(scope);
    } catch (err) {
      if (err instanceof Error && err.message?.includes("CancelledByUser")) {
        err.message += ""
      }

      alert("Login failed: " + err);
      return;
    }
  }

  return (
    <div className={themeString === "default" ? "light" : themeString === "dark" ? "dark" : "contrast"}>
      {isLoading ?? <Spinner></Spinner>}
      {!isLoading && showLoadingPage && <Login onLogin={() => loginBtnClick()} />}
      {!isLoading && !showLoadingPage && <Dashboard />}
    </div>
  );
}
