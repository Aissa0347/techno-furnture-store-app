// import Styles
// import "./navbar.scss";

import { Bell, Dashboard, menu, Store } from "../icons";
import { Link } from "react-router-dom";
import { ActionIcon, Avatar, Indicator, Menu, Text } from "@mantine/core";
import { BiBell, BiMessageCheck } from "react-icons/bi";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import AvatarProfile from "../../../Components/smallComponents/avatarProfile/avatarProfile";

const logo = require("../../../Website-Assets/logo.png");
const adminImg = require("../../../Website-Assets/Admin.png");

export function toggleSideBar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

function Navbar() {
  return (
    <div className="dash-navbar">
      <div className="dash-left-nav">
        <div className="menu-icon icon ">
          <span className="icon center" onClick={toggleSideBar}>
            {" "}
            {menu}
          </span>
        </div>
        <div className="back-btn">
          <Link to="/">
            <button className="btn">
              {Store} <span className="button-text">Back to Store</span>{" "}
            </button>
          </Link>
        </div>
      </div>
      <div className="dash-logo">
        <img loading="lazy" src={logo} alt="Logo" />
      </div>

      <div className="dash-right-nav">
        <Notification />
        <AvatarProfile />
      </div>
    </div>
  );
}

//* ------------------------- Notification Component ------------------------- */

function Notification() {
  const [count, setCount] = useState(0);
  const [opened, setOpened] = useState(false);
  const [notificationsList, setNotificationsList] = useState([]);
  let unsub;
  useEffect(() => {
    // if (unsub) console.log("unsub ", unsub);

    unsub = onSnapshot(
      doc(db, "Notifications", "Orders-Notifications"),
      async (res) => {
        if (notificationsList.length < 1 || res?.metadata?.hasPendingWrites) {
          let lastCheckingTime;
          await getDoc(doc(db, "Notifications", "Checking-Notifications"))
            .then((reponse) => {
              lastCheckingTime = reponse.get("lastTime");
            })
            .catch((error) => console.log(error.code, error.message));

          let notificationsArray = res.get("notifications");
          console.log("notifications here : ", lastCheckingTime);

          // if (notificationsArray.length < 1) unsub();
          let slicedNotifications = notificationsArray
            ?.sort((prev, next) => next?.time - prev?.time)
            ?.reverse()
            ?.slice(-30)
            ?.reverse();
          let notifications = slicedNotifications.map((notify) => {
            if (notify.time > lastCheckingTime.seconds) {
              return { ...notify, status: "new" };
            } else {
              return notify;
            }
          });
          console.log("notifications is there : ", notificationsArray);
          setNotificationsList(
            notifications.length > 0
              ? notifications
              : [{ name: "System", action: "system" }]
          );
          console.log(
            "notifications is there : is really passed ",
            notificationsArray
          );
        }
      }
    );
    console.log("notifications render");
  }, []);

  useEffect(() => {
    let count = 0;
    notificationsList.forEach((notify) => {
      if (notify.status === "new") count++;
    });
    setCount(count);
    if (count > 0)
      showNotification({
        autoClose: 3000,
        title: "You have new orders",
        message: (
          <div>
            {" "}
            Please Check{" "}
            <Link to={"invoices"} color="blue">
              Invoices
            </Link>{" "}
            Section
          </div>
        ),
        color: "blue",
        icon: <BiMessageCheck size={32} />,
        className: "my-notification-class",
        style: { backgroundColor: "white" },
        sx: { backgroundColor: "red" },
        loading: false,
      });
  }, [notificationsList]);

  console.log("notifications out there : ", notificationsList);

  useEffect(() => {
    if (opened) {
      updateDoc(doc(db, "Notifications", "Checking-Notifications"), {
        lastTime: serverTimestamp(),
      });
      setCount(0);
    }
  });

  return (
    <div className="dash-icon">
      <Menu radius={"none"} opened={opened} onChange={setOpened}>
        <Menu.Target>
          <ActionIcon variant="transparent" size={"lg"} radius={"none"}>
            <Indicator
              label={count}
              dot={false}
              showZero={false}
              radius={"lg"}
              overflowCount={99}
              size={"xs"}
              color={"red"}
              className="notification"
            >
              <BiBell size={32} />
            </Indicator>
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown className="notification-dropmenu">
          {notificationsList.map((notification) => {
            return (
              <Menu.Item
                className="notification-dropmenu-item"
                icon={
                  <Avatar
                    src={notification?.avatarImg || null}
                    color="indigo"
                    size={"md"}
                    radius={"none"}
                  >
                    {notification.action === "system" ? "SY" : ""}
                  </Avatar>
                }
              >
                {notification?.action === "order" && (
                  <Text pl={"sm"}>
                    {notification?.name} has been added new order
                  </Text>
                )}
                {notification?.action === "system" && (
                  <Text pl={"sm"}>
                    <span style={{ fontWeight: "bold" }}>
                      {notification?.name}
                    </span>
                    , No notifications yet
                  </Text>
                )}
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default Navbar;
