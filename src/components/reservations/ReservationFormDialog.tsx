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
    showDialog: boolean,
    onOpenChange: (open: boolean) => void,
    onSubmit: (reservation: IReservation) => void
}) {
    const styles = useStyles();

    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();
        props.onSubmit({
            ReservationId: -1,
            ParkingSpotId: -1,
            VehicleId: -1,
            DateTimeFrom: new Date(),
            DateTimeTo: new Date(),
        });
    };

    return (
        <Dialog open={props.showDialog} onOpenChange={(event, data) => props.onOpenChange(data.open)}>
            <DialogSurface>
                <form onSubmit={handleSubmit}>
                    <DialogBody>
                        <DialogTitle>Add reservation</DialogTitle>
                        <DialogContent className={styles.content}>
                            <Field required label="Vehicle">
                                <Combobox placeholder="Select an vehicle">
                                    <Option key={1}> ff </Option>
                                </Combobox>
                            </Field>
                            <Field required label="Date">
                                <DatePicker placeholder="Select a date..." />
                            </Field>
                            <Field required label="From">
                                <TimePicker />
                            </Field>
                            <Field required label="To" >
                                <TimePicker />
                            </Field>
                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger>
                                <Button appearance="secondary">Cancel</Button>
                            </DialogTrigger>
                            <Button type="submit" appearance="primary">Submit</Button>
                        </DialogActions>
                    </DialogBody>
                </form>
            </DialogSurface>
        </Dialog>
    );
}