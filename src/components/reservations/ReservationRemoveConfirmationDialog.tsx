import { Dialog, DialogTrigger, Button, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions } from "@fluentui/react-components";
import React from "react";

export default function ReservationRemoveConfirmationDialog(props: {
    onOpenChange: (opened: boolean) => void
    onRemove: () => void
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
                        <Button appearance="primary" onClick={() => props.onRemove()}>Remove</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}