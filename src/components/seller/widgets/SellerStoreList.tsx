import { Add } from "@mui/icons-material";
import { Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { resetSellerCrud, sellerStoreCrud } from "../store";
import { updateState } from "@/lib/utils";
import { useSignals } from "@preact/signals-react/runtime";

const SellerStoreList = () => {
  useSignals();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const createStore = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();


  }

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex flex-row ga-6 mb-2">
        <div className="font-medium text-2xl">Store List</div>
        <div className="ml-auto">
          <Button size="small" variant="contained" color="info" onClick={() => setModalOpen(true)}>
            <Add />
            Add New
          </Button>
        </div>
      </div>
      <hr />
      <Modal
        className="flex flex-col justify-center items-center"
        open={modalOpen}
        onClose={() => {
          resetSellerCrud();
          setModalOpen(false);
        }}
      >
        <div className="bg-white flex flex-col gap-4 w-md p-4 rounded-md shadow-sm">
          <div className="font-medium text-lg text-center">Add New Store</div>
          <form className="flex flex-col gap-2" onSubmit={(e) => createStore(e)}>
            <TextField
              label="Name"
              value={sellerStoreCrud.value.data.name}
              required
              slotProps={{
                input: {
                  readOnly: sellerStoreCrud.value.formState.loading,
                },
              }}
              onChange={(e) => {
                updateState(sellerStoreCrud, {
                  data: { ...sellerStoreCrud.value.data, name: e.target.value },
                });
              }}
            />
            <TextField
              label="Description"
              value={sellerStoreCrud.value.data.description}
              multiline
              minRows={4}
              maxRows={4}
              required
              slotProps={{
                input: {
                  readOnly: sellerStoreCrud.value.formState.loading,
                },
              }}
              onChange={(e) => {
                updateState(sellerStoreCrud, {
                  data: { ...sellerStoreCrud.value.data, description: e.target.value },
                });
              }}
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SellerStoreList;
