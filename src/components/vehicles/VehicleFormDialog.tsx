import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Input, Label, makeStyles } from "@fluentui/react-components";
import { IVehicle } from "../../models/IVehicle";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
});

export default function VehicleFormDialog(props: {
  edit: boolean,
  showDialog: boolean,
  vehicle: IVehicle,
  onOpenChange: (open: boolean) => void,
  onSubmit: (vehicle: IVehicle) => void
}) {
  const styles = useStyles();
  const [vehicleId, setVehicleId] = useState(-1);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    props.onSubmit({
      VehicleId: vehicleId,
      RegistrationNumber: registrationNumber,
      Description: description,
    });
  };

  useEffect(() => {
    setRegistrationNumber(props.vehicle.RegistrationNumber);
    setDescription(props.vehicle.Description);
    setVehicleId(props.vehicle.VehicleId);
  }, [props.vehicle]);

  return (
    <Dialog open={props.showDialog} onOpenChange={(event, data) => props.onOpenChange(data.open)}>
      <DialogSurface>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <DialogTitle>{(props.edit ? "Edit" : "Add") + " vehicle"}</DialogTitle>
            <DialogContent className={styles.content}>
              <Label required htmlFor="registrationNumber">Registration number</Label>
              <Input
                id="registrationNumber"
                type="text"
                required
                value={registrationNumber}
                maxLength={50}
                onChange={(e, d) => setRegistrationNumber(d.value)} />
              <Label required htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                required
                maxLength={50}
                value={description}
                onChange={(e, d) => setDescription(d.value)} />
            </DialogContent>
            <DialogActions>
              <DialogTrigger>
                <Button appearance="secondary">Cancel</Button>
              </DialogTrigger>
              <Button type="submit" appearance="primary">Submit</Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
}