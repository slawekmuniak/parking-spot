
import {
  VehicleCarRegular,
  CommentNoteRegular,
  EditRegular,
  DeleteRegular
} from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";
import React, { useCallback, useEffect, useState } from "react";
import { IVehicle } from "../../models/IVehicle";
import VehicleFormDialog from "./VehicleFormDialog";
import VehicleDeleteConfirmationDialog from "./VehicleDeleteConfirmationDialog";
import API from "../../services/api";
import SimpleTable, { IActionDefinition, IColumnDefinition } from "../common/SimpleTable";

export function VehiclesPanel(): JSX.Element {

  const defaultVehicle: IVehicle = {
    VehicleId: -1,
    Description: "",
    RegistrationNumber: ""
  };

  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
  const [showVehicleFormDialog, setShowVehicleFormDialog] = useState(false);
  const [activeVehicle, setActiveVehicle] = useState<IVehicle>(defaultVehicle);

  const getVehicles = useCallback(async () => {
    setLoading(true);
    const vehicles = await API.getVehicles();
    setVehicles(vehicles);
    setLoading(false);
  }, []);

  useEffect(() => {
    getVehicles();
  }, [getVehicles]);

  const onAddVehicle = () => {
    setActiveVehicle(defaultVehicle);
    setShowVehicleFormDialog(true);
  }

  const onEditVehicle = (vehicle: IVehicle) => {
    setActiveVehicle(vehicle);
    setShowVehicleFormDialog(true);
  }

  const onVehicleFormSubmitted = async (vehicle: IVehicle) => {
    setLoading(true);
    setShowVehicleFormDialog(false);
    await API.addVehicle(vehicle);
    getVehicles();
    setLoading(false);
  }

  const onDeleteVehicle = (vehicle: IVehicle) => {
    setActiveVehicle(vehicle);
    setShowDeleteConfirmationDialog(true);
  }

  const onDeleteConfirmed = async () => {
    setLoading(true);
    setShowDeleteConfirmationDialog(false);
    await API.removeVehicle(activeVehicle.VehicleId);
    getVehicles();
    setLoading(false);
  }

  const onDeleteConfirmationDialogOpenChanged = (open: boolean) => {
    setShowDeleteConfirmationDialog(open);
  }

  const onVehicleFormDialogOpenChanged = (open: boolean) => {
    setShowVehicleFormDialog(open);
  }

  const columnDefinitions: IColumnDefinition[] = [{
    columnKey: "RegistrationNumber",
    label: "Registration Number",
    icon: <VehicleCarRegular />
  }, {
    columnKey: "Description",
    label: "Description",
    icon: <CommentNoteRegular />
  }];

  const actionsDefinitions: IActionDefinition[] = [{
    label: "Edit",
    onClick: onEditVehicle,
    icon: <EditRegular />
  }, {
    label: "Delete",
    onClick: onDeleteVehicle,
    icon: <DeleteRegular />
  }];

  return (
    <div className="panel">
      <h4 className="title">
        <span>My vehicles</span>
        <Button appearance="primary" aria-label="Add" onClick={() => { onAddVehicle() }}>+ Add vehicle</Button>
      </h4>
      <SimpleTable
        loading={loading}
        data={vehicles}
        actionsDefinition={actionsDefinitions}
        columnsDefinition={columnDefinitions} />
      <VehicleFormDialog
        vehicle={activeVehicle}
        showDialog={showVehicleFormDialog}
        onSubmit={onVehicleFormSubmitted}
        onOpenChange={onVehicleFormDialogOpenChanged} />
      <VehicleDeleteConfirmationDialog
        showDialog={showDeleteConfirmationDialog}
        onDeleteConfirmed={onDeleteConfirmed}
        onOpenChange={onDeleteConfirmationDialogOpenChanged} />
    </div>
  );
}
