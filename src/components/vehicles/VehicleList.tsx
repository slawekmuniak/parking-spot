import {
    ArrowRightRegular,
    CommentNoteRegular,
    DeleteRegular,
    EditRegular,
    VehicleCarRegular
} from "@fluentui/react-icons";import { Button, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow } from "@fluentui/react-components";
import React, { useState } from "react";
import { IVehicle } from "../../models/IVehicle";
import VehicleFormDialog from "./VehicleFormDialog";
import VehicleRemoveConfirmationDialog from "./VehicleRemoveConfirmationDialog";

const columns = [
    { columnKey: "registrationNumber", label: "Registration number", icon: <VehicleCarRegular /> },
    { columnKey: "description", label: "Description", icon: <CommentNoteRegular /> },
    { columnKey: "actions", label: "Actions", icon: <ArrowRightRegular />, className: "actions" },
];

const defaultVehicle: IVehicle = {
    id: -1,
    registrationNumber: "",
    description: "",
    owner: ""
}

const items: IVehicle[] = [
    {
        id: 0,
        registrationNumber: "KR 123344",
        description: "coś tam",
        owner: "Sławomir Muniak",
    },
    {
        id: 1,
        registrationNumber: "KR 123344",
        description: "coś tam",
        owner: "Sławomir Muniak",
    },
    {
        id: 2,
        registrationNumber: "KR 123344",
        description: "coś tam",
        owner: "Sławomir Muniak",
    },
    {
        id: 3,
        registrationNumber: "KR 123344",
        description: "coś tam",
        owner: "Sławomir Muniak",
    }
];

export function VehicleList(): JSX.Element {

    const [vehicle, setVehicle] = useState<IVehicle>({ ...defaultVehicle });
    const [showRemoveDialog, setShowRemoveDialog] = useState(false);
    const [showVehicleFormDialog, setShowVehicleFormDialog] = useState(false);

    const removeVehicle = (vehicle: IVehicle) => {
        setVehicle(vehicle);
        setShowRemoveDialog(true);
    }

    const removalConfirmed = () => {
        setVehicle({ ...defaultVehicle });
        setShowRemoveDialog(false);
    }

    const removalConfirmationDialogOpenChanged = (open: boolean) => {
        setShowRemoveDialog(open);
    }

    const editVehicle = (vehicle: IVehicle) => {
        setVehicle(vehicle);
        setShowVehicleFormDialog(true);
    }

    const vehicleFormSubmitted = () => {
        setShowVehicleFormDialog(false);
    }

    const vehicleFormDialogOpenChanged = (open: boolean) => {
        setShowVehicleFormDialog(open);
    }

    return (
        <div>
            <h4 className="title">
                <span>My vehicles</span>
                <Button appearance="primary" aria-label="Add" onClick={() => { editVehicle(defaultVehicle) }}>+ Add vehicle</Button>
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
                            <TableCell>{item.description}</TableCell>
                            <TableCell role="gridcell" tabIndex={0}>
                                <TableCellLayout className="actions">
                                    <Button icon={<EditRegular />} aria-label="Edit" onClick={() => { editVehicle(item) }} />
                                    <Button icon={<DeleteRegular />} aria-label="Delete" onClick={() => { removeVehicle(item) }} />
                                </TableCellLayout>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <VehicleFormDialog vehicle={vehicle} showDialog={showVehicleFormDialog} onSubmit={vehicleFormSubmitted} onOpenChange={vehicleFormDialogOpenChanged} />
            <VehicleRemoveConfirmationDialog showDialog={showRemoveDialog} onRemove={removalConfirmed} onOpenChange={removalConfirmationDialogOpenChanged} />
        </div>
    );
}
