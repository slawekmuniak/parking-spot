import { Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, TableCellLayout, Button } from "@fluentui/react-components";
import React from "react";
import {
    EditRegular,
    DeleteRegular,
    VehicleCarRegular,
    ArrowExportRegular,
    ArrowImportRegular,
    ArrowRightRegular
} from "@fluentui/react-icons";

const columns = [
    { columnKey: "registrationNumber", label: "Registration number", icon: <VehicleCarRegular/> },
    { columnKey: "from", label: "From", icon: <ArrowExportRegular/> },
    { columnKey: "to", label: "To", icon: <ArrowImportRegular/> },
    { columnKey: "actions", label: "Actions", icon: <ArrowRightRegular/> },
];

const items = [
    {
        id: 0,
        registrationNumber: "KR 123344",
        from: "11.11.2022 13:00",
        to: "11.11.2022 14:00",
    },
    {
        id: 0,
        registrationNumber: "KR 123344",
        from: "11.11.2022 13:00",
        to: "11.11.2022 14:00",
    },
    {
        id: 0,
        registrationNumber: "KR 123344",
        from: "11.11.2022 13:00",
        to: "11.11.2022 14:00",
    },
    {
        id: 0,
        registrationNumber: "KR 123344",
        from: "11.11.2022 13:00",
        to: "11.11.2022 14:00",
    }
];

export function ReservationList(): JSX.Element {
    return (
        <div>
            <h2 className="title">
                <span>My reservations</span>
                <Button appearance="primary" aria-label="Add" >+ Add reservation</Button>
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
                            <TableCell>{item.from}</TableCell>
                            <TableCell>{item.to}</TableCell>
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
        </div>
    );
}
