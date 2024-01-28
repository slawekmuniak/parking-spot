import { Button, Combobox, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, Option, makeStyles } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { IReservation } from "../../models/IReservation";
import React from "react";
import { TimePicker } from "@fluentui/react-timepicker-compat";

const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
    },
});

export default function ReservationFormDialog(props: {
    reservatino: IReservation,
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
                        <DialogTitle>Add reservation</DialogTitle>
                        <DialogContent className={styles.content}>
                            <Field label="Vehicle" required>
                                <Combobox placeholder="Select an vehicle">
                                    <Option key={1}> ff </Option>
                                </Combobox>
                            </Field>
                            <Field label="Date" required>
                                <DatePicker placeholder="Select a date..." />
                            </Field>
                            <Field label="From" required>
                                <TimePicker/>
                            </Field>
                            <Field label="To" required>
                                <TimePicker/>
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