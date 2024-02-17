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

  const loadingData = (<Spinner></Spinner>);

  const emptyData = (
    <div>No data to show...</div>
  );

  const getHeaderColumns = () => {
    return props.columnsDefinition.map((column) => (
      <TableHeaderCell key={column.columnKey}>
        <TableCellLayout media={column.icon}>
          {column.label}
        </TableCellLayout>
      </TableHeaderCell>
    ))
  };

  const getItemsData = () => {
    return props.data.map((item, index) => (
      <TableRow key={index}>
        {props.columnsDefinition.map((column) => (
          <TableCell>{item[column.columnKey]}</TableCell>
        ))}
        {getActionsTableCell(item)}
      </TableRow>
    ));
  }

  const getActionsTableCell = (item: any) => {
    return (
      <TableCell role="gridcell" tabIndex={0}>
        <TableCellLayout className="actions">
          {props.actionsDefinition && props.actionsDefinition.map((action) => (
            <Button icon={action.icon} aria-label={action.label} onClick={() => { action.onClick(item) }} />
          ))}
        </TableCellLayout>
      </TableCell>
    )
  };

  return (
    <Table size="extra-small">
      <TableHeader>
        <TableRow>
          {getHeaderColumns()}
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.loading && loadingData}
        {!props.loading && props.data.length === 0 && emptyData}
        {!props.loading && getItemsData()}
      </TableBody>
    </Table>
  );
}
