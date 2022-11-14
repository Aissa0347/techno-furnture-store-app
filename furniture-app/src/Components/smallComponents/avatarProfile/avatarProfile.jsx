import { Avatar, MantineProvider, Menu } from "@mantine/core";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { GlobalContext } from "../../../App";
import { auth } from "../../../firebase/firebaseConfig";

export function AvatarProfile() {
  const { currentUserData } = useContext(GlobalContext);
  console.log("here is avatarImg : ", currentUserData?.avatarImg);
  return (
    <MantineProvider>
      <Menu trigger="hover" openDelay={100} closeDelay={400} width={220}>
        <Menu.Target>
          <Avatar
            radius="xl"
            src={currentUserData?.avatarImg}
            alt={currentUserData?.name}
          ></Avatar>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item disabled>
            <h4>{currentUserData?.name}</h4>
            <p>{currentUserData?.email}</p>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item color="red" onClick={() => signOut(auth)}>
            Sign out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </MantineProvider>
  );
}

export default AvatarProfile;
