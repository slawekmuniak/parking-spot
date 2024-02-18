import { Button, Combobox, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, Option, makeStyles } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { IReservation } from "../../models/IReservation";
import React, { useState } from "react";
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
    const [reservationDate, setReservationDate] = useState<Date | null>();
    const [reservationTimeFrom, setReservationTimeFrom] = useState<Date | null>(null);
    const [reservationTimeTo, setReservationTimeTo] = useState<Date | null>(null);

    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();
        if (reservationDate && reservationTimeFrom && reservationTimeTo) {
            props.onSubmit({
                ReservationId: -1,
                ParkingSpotId: 1,
                VehicleId: 1,
                DateTimeFrom: reservationTimeFrom,
                DateTimeTo: reservationTimeTo,
            });
        }
    };

    return (
        <Dialog open={props.showDialog} onOpenChange={(event, data) => props.onOpenChange(data.open)}>
            <DialogSurface>
                <form onSubmit={handleSubmit}>
                    <DialogBody>
                        <DialogTitle>Add reservation</DialogTitle>
                        <DialogContent className={styles.content}>
                            <Field required label="Parking Spot">
                                <Combobox placeholder="Select a parking spot">
                                    <Option key={1}> ff </Option>
                                </Combobox>
                            </Field>
                            <Field required label="Vehicle">
                                <Combobox placeholder="Select a vehicle">
                                    <Option key={1}> ff </Option>
                                </Combobox>
                            </Field>
                            <Field required label="Date">
                                <DatePicker
                                    placeholder="Select a date..."
                                    onSelectDate={(d) => { setReservationDate(d) }} />
                            </Field>
                            <Field required label="From">
                                <TimePicker
                                    dateAnchor={reservationDate ?? undefined}
                                    onTimeChange={(e, d) => { setReservationTimeFrom(d.selectedTime) }} />
                            </Field>
                            <Field required label="To" >
                                <TimePicker
                                    dateAnchor={reservationDate ?? undefined}
                                    onTimeChange={(e, d) => { setReservationTimeTo(d.selectedTime) }} />
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