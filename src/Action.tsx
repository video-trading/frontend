import React from "react";
import MessageIcon from "@mui/icons-material/Message";
import CreateIcon from "@mui/icons-material/Create";

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
    icon: <CreateIcon />,
    title: "Create",
    link: "/create",
  },
];
