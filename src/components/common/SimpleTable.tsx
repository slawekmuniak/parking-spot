import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCellLayout,
  TableBody,
  Spinner,
  TableCell,
  Button
} from "@fluentui/react-components";
import React from "react";

export interface IColumnDefinition {
  columnKey: string,
  label: string,
  icon?: JSX.Element
}

export interface IActionDefinition {
  onClick: (item: any) => void,
  label: string,
  icon: JSX.Element
}

export default function SimpleTable(props: {
  loading: boolean,
  data: any[],
  columnsDefinition: IColumnDefinition[],
  actionsDefinition?: IActionDefinition[]
}): JSX.Element {

  const loadingData = <Spinner></Spinner>;
  const emptyData = <div>No data to show...</div>;

  const getHeaderColumns = props.columnsDefinition.map((column) => (
    <TableHeaderCell key={column.columnKey}>
      <TableCellLayout media={column.icon}>
        {column.label}
      </TableCellLayout>
    </TableHeaderCell>
  ));

  const getActionsTableCell = (item: any) => {
    return (
      <TableCell role="gridcell">
        <TableCellLayout className="actions">
          {props.actionsDefinition && props.actionsDefinition.map((action, index) => (
            <Button key={index} icon={action.icon} aria-label={action.label} onClick={() => { action.onClick(item) }} />
          ))}
        </TableCellLayout>
      </TableCell>
    )
  };

  const getItemsData = props.data.map((item, index) => (
    <TableRow key={index}>
      {props.columnsDefinition.map((column, index) => (
        <TableCell key={index}>{item[column.columnKey]}</TableCell>
      ))}
      {getActionsTableCell(item)}
    </TableRow>
  ));

  if (props.loading) {
    return loadingData;
  } else if (props.data.length === 0) {
    return emptyData;
  }

  return (
    <Table size="extra-small">
      <TableHeader>
        <TableRow>
          {getHeaderColumns}
        </TableRow>
      </TableHeader>
      <TableBody>
        {getItemsData}
      </TableBody>
    </Table>
  );
}
