import { Dialog, DialogTrigger, Button, DialogSurface, DialogBody, DialogTitle, DialogContent, Input, DialogActions, makeStyles, Field } from "@fluentui/react-components";
import React from "react";

const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
    },
});

export default function AddParkingSpotFormDialog(props: {
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
                        <DialogTitle>Add Parking spot</DialogTitle>
                        <DialogContent className={styles.content}>
                            <Field label="Parking spot name">
                                <Input required type="text" />
                            </Field>
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