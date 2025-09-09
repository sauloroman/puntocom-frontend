import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MetaPagination } from "../../interfaces/pagination.interface";
import type { User, Roles } from "../../interfaces/user.interface";

interface IUsers {
  isLoading: boolean;
  users: User[] | null;
  userSelected: User | null;
  filter: {
    role: Roles | null;
    status: boolean | null;
    isVisible: boolean;
  };
  pagination: MetaPagination & { itemsPerPage: number };
  isPaginationVisible: boolean;
  hasEnteredPasswordCorrectly: boolean,
}

const initialState: IUsers = {
  isLoading: false,
  users: null,
  userSelected: null,
  filter: {
    role: null,
    status: null,
    isVisible: true,
  },
  pagination: {
    page: 1,
    total: 1,
    totalPages: 1,
    itemsPerPage: 10,
  },
  isPaginationVisible: true,
  hasEnteredPasswordCorrectly: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },

    addUser: (state, { payload }: PayloadAction<User>) => {
      state.users?.unshift(payload);
      state.pagination.total++;
    },

    updateUser: (
      state,
      { payload }: PayloadAction<{ userId: string; user: User }>
    ) => {
      state.users = state.users!.map((user: User) =>
        user.id === payload.userId ? payload.user : user
      );
    },

    setUsers: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload;
    },

    setUserSelected: (state, { payload }: PayloadAction<User>) => {
      state.userSelected = payload;
    },

    resetUsers: (state) => {
      state.isLoading = false;
      state.users = null;
      state.userSelected = null;
    },

    setUsersMetaPagination: (
      state,
      { payload }: PayloadAction<MetaPagination & { itemsPerPage: number }>
    ) => {
      state.pagination = payload;
    },

    setPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.page = payload;
    },

    setRoleFilter: (
      state,
      { payload }: PayloadAction<{ role: Roles | null; isVisible: boolean }>
    ) => {
      state.filter.role = payload.role;
      state.filter.isVisible = payload.isVisible;
    },

    setStatusFilter: (
      state,
      { payload }: PayloadAction<{ status: boolean | null; isVisible: boolean }>
    ) => {
      state.filter.status = payload.status;
      state.filter.isVisible = payload.isVisible;
    },

    setPaginationVisible: (state, { payload }: PayloadAction<boolean>) => {
      state.isPaginationVisible = payload;
    },

    setHasEnteredPasswordCorrectly: ( state, {payload}: PayloadAction<boolean> ) => {
      state.hasEnteredPasswordCorrectly = payload
    }
  },
});

export const {
  setIsLoading,
  addUser,
  updateUser,
  setUsers,
  setUserSelected,
  resetUsers,
  setUsersMetaPagination,
  setPage,
  setRoleFilter,
  setStatusFilter,
  setPaginationVisible,
  setHasEnteredPasswordCorrectly,
} = usersSlice.actions;
