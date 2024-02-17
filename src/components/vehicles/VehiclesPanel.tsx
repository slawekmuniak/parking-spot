
import {
  VehicleCarRegular,
  CommentNoteRegular,
  EditRegular,
  DeleteRegular
} from "@fluentui/react-icons";
import { Button, Toast, ToastTitle, useToastController } from "@fluentui/react-components";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { IVehicle } from "../../models/IVehicle";
import VehicleFormDialog from "./VehicleFormDialog";
import VehicleDeleteConfirmationDialog from "./VehicleDeleteConfirmationDialog";
import API from "../../services/api";
import SimpleTable, { IActionDefinition, IColumnDefinition } from "../common/SimpleTable";
import { TeamsFxContext } from "../TeamsFxContext";

export function VehiclesPanel(): JSX.Element {

  const defaultVehicle: IVehicle = {
    VehicleId: -1,
    Description: "",
    RegistrationNumber: ""
  };

  const { toasterId } = useContext(TeamsFxContext);
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
  const [showVehicleFormDialog, setShowVehicleFormDialog] = useState(false);
  const [activeVehicle, setActiveVehicle] = useState<IVehicle>(defaultVehicle);
  const [isEditMode, setIsEditMode] = useState(false);
  const { dispatchToast } = useToastController(toasterId);

  const notify = useCallback(() => {
    dispatchToast(
      <Toast appearance="inverted">
        <ToastTitle>Cannot read data from server. Please try again later.</ToastTitle>
      </Toast>,
      { intent: "error" }
    );
  }, [dispatchToast]);

  const getVehicles = useCallback(async () => {
    try {
      const vehicles = await API.getVehicles();
      setVehicles(vehicles);
    } catch (e) {
      setVehicles([]);
      notify();
    }
  }, [notify]);

  useEffect(() => {
    setLoading(true);
    getVehicles().finally(() => {
      setLoading(false);
    });
  }, [getVehicles]);

  const onAddVehicle = () => {
    setActiveVehicle(defaultVehicle);
    setIsEditMode(false);
    setShowVehicleFormDialog(true);
  }

  const onEditVehicle = (vehicle: IVehicle) => {
    setActiveVehicle(vehicle);
    setIsEditMode(true);
    setShowVehicleFormDialog(true);
  }

  const onDeleteVehicle = (vehicle: IVehicle) => {
    setActiveVehicle(vehicle);
    setShowDeleteConfirmationDialog(true);
  }

  const onVehicleFormSubmitted = (vehicle: IVehicle) => {
    setLoading(true);
    setShowVehicleFormDialog(false);
    API.addVehicle(vehicle).then(async () => {
      await getVehicles();
    }).catch(() => {
      notify();
    }).finally(() => {
      setLoading(false);
    });
  }

  const onDeleteConfirmed = () => {
    setLoading(true);
    setShowDeleteConfirmationDialog(false);
    API.removeVehicle(activeVehicle.VehicleId).then(async () => {
      await getVehicles();
    }).catch(() => {
      notify();
    }).finally(() => {
      setLoading(false);
    });
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
        <Button appearance="primary" onClick={() => { onAddVehicle() }}>+ Add vehicle</Button>
      </h4>
      <SimpleTable
        loading={loading}
        data={vehicles}
        actionsDefinition={actionsDefinitions}
        columnsDefinition={columnDefinitions} />
      <VehicleFormDialog
        edit={isEditMode}
        vehicle={activeVehicle}
        showDialog={showVehicleFormDialog}
        onSubmit={onVehicleFormSubmitted}
        onOpenChange={setShowVehicleFormDialog} />
      <VehicleDeleteConfirmationDialog
        showDialog={showDeleteConfirmationDialog}
        onDeleteConfirmed={onDeleteConfirmed}
        onOpenChange={setShowDeleteConfirmationDialog} />
    </div>
  );
}
