import { Dialog, DialogTrigger, Button, DialogSurface, DialogBody, DialogTitle, DialogContent, Label, Input, DialogActions, makeStyles } from "@fluentui/react-components";
import React from "react";
import { IVehicle } from "../../models/IVehicle";

const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
    },
});

export default function VehicleFormDialog(props: {
    vehicle: IVehicle,
    showDialog: boolean,
    onOpenChange: (open: boolean) => void,
    onSubmit: () => void
}) {
    const styles = useStyles();

    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();
        props.onSubmit();
    };

    return (
        <Dialog open={props.showDialog} onOpenChange={(event, data) => props.onOpenChange(data.open)}>
            <DialogSurface aria-describedby={undefined}>
                <form onSubmit={handleSubmit}>
                    <DialogBody>
                        <DialogTitle>Add/Edit vehicle</DialogTitle>
                        <DialogContent className={styles.content}>
                            <Label required htmlFor={"registrationNumber"}>
                                Registration number
                            </Label>
                            <Input required type="text" id={"registrationNumber"} />
                            <Label required htmlFor={"description"}>
                                Description
                            </Label>
                            <Input required type="text" id={"description"} />
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