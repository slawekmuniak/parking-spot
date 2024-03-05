import { Button, Combobox, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, Option, makeStyles } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { IReservation } from "../../models/IReservation";
import React, { useCallback, useEffect, useState } from "react";
import { TimePicker } from "@fluentui/react-timepicker-compat";
import API from "../../services/api";
import { IVehicle } from "../../models/IVehicle";

const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
    },
});

interface ValidationInfo {
    validationState: 'error' | 'warning' | 'success' | 'none';
    validationMessage?: string;
}

export default function ReservationFormDialog(props: {
    showDialog: boolean,
    onOpenChange: (open: boolean) => void,
    onSubmit: (reservation: IReservation) => void
}) {
    const styles = useStyles();
    const [reservationDate, setReservationDate] = useState<Date | null>();
    const [reservationTimeFrom, setReservationTimeFrom] = useState<Date | null>(null);
    const [reservationTimeTo, setReservationTimeTo] = useState<Date | null>(null);
    const [vehicleId, setVehicleId] = useState(-1);
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);

    const [validationTo, setValidationTo] = useState<ValidationInfo>({ validationState: "none" });

    const getVehicles = useCallback(async () => {
        try {
            const vehicles = await API.Vehicles.getVehicles();
            setVehicles(vehicles);
        } catch (e) {
            setVehicles([]);
        }
    }, []);

    useEffect(() => {
        getVehicles().finally(() => {
        });
    }, [getVehicles]);

    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();

        if (validate()) {
            const reservation = {
                ReservationId: -1,
                ParkingSpotId: 1,
                VehicleId: vehicleId,
                DateTimeFrom: getReservationDateFrom()!,
                DateTimeTo: getReservationDateTo()!
            }
            props.onSubmit(reservation);

        }
    };

    const reservationToChanged = (reservationTimeTo: Date | null) => {
        setReservationTimeTo(reservationTimeTo);
        validate();
    }

    const validate = (): boolean => {
        setValidationTo({
            validationState: "none",
            validationMessage: ""
        });

        const dateTimeFrom = getReservationDateFrom();
        const dateTimeTo = getReservationDateTo();

        if (!dateTimeFrom || !dateTimeTo) return false;

        if (dateTimeFrom < dateTimeTo) {
            return true;
        }

        setValidationTo({
            validationState: "error",
            validationMessage: "Reservation time end cannot be earlier than revervation start"
        });
        return false;
    }

    const getReservationDateFrom = () => {
        if (reservationDate && reservationTimeFrom) {
            return new Date(
                reservationDate.getUTCFullYear(),
                reservationDate.getUTCMonth(),
                reservationDate.getUTCDay(),
                reservationTimeFrom.getUTCHours(),
                reservationTimeFrom.getUTCMinutes(), 0, 0
            )
        }
        return null;
    }

    const getReservationDateTo = () => {
        if (reservationDate && reservationTimeTo) {
            return new Date(
                reservationDate.getUTCFullYear(),
                reservationDate.getUTCMonth(),
                reservationDate.getUTCDay(),
                reservationTimeTo.getUTCHours(),
                reservationTimeTo.getUTCMinutes(), 0, 0
            )
        }
        return null;
    }

    const vehicleOptions = vehicles.map((vehicle) => {
        return <Option key={vehicle.VehicleId} value={vehicle.VehicleId.toString()}>{vehicle.RegistrationNumber}</Option>
    });

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
                                <Combobox
                                    placeholder="Select a vehicle"
                                    onChange={(d) => setVehicleId(Number.parseInt(d.target.value))}>
                                    {vehicleOptions}
                                </Combobox>
                            </Field>
                            <Field required label="Date">
                                <DatePicker
                                    placeholder="Select a date..."
                                    onSelectDate={(date) => { setReservationDate(date) }} />
                            </Field>
                            <Field required label="From">
                                <TimePicker
                                    onTimeChange={(e, d) => { setReservationTimeFrom(d.selectedTime) }} />
                            </Field>
                            <Field required label="To"
                                validationState={validationTo.validationState}
                                validationMessage={validationTo.validationMessage} >
                                <TimePicker
                                    onTimeChange={(e, d) => { reservationToChanged(d.selectedTime) }} />
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