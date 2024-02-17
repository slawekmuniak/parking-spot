import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger } from "@fluentui/react-components";
import React from "react";

export default function VehicleDeleteConfirmationDialog(props: {
  onOpenChange: (opened: boolean) => void,
  onDeleteConfirmed: () => void,
  showDialog: boolean,
}) {
  return (
    <Dialog open={props.showDialog} onOpenChange={(event, data) => props.onOpenChange(data.open)}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Vehicle</DialogTitle>
          <DialogContent>
            Do you want to remove selected vehicle data? All reservations made with this vehicle will be removed as well.
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <Button appearance="primary" onClick={() => props.onDeleteConfirmed()}>Remove</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}