import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../layouts";
import Loadable from "../utils/loadable";
import jwt from "jwt-decode";
import store from "../redux/store";
import Cookies from "js-cookie";

const pathToState = [
  {
    path: "/",
    value: 0,
  },
  {
    path: "/unconfigured",
    value: 1,
  },
  {
    path: "/configured",
    value: 2,
  },
  {
    path: "/graphs",
    value: 3,
  },
  {
    path: "/diagnostics",
    value: 4,
  },
  {
    path: "/report/authorization",
    value: 5,
  },
  {
    path: "/report/export",
    value: 5,
  },
  {
    path: "/report/import",
    value: 5,
  },
  {
    path: "/save-config",
    value: 6,
  },
  {
    path: "/setting/zones",
    value: 7,
  },
  {
    path: "/setting/odbs",
    value: 7,
  },
  {
    path: "/setting/onu-types",
    value: 7,
  },
  {
    path: "/setting/speed-profiles",
    value: 7,
  },
  {
    path: "/setting/olts",
    value: 7,
  },
  {
    path: "/setting/vpn",
    value: 7,
  },
  {
    path: "/setting/general",
    value: 7,
  },
  {
    path: "/setting/billing",
    value: 7,
  },
];

const Login = Loadable(lazy(() => import("../pages/login")));
const Home = Loadable(lazy(() => import("../pages/home")));
const UnConfigured = Loadable(lazy(() => import("../pages/un-configured")));
const Configured = Loadable(lazy(() => import("../pages/configured")));
const Graphs = Loadable(lazy(() => import("../pages/graphs")));
const Diagnostics = Loadable(lazy(() => import("../pages/diagnostics")));
const ConfiguredView = Loadable(
  lazy(() => import("../pages/configured/configured-view"))
);
const Authorization = Loadable(
  lazy(() => import("../pages/reports/authorization"))
);
const Import = Loadable(lazy(() => import("../pages/reports/import")));
const Export = Loadable(lazy(() => import("../pages/reports/export")));
const Zones = Loadable(lazy(() => import("../pages/settings/zones")));
const ODBs = Loadable(lazy(() => import("../pages/settings/obds")));
const ONUTypes = Loadable(lazy(() => import("../pages/settings/onu-types")));
const SpeedProfiles = Loadable(
  lazy(() => import("../pages/settings/speed-profiles"))
);
const OLTs = Loadable(lazy(() => import("../pages/settings/olts")));
const OLTDetail = Loadable(lazy(() => import("../pages/settings/olt-detail")));
const VPN = Loadable(lazy(() => import("../pages/settings/vpn")));
const General = Loadable(lazy(() => import("../pages/settings/general")));
const Billing = Loadable(lazy(() => import("../pages/settings/billing")));
const RoleDetail = Loadable(lazy(() => import("../pages/settings/general/role/[id]")));
const Addonu = Loadable(
  lazy(() => import("../pages/onu/addonu"))
);


const Routes = () => {
  let isLoggedIn = true;
  if (!localStorage.getItem("TOKEN") ? true : false) {
    isLoggedIn = false;
  } else {
    const role = localStorage.getItem("role") ? localStorage.getItem("role") : '';
    const permission = localStorage.getItem("permission") ? localStorage.getItem("permission").split(',') : [];
    const component = localStorage.getItem("component") ? localStorage.getItem("component").split(',') : [];
    let pageValue = pathToState.find(
      (item) => item.path === window.location.pathname
    )
    store?.dispatch({
      type: "SET_PAGE",
      payload: pageValue === undefined ? 999 : pageValue.value,
    });
    let tokenStorage = jwt(localStorage.getItem("TOKEN"));
    store?.dispatch({
      type: "SET_PERMISSION",
      payload: permission,
    });
    store?.dispatch({
      type: "SET_COMPONENT",
      payload: component,
    });
    store?.dispatch({
      type: "SET_ROLE",
      payload: role,
    });
  }

  return [
    {
      path: "/",
      element: isLoggedIn ? <Layout /> : <Navigate to="/login" />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/unconfigured",
          element: <UnConfigured />,
        },
        {
          path: "/configured",
          element: <Configured />,
        },
        {
          path: "/onu/add",
          element: <Addonu />,
        },
        {
          path: "/configured/view/:id",
          element: <ConfiguredView />,
        },
        {
          path: "/graphs",
          element: <Graphs />,
        },
        {
          path: "/diagnostics",
          element: <Diagnostics />,
        },
        {
          path: "/report/authorization",
          element: <Authorization />,
        },
        {
          path: "/report/import",
          element: <Import />,
        },
        {
          path: "/report/export",
          element: <Export />,
        },
        {
          path: "/setting/zones",
          element: <Zones />,
        },
        {
          path: "/setting/odbs",
          element: <ODBs />,
        },
        {
          path: "/setting/onu-types",
          element: <ONUTypes />,
        },
        {
          path: "/setting/speed-profiles",
          element: <SpeedProfiles />,
        },
        {
          path: "/setting/olts",
          element: <OLTs />,
        },
        {
          path: "/setting/olt-detail",
          element: <OLTDetail />,
        },
        {
          path: "/setting/vpn",
          element: <VPN />,
        },
        {
          path: "/setting/general",
          element: <General />,
        },
        {
          path: "/setting/billing",
          element: <Billing />,
        },
        {
          path: "/setting/role/:id",
          element: <RoleDetail />
        },
      ],
    },
    {
      path: "/",
      element: !isLoggedIn ? <Outlet /> : <Navigate to="/" />,
      children: [
        { path: "login", element: <Login /> },
        { path: "/", element: <Navigate to="/login" /> },
      ],
    },
  ];
};

export default Routes;
