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
    { columnKey: "0", label: "0", icon: <>|</> },
    { columnKey: "1", label: "1", icon: <>|</> },
    { columnKey: "2", label: "2", icon: <>|</> },
    { columnKey: "3", label: "3", icon: <>|</> },
    { columnKey: "4", label: "4", icon: <>|</> },
    { columnKey: "5", label: "5", icon: <>|</> },
    { columnKey: "6", label: "6", icon: <>|</> },
    { columnKey: "7", label: "7", icon: <>|</> },
    { columnKey: "8", label: "8", icon: <>|</> },
    { columnKey: "9", label: "9", icon: <>|</> },
    { columnKey: "10", label: "10", icon: <>|</> },
    { columnKey: "11", label: "11", icon: <>|</> },
    { columnKey: "12", label: "12", icon: <>|</> },
    { columnKey: "13", label: "13", icon: <>|</> },
    { columnKey: "14", label: "14", icon: <>|</> },
    { columnKey: "15", label: "15", icon: <>|</> },
    { columnKey: "16", label: "16", icon: <>|</> },
    { columnKey: "17", label: "17", icon: <>|</> },
    { columnKey: "18", label: "18", icon: <>|</> },
    { columnKey: "19", label: "19", icon: <>|</> },
    { columnKey: "20", label: "20", icon: <>|</> },
    { columnKey: "21", label: "21", icon: <>|</> },
    { columnKey: "22", label: "22", icon: <>|</> },
    { columnKey: "23", label: "23", icon: <>|</> },
];

const items = [
    {
        id: 0,
        spot: "10",
    },
    {
        id: 1,
        spot: "11",
    },
    {
        id: 2,
        spot: "12",
    },
    {
        id: 3,
        spot: "13",
    },
    {
        id: 4,
        spot: "14",
    },
    {
        id: 5,
        spot: "15",
    },
    {
        id: 6,
        spot: "16",
    },
    {
        id: 7,
        spot: "17",
    },
    {
        id: 8,
        spot: "18",
    }
];

export function ParkingSpotDashboard(): JSX.Element {
    return (
        <div>
            <h4 className="title">
                <span>All parking spot reservations</span>
                <Button appearance="primary" aria-label="Add" >+ Add parking spot</Button>
            </h4>
            <div style={{ display: "flex" }}>
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
