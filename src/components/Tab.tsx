import React, { useContext, useEffect, useMemo, useState } from "react";
import { AccessToken } from '@azure/identity';
import Dashboard from "./dashboard/Dashboard";
import Login from "./login/Login";
import { TeamsFxContext } from "./TeamsFxContext";
import { Spinner } from "@fluentui/react-components";

export default function Tab() {

  const [showLoginPage, setShowLoginPage] = useState(false);
  const [token, setToken] = useState<AccessToken | null>();
  const [isLoading, setIsLoading] = useState(true);
  const { teamsUserCredential } = useContext(TeamsFxContext);
  const scope = useMemo(() => (["User.Read", "User.ReadBasic.All"])
    , []);

  useEffect(() => {
    async function getToken(): Promise<void> {
      try {
        const token = await teamsUserCredential?.getToken(scope)
        setToken(token);
        setShowLoginPage(token === null);
      } catch (error) {
        setShowLoginPage(true);
      } finally {
        setIsLoading(false);
      }
    }
    if (!token) {
      getToken();
    }
  }, [scope, teamsUserCredential, token]);

  const loginBtnClick = async () => {
    try {
      await teamsUserCredential?.login(scope);
      setShowLoginPage(false);
    } catch (err) {
      alert("Login failed: " + err);
    }
  }

  return (
    <div>
      {isLoading && <Spinner className="center" size="huge" label="Checking connection..." />}
      {!isLoading && showLoginPage && <Login onLogin={() => loginBtnClick()} />}
      {!isLoading && !showLoginPage && <Dashboard />}
    </div>
  );
}
