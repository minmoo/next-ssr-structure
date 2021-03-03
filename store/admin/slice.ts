import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tadmin } from "./types";

const name = "admin";

const initialState: Tadmin = {
  toolbar: {
    title: "Title",
  },
  navbar: {
    isFix: true,
    isOpen: false,
    items: [
      {
        id: "dashboard",
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: "dashboard",
      },
      {
        id: "websocket",
        title: "Websocket",
        url: "/admin/websocket",
        icon: "chat",
      },
      {
        id: "pages",
        title: "Pages",
        icon: "libraryBooks",
        subItems: [
          {
            id: "pages1-1",
            title: "Pages1-1",
          },
          {
            id: "pages1-2",
            title: "Pages1-2",
            subItems: [
              {
                id: "pages2-1",
                title: "Pages2-1",
              },
              {
                id: "pages2-2",
                title: "Pages2-2",
              },
            ],
          },
        ],
      },
    ],
  },
};

const reducers = {
  navbarOpenToggle(state: Tadmin) {
    state.navbar.isOpen = !state.navbar.isOpen;
  },
  navbarFixToggle(state: Tadmin) {
    state.navbar.isFix = !state.navbar.isFix;
  },
};

const adminSlice = createSlice({ name, initialState, reducers });

export default adminSlice.reducer;
export const actions = adminSlice.actions;
