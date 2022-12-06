// @flow
import * as React from "react";
import { useSession, signOut } from "next-auth/react";
import { Avatar, Box, Divider, Menu, MenuItem } from "@mui/material";
import { bindMenu, usePopupState } from "material-ui-popup-state/hooks";
import { useRouter } from "next/router";
import { useMemo } from "react";

type Props = {};

export function UserAvatar(props: Props) {
  const session = useSession();
  const popupState = usePopupState({
    variant: "popover",
    popupId: "userAvatar",
  });
  const router = useRouter();

  const user = useMemo(() => {
    return session.data?.user as any;
  }, [session]);

  return (
    <>
      <Box
        sx={{ cursor: "pointer" }}
        onClick={async (e) => {
          if (session.status === "unauthenticated") {
            await router.push("/user/signin");
          } else {
            popupState.open(e);
          }
        }}
      >
        <Avatar src={user?.avatar}>
          {user?.name?.charAt(0).toUpperCase()}
        </Avatar>
      </Box>
      <Menu {...bindMenu(popupState)}>
        <MenuItem>Profile</MenuItem>
        <Divider />
        <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
      </Menu>
    </>
  );
}
