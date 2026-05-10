import { Button, TextField } from "@mui/material";
import Link from "next/link";
import LoginForm from "./components/LoginForm";

const page = () => {
  return (
    <div className="flex flex-col flex-1 p-6 items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default page;
