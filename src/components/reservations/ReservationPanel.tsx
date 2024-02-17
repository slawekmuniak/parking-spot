import {
  ArrowExportRegular,
  ArrowImportRegular,
  DeleteRegular,
  VehicleCarRegular,
} from "@fluentui/react-icons";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { IReservation } from "../../models/IReservation";
import ReservationFormDialog from "./ReservationFormDialog";
import ReservationDeleteConfirmationDialog from "./ReservationDeleteConfirmationDialog";
import SimpleTable, { IActionDefinition, IColumnDefinition } from "../common/SimpleTable";
import { TeamsFxContext } from "../TeamsFxContext";
import { Button, Toast, ToastTitle, useToastController } from "@fluentui/react-components";
import API from "../../services/api";

export function ReservationPanel(): JSX.Element {

  const { toasterId } = useContext(TeamsFxContext);
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [activeReservation, setActiveReservation] = useState<IReservation>();
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
  const [showReservationFormDialog, setShowReservationFormDialog] = useState(false);
  const { dispatchToast } = useToastController(toasterId);

  const notify = useCallback(() => {
    dispatchToast(
      <Toast appearance="inverted">
        <ToastTitle>Cannot read data from server. Please try again later.</ToastTitle>
      </Toast>,
      { intent: "error" }
    );
  }, [dispatchToast]);

  const getReservations = useCallback(async () => {
    try {
      const reservations = await API.getReservations();
      setReservations(reservations);
    } catch (e) {
      setReservations([]);
      notify();
    }
  }, [notify]);

  useEffect(() => {
    setLoading(true);
    getReservations().finally(() => {
      setLoading(false);
    });
  }, [getReservations]);

  const onAddReservation = () => {
    setShowReservationFormDialog(true);
  }
  const onDeleteReservation = (reservation: IReservation) => {
    setActiveReservation(reservation);
    setShowDeleteConfirmationDialog(true);
  }

  const onReservationFormSubmitted = (reservation: IReservation) => {
    setLoading(true);
    setShowReservationFormDialog(false);
    API.addReservation(reservation).then(async () => {
      await getReservations();
    }).catch(() => {
      notify();
    }).finally(() => {
      setLoading(false);
    });
  }

  const onDeleteConfirmed = () => {
    if (!activeReservation) {
      return;
    }
    setLoading(true);
    setShowDeleteConfirmationDialog(false);
    API.removeReservation(activeReservation.ReservationId).then(async () => {
      await getReservations();
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
    columnKey: "From",
    label: "From",
    icon: <ArrowExportRegular />
  }, {
    columnKey: "To",
    label: "To",
    icon: <ArrowImportRegular />
  }];

  const actionsDefinitions: IActionDefinition[] = [{
    label: "Delete",
    onClick: onDeleteReservation,
    icon: <DeleteRegular />
  }];

  return (
    <div className="panel">
      <h4 className="title">
        <span>My reservations</span>
        <Button appearance="primary" onClick={onAddReservation}>+ Add reservation</Button>
      </h4>
      <SimpleTable
        loading={loading}
        data={reservations}
        actionsDefinition={actionsDefinitions}
        columnsDefinition={columnDefinitions} />
      <ReservationFormDialog
        showDialog={showReservationFormDialog}
        onSubmit={onReservationFormSubmitted}
        onOpenChange={setShowReservationFormDialog} />
      <ReservationDeleteConfirmationDialog
        showDialog={showDeleteConfirmationDialog}
        onDeleteConfirmed={onDeleteConfirmed}
        onOpenChange={setShowDeleteConfirmationDialog} />
    </div>
  );
}
