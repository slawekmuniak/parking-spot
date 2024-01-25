import { Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, TableCellLayout, Button } from "@fluentui/react-components";
import React, { useState } from "react";
import {
    EditRegular,
    DeleteRegular,
    VehicleCarRegular,
    CommentNoteRegular,
    ArrowRightRegular
} from "@fluentui/react-icons";
import VehicleRemoveConfirmationDialog from "./VehicleRemoveConfirmationDialog";
import VehicleFormDialog from "./VehicleFormDialog";
import { IVehicle } from "../../models/IVehicle";

const columns = [
    { columnKey: "registrationNumber", label: "Registration number", icon: <VehicleCarRegular /> },
    { columnKey: "description", label: "Description", icon: <CommentNoteRegular /> },
    { columnKey: "actions", label: "Actions", icon: <ArrowRightRegular /> },
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

    const vehicleFormSubmitted = () =>{
        setShowVehicleFormDialog(false);
    }

    const vehicleFormDialogOpenChanged = (open: boolean) => {
        setShowVehicleFormDialog(open);
    }

    return (
        <div>
            <h4 className="title">
                <span>My vehicles</span>
                <Button appearance="primary" aria-label="Add"  onClick={() => { editVehicle(defaultVehicle) }}>+ Add vehicle</Button>
            </h4>
            <Table size="extra-small">
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHeaderCell key={column.columnKey}>
                                <TableCellLayout media={column.icon}>
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
                                <TableCellLayout>
                                    <Button icon={<EditRegular />} aria-label="Edit" onClick={() => { editVehicle(item) }} />
                                    <Button icon={<DeleteRegular />} onClick={() => { removeVehicle(item) }} aria-label="Delete" />
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
