import { Button, Persona } from "@fluentui/react-components";
import React from "react";

export default function Login(props: {
  onLogin: () => void
}) {

  return (
    <div>
      <Persona />
      <h2>Welcome to To Do List App!</h2>
      <Button appearance="primary" onClick={() => props.onLogin()}>
        Start
      </Button>
    </div>
  );
} 