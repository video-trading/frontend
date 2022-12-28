import React from "react";
import MessageIcon from "@mui/icons-material/Message";
import UploadIcon from "@mui/icons-material/Upload";

export interface Action {
  icon: React.ReactNode;
  title: string;
  link: string;
}

export const actions: Action[] = [
  {
    icon: <MessageIcon />,
    title: "Messages",
    link: "/messages",
  },
  {
    icon: <UploadIcon />,
    title: "Create",
    link: "/create",
  },
];
