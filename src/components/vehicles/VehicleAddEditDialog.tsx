import { Dialog, DialogTrigger, Button, DialogSurface, DialogBody, DialogTitle, DialogContent, Label, Input, DialogActions, makeStyles } from "@fluentui/react-components";
import React from "react";

const useStyles = makeStyles({
    content: {
      display: "flex",
      flexDirection: "column",
      rowGap: "10px",
    },
  });

export default function VehicleAddEditDialog() {
    const styles = useStyles();
    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();
        alert("form submitted!");
      };

    return (
        <Dialog modalType="non-modal">
            <DialogTrigger disableButtonEnhancement>
                <Button>Open formulary dialog</Button>
            </DialogTrigger>
            <DialogSurface aria-describedby={undefined}>
                <form onSubmit={handleSubmit}>
                    <DialogBody>
                        <DialogTitle>Dialog title</DialogTitle>
                        <DialogContent className={styles.content}>
                            <Label required htmlFor={"email-input"}>
                                Email input
                            </Label>
                            <Input required type="email" id={"email-input"} />
                            <Label required htmlFor={"password-input"}>
                                Password input
                            </Label>
                            <Input required type="password" id={"password-input"} />
                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">Close</Button>
                            </DialogTrigger>
                            <Button type="submit" appearance="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </DialogBody>
                </form>
            </DialogSurface>
        </Dialog>
    );
}