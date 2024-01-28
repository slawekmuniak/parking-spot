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
  const [showLoginPage, setShowLoginPage] = useState(true);
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
        setIsLoading(true);
        const token = await credential.getToken(scope);
        setToken(token);
        setShowLoginPage(token === null);
      } catch (error) {
        setShowLoginPage(true);
      } finally {
        setIsLoading(false);
      }
    }

    console.log(token);
    if (!token) {
      getToken();
    }
  }, []);

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
      {!isLoading && showLoginPage && <Login onLogin={() => loginBtnClick()} />}
      {!isLoading && !showLoginPage && <Dashboard />}
    </div>
  );
}
