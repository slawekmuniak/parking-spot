import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger } from "@fluentui/react-components";
import React from "react";

export default function ReservationDeleteConfirmationDialog(props: {
  onOpenChange: (opened: boolean) => void
  onDeleteConfirmed: () => void
  showDialog: boolean
}) {
  return (
    <Dialog open={props.showDialog} onOpenChange={(event, data) => props.onOpenChange(data.open)}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Reseervation</DialogTitle>
          <DialogContent>
            Do you want to remove selected reservation?
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