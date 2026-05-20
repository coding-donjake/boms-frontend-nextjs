import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

const SellerStoreList = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex flex-row ga-6 mb-2">
        <div className="font-medium text-2xl">Store List</div>
        <div className="ml-auto">
          <Button size="small" variant="contained" color="info">
            <Add />
            Add New
          </Button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default SellerStoreList;
