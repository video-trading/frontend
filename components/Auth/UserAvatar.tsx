// @flow
import * as React from "react";
import { useCallback, useMemo } from "react";
import { signOut, useSession } from "next-auth/react";
import { Avatar, Box, Divider, Menu, MenuItem } from "@mui/material";
import { bindMenu, usePopupState } from "material-ui-popup-state/hooks";
import { useRouter } from "next/router";
import { UIConfig } from "../../src/UIConfig";
import Link from "next/link";
import { useMyTotalToken } from "../../src/hooks/useMyTotalTokens";

type Props = {};

export function UserAvatar(props: Props) {
  const session = useSession();
  const popupState = usePopupState({
    variant: "popper",
    popupId: "userAvatar",
  });
  const router = useRouter();

  const user = useMemo(() => {
    return session.data?.user as any;
  }, [session]);
  const totalToken = useMyTotalToken((session.data as any)?.accessToken);

  const handleOnClick = useCallback(
    async (e: any) => {
      if (session.status === "unauthenticated") {
        await router.push("/user/signin");
      } else {
        popupState.open(e.currentTarget);
      }
    },
    [popupState, session]
  );

  return (
    <>
      <Box sx={{ cursor: "pointer" }} onClick={handleOnClick}>
        <Avatar>{user?.name?.charAt(0).toUpperCase()}</Avatar>
      </Box>
      <Menu {...bindMenu(popupState)} onClose={() => popupState.close()}>
        <MenuItem sx={{ color: "gray", width: UIConfig.userAvatarMenuWidth }}>
          {session.data?.user?.name}
        </MenuItem>
        <Divider />
        <MenuItem>
          <Link href={"/user/profile"} onClick={() => popupState.close()}>
            Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href={"/user/my/video"} onClick={() => popupState.close()}>
            My Videos
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href={`/tx/user/${user?.id}`}
            onClick={() => popupState.close()}
          >
            My Transactions
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href={`/token/${user?.id}`} onClick={() => popupState.close()}>
            My Token Rewards: {totalToken.data}
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            popupState.close();
            signOut({ redirect: false });
          }}
        >
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
}
