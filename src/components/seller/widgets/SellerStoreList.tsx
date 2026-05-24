import { Add } from "@mui/icons-material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { resetSellerCrud, sellerStoreCrud } from "../store";
import { updateState, uploadFiles } from "@/lib/utils";
import { useSignals } from "@preact/signals-react/runtime";
import { styled } from "@mui/material/styles";
import businessSiteApis from "../business-site-api";

const SellerStoreList = () => {
  useSignals();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const uploadImage = async (files: FileList | null, attribute: string) => {
    try {
      if (!files) return;

      const uploaded = await uploadFiles(files, sellerStoreCrud);

      updateState(sellerStoreCrud, {
        data: {
          ...sellerStoreCrud.value.data,
          [attribute]: uploaded[0].url,
        }
      });

      console.log("reached");
    } catch (error: any) {
      const data = error.response.data;

      updateState(sellerStoreCrud, {
        formState: {
          ...sellerStoreCrud.value.formState,
          formAlert: {
            variant: "error",
            text: data.message,
            isOpen: true,
          }
        }
      });
    }
  }

  const createStore = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateState(sellerStoreCrud, {
      formState: { ...sellerStoreCrud.value.formState, loading: true }
    });

    try {
      const result = await businessSiteApis.post({
        route: "",
        payload: { data: sellerStoreCrud.value.data },
        config: { withCredentials: true },
      });

      // resetSellerCrud();
      console.log(result);
    } catch (error: any) {
      const data = error.response.data;

      updateState(sellerStoreCrud, {
        formState: {
          ...sellerStoreCrud.value.formState,
          formAlert: {
            variant: "error",
            text: data.message,
            isOpen: true,
          }
        }
      });
    }
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex flex-row ga-6 mb-2">
        <div className="font-medium text-2xl">Store List</div>
        <div className="ml-auto">
          <Button
            size="small"
            variant="contained"
            color="info"
            onClick={() => {
              setModalOpen(true);
              resetSellerCrud();
            }}
          >
            <Add />
            Add New
          </Button>
        </div>
      </div>
      <hr />
      <Modal
        className="flex flex-col justify-center items-center"
        open={modalOpen}
      >
        <form
          className="bg-white flex flex-col gap-4 w-md p-4 rounded-md shadow-sm"
          onSubmit={(e) => createStore(e)}
        >

          <div className="relative">
            <div className="font-medium text-lg text-center">Add New Store</div>
            <div className="absolute top-0 right-0">
              <div className="flex flex-row gap-2">
                <CancelIcon className="cursor-pointer" color="error" onClick={() => setModalOpen(false)} />
              </div>
            </div>
          </div>
          <div className="relative w-full pb-16">
            <div className="h-48 w-full overflow-hidden rounded-md">
              <img
                src={
                  sellerStoreCrud.value.data.bannerImage
                  ? `${process.env.NEXT_PUBLIC_API_URL}${sellerStoreCrud.value.data.bannerImage}`
                  : "https://placehold.co/1200x400?text=Banner&font=roboto&bg=E5E7EB&fc=6B7280"
                }
                alt="Banner"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute left-1/2 top-48 -translate-x-1/2 -translate-y-1/2">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-500 overflow-hidden shadow-md">
                <img
                  src={
                    sellerStoreCrud.value.data.profileImage
                    ? `${process.env.NEXT_PUBLIC_API_URL}${sellerStoreCrud.value.data.profileImage}`
                    : "https://placehold.co/256x256?text=profile&font=roboto&bg=E5E7EB&fc=6B7280"
                  }
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              className="flex-1"
              component="label"
              role={undefined}
              size="large"
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Profile
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => uploadImage(e.target.files, "profileImage")}
              />
            </Button>
            <Button
              className="flex-1"
              component="label"
              role={undefined}
              size="large"
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Banner
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => uploadImage(e.target.files, "bannerImage")}
              />
            </Button>
          </div>
          <div className="flex flex-col gap-2">
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
          </div>
          <div className="flex flex-row justify-center">
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="success"
              disabled={sellerStoreCrud.value.formState.loading}
            >
              Add Store
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SellerStoreList;
