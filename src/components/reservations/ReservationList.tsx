import {
    ArrowExportRegular,
    ArrowImportRegular,
    ArrowRightRegular,
    DeleteRegular,
    VehicleCarRegular
} from "@fluentui/react-icons"; import { Button, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow } from "@fluentui/react-components";
import React, { useState } from "react";
import { IReservation } from "../../models/IReservation";
import ReservationFormDialog from "./ReservationFormDialog";
import ReservationRemoveConfirmationDialog from "./ReservationRemoveConfirmationDialog";

const defaultReservation: IReservation = {
    id: -1,
    registrationNumber: "",
    description: "",
    owner: ""
}
const columns = [
    { columnKey: "registrationNumber", label: "Registration number", icon: <VehicleCarRegular /> },
    { columnKey: "from", label: "From", icon: <ArrowExportRegular /> },
    { columnKey: "to", label: "To", icon: <ArrowImportRegular /> },
    { columnKey: "actions", label: "Actions", icon: <ArrowRightRegular />, className: "actions" },
];

const items = [
    {
        id: 0,
        registrationNumber: "KR 123344",
        from: "11.11.2022 13:00",
        to: "11.11.2022 14:00",
    },
    {
        id: 1,
        registrationNumber: "KR 123344",
        from: "11.11.2022 13:00",
        to: "11.11.2022 14:00",
    },
    {
        id: 2,
        registrationNumber: "KR 123344",
        from: "11.11.2022 13:00",
        to: "11.11.2022 14:00",
    },
    {
        id: 3,
        registrationNumber: "KR 123344",
        from: "11.11.2022 13:00",
        to: "11.11.2022 14:00",
    }
];

export function ReservationList(): JSX.Element {

    const [reservation, setReservation] = useState<IReservation>({ ...defaultReservation });
    const [showRemoveDialog, setShowRemoveDialog] = useState(false);
    const [showReservationFormDialog, setShowReservationFormDialog] = useState(false);

    const removeReservation = (reservation: IReservation) => {
        setReservation(reservation);
        setShowRemoveDialog(true);
    }

    const removalConfirmed = () => {
        setReservation({ ...defaultReservation });
        setShowRemoveDialog(false);
    }

    const removalConfirmationDialogOpenChanged = (open: boolean) => {
        setShowRemoveDialog(open);
    }

    const addReservation = (Reservation: IReservation) => {
        setReservation(Reservation);
        setShowReservationFormDialog(true);
    }

    const reservationFormSubmitted = () => {
        setShowReservationFormDialog(false);
    }

    const reservationFormDialogOpenChanged = (open: boolean) => {
        setShowReservationFormDialog(open);
    }

    return (
        <div>
            <h4 className="title">
                <span>My reservations</span>
                <Button appearance="primary" aria-label="Add" onClick={() => { addReservation(defaultReservation) }}>+ Add reservation</Button>
            </h4>
            <Table size="extra-small">
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHeaderCell key={column.columnKey}>
                                <TableCellLayout media={column.icon} className={column.className}>
                                    {column.label}
                                </TableCellLayout>
                            </TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.registrationNumber}</TableCell>
                            <TableCell>{item.from}</TableCell>
                            <TableCell>{item.to}</TableCell>
                            <TableCell role="gridcell" tabIndex={0}>
                                <TableCellLayout className="actions">
                                    <Button icon={<DeleteRegular />} aria-label="Delete" onClick={() => { removeReservation(item) }} />
                                </TableCellLayout>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <ReservationFormDialog reservatino={reservation} showDialog={showReservationFormDialog} onSubmit={reservationFormSubmitted} onOpenChange={reservationFormDialogOpenChanged} />
            <ReservationRemoveConfirmationDialog showDialog={showRemoveDialog} onRemove={removalConfirmed} onOpenChange={removalConfirmationDialogOpenChanged} />
        </div>
    );
}
