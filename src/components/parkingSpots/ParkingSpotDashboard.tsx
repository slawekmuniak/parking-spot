import { Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, TableCellLayout, Button, Tooltip } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import React from "react";
import {
    VehicleCarRegular,
    CalendarTodayRegular,
    IosArrowLtr24Regular,
    IosArrowRtl24Regular
} from "@fluentui/react-icons";

const columns = [
    { columnKey: "spot", label: "", icon: <VehicleCarRegular /> },
    { columnKey: "1", label: "0", icon: <>|</> },
    { columnKey: "2", label: "1", icon: <>|</> },
    { columnKey: "3", label: "2", icon: <>|</> },
    { columnKey: "3", label: "3", icon: <>|</> },
    { columnKey: "3", label: "4", icon: <>|</> },
    { columnKey: "3", label: "5", icon: <>|</> },
    { columnKey: "3", label: "6", icon: <>|</> },
    { columnKey: "3", label: "7", icon: <>|</> },
    { columnKey: "3", label: "8", icon: <>|</> },
    { columnKey: "3", label: "9", icon: <>|</> },
    { columnKey: "3", label: "10", icon: <>|</> },
    { columnKey: "3", label: "11", icon: <>|</> },
    { columnKey: "3", label: "12", icon: <>|</> },
    { columnKey: "3", label: "13", icon: <>|</> },
    { columnKey: "3", label: "14", icon: <>|</> },
    { columnKey: "3", label: "15", icon: <>|</> },
    { columnKey: "3", label: "16", icon: <>|</> },
    { columnKey: "3", label: "17", icon: <>|</> },
    { columnKey: "3", label: "18", icon: <>|</> },
    { columnKey: "3", label: "19", icon: <>|</> },
    { columnKey: "3", label: "20", icon: <>|</> },
    { columnKey: "3", label: "21", icon: <>|</> },
    { columnKey: "3", label: "22", icon: <>|</> },
    { columnKey: "3", label: "23", icon: <>|</> },
];

const items = [
    {
        id: 0,
        spot: "10",
    },
    {
        id: 0,
        spot: "11",
    },
    {
        id: 0,
        spot: "12",
    },
    {
        id: 0,
        spot: "13",
    },
    {
        id: 0,
        spot: "14",
    },
    {
        id: 0,
        spot: "15",
    },
    {
        id: 0,
        spot: "16",
    },
    {
        id: 0,
        spot: "17",
    },
    {
        id: 0,
        spot: "18",
    }
];

export function ParkingSpotDashboard(): JSX.Element {
    return (
        <div>
            <h2 className="title">
                <span>All parking spot reservations</span>
                <Button appearance="primary" aria-label="Add" >+ Add parking spot</Button>
            </h2>
            <div>

                <Button icon={<CalendarTodayRegular />} aria-label="Today" >Today</Button>
                <Button icon={<IosArrowLtr24Regular />} aria-label="Prev" />
                <DatePicker placeholder="Select a date..." />
                <Button icon={<IosArrowRtl24Regular />} aria-label="Next" />
            </div>
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
                            <TableCell>{item.spot}</TableCell>
                            <TableCell>
                                <Tooltip content="KR 10D546 - Sławomir Muniak 10:00 - 16:00" relationship="label">
                                    <div className="reservation"><div className="item">KR 10D546 - Sławomir Muniak 10:00 - 16:00</div></div>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip content="KR 10D546 - Sławomir Muniak 10:00 - 16:00" relationship="label">
                                    <div className="reservation"><div className="item">KR 10D546 - Sławomir Muniak 10:00 - 16:00</div></div>
                                </Tooltip>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell colSpan={6}>
                                <Tooltip content="KR 10D546 - Sławomir Muniak 10:00 - 16:00" relationship="label">
                                    <div className="reservation"><div className="item">KR 10D546 - Sławomir Muniak 10:00 - 16:00</div></div>
                                </Tooltip>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
