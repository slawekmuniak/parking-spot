import { Dialog, DialogTrigger, Button, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions } from "@fluentui/react-components";
import React from "react";

export default function VehicleRemoveConfirmationDialog() {
    return (
        <Dialog>
            <DialogTrigger disableButtonEnhancement>
                <Button>Open dialog</Button>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Vehicle removal</DialogTitle>
                    <DialogContent>
                        Do you want to remove selected vehicle data? All reservations made with this vehicle will be removed as well.
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Cancel</Button>
                        </DialogTrigger>
                        <Button appearance="primary">Remove</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}