import { useState } from "react";

export default function useDialog(){
    const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = ():void => {
    
    setOpen(true);
  };
  const handleClose = ():void => {
    setOpen(false);
  };
  return {open,handleClickOpen,handleClose}
}