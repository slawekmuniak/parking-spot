import { Button, Persona } from "@fluentui/react-components";
import { UserInfo } from "@microsoft/teamsfx";
import React, { useContext, useEffect, useState } from "react";
import { TeamsFxContext } from "../TeamsFxContext";

export default function Login(props: {
  onLogin: () => void
}) {

  const { teamsUserCredential } = useContext(TeamsFxContext);
  const [userInfo, setUserInfo] = useState<UserInfo>();

  async function getUser() {
    setUserInfo(await teamsUserCredential?.getUserInfo());
  }

  useEffect(() => {
    getUser();
  }, []);


  return (
    <div className="center">
      <Persona name={userInfo?.displayName} />
      <h2>Welcome to Parking Spot App!</h2>
      <Button appearance="primary" onClick={() => props.onLogin()}>
        Authoirize
      </Button>
    </div>
  );
} 