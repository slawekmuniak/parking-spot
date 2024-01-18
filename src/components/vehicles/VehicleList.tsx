import { Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, TableCellLayout, Avatar, Button } from "@fluentui/react-components";
import React from "react";
import {
    EditRegular,
    DeleteRegular,
    VehicleCarRegular,
    CommentNoteRegular,
    ContactCardRegular,
    ArrowRightRegular
} from "@fluentui/react-icons";
import VehicleRemoveConfirmationDialog from "./VehicleRemoveConfirmationDialog";
import VehicleAddEditDialog from "./VehicleAddEditDialog";

const columns = [
    { columnKey: "registrationNumber", label: "Registration number", icon: <VehicleCarRegular/> },
    { columnKey: "description", label: "Description", icon: <CommentNoteRegular/> },
    { columnKey: "owner", label: "Owner", icon: <ContactCardRegular/> },
    { columnKey: "actions", label: "Actions", icon: <ArrowRightRegular/> },
];

const items = [
    {
        id: 0,
        registrationNumber: "KR 123344",
        description: "coś tam",
        owner: "Sławomir Muniak",
    },
    {
        id: 0,
        registrationNumber: "KR 123344",
        description: "coś tam",
        owner: "Sławomir Muniak",
    },
    {
        id: 0,
        registrationNumber: "KR 123344",
        description: "coś tam",
        owner: "Sławomir Muniak",
    },
    {
        id: 0,
        registrationNumber: "KR 123344",
        description: "coś tam",
        owner: "Sławomir Muniak",
    }
];

export function VehicleList(): JSX.Element {
    return (
        <div>
            <h2 className="title">
                <span>My vehicles</span>
                <Button appearance="primary" aria-label="Add" >+ Add vehicle</Button>
            </h2>
            <Table size="small">
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
                            <TableCell>
                                <TableCellLayout
                                    media={
                                        <Avatar name={item.owner} />
                                    }
                                >
                                    {item.owner}
                                </TableCellLayout>
                            </TableCell>
                            <TableCell role="gridcell" tabIndex={0}>
                                <TableCellLayout>
                                    <Button icon={<EditRegular />} aria-label="Edit" />
                                    <Button icon={<DeleteRegular />} aria-label="Delete" />
                                </TableCellLayout>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <VehicleAddEditDialog/>
            <VehicleRemoveConfirmationDialog/>
        </div>
    );
}
