import Dashboard from "views/Dashboard/Dashboard";
import Notifications from "views/Notifications/Notifications";
import UserProfile from "views/UserProfile/UserProfile";
import TableList from "views/SportsProfile/SportsProfile";
import Typography from "views/ClubProfile/ClubProfile";
import createclubSport from "views/clubSport/clubSport";
import chatData from "views/chatData/chatData";
import Icons from "views/Icons/Icons";
import Maps from "views/Maps/Maps";

import Upgrade from "views/Upgrade/Upgrade";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-home",
    component: Dashboard
  },

  {
    path: "/chat",
    name: "Chat",
    icon: "pe-7s-chat",
    component: chatData
  },

 {
    path: "/user",
    name: "Users List",
    icon: "pe-7s-user",
    component: UserProfile
  },

  {
    path: "/sport",
    name: "Sports List",
    icon: "pe-7s-ball",
    component: TableList
  },

  {
    path: "/club",
    name: "Club List",
    icon: "pe-7s-graph1",
    component: Typography
  },

  {
    path: "/createsportlist",
    name: "create sport list",
    icon: "pe-7s-note2",
    component: createclubSport
  },
  {
    path: "/payment",
    name: "payment",
    icon: "pe-7s-wallet",
    //component: createclubSport
  },
  
  
  // { path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
  // { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "pe-7s-bell",
  //   component: notifications
  // },
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "pe-7s-rocket",
  //   component: Upgrade
  // },
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
