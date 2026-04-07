import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MetaPagination } from "../../interfaces/dto/pagination.interface";
import type { User } from "../../interfaces/dto/user.interface";
import type { FilterUsers } from "../../interfaces/ui/filter.interface";

interface IUsers {
  isLoading: boolean;
  users: User[] | null;
  allUsers: User[] | null,
  userSelected: User | null;
  filter: FilterUsers;
  pagination: MetaPagination & { itemsPerPage: number };
  isPaginationVisible: boolean;
  hasEnteredPasswordCorrectly: boolean,
  isTableStyleActive: boolean,
  isGridStyleActive: boolean,
  isOrderedAsc: boolean,
}

const initialState: IUsers = {
  isLoading: false,
  users: null,
  allUsers: null,
  userSelected: null,
  filter: {
    role: null,
    status: null,
    userName: null
  },
  pagination: {
    page: 1,
    total: 1,
    totalPages: 1,
    itemsPerPage: 5,
  },
  isPaginationVisible: true,
  hasEnteredPasswordCorrectly: false,
  isTableStyleActive: true,
  isGridStyleActive: false,
  isOrderedAsc: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {

    setOrderedAsc: (state, {payload}:PayloadAction<boolean>) => {
      state.isOrderedAsc = payload
    },

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

    setAllUsers: ( state, {payload}: PayloadAction<User[]>) => {
      state.allUsers = payload
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

    setRoleFilter: ( state, { payload }: PayloadAction<Pick<FilterUsers, 'role'>> ) => {
      state.filter.role = payload.role;
    },

    setStatusFilter: ( state, { payload }: PayloadAction<Pick<FilterUsers, 'status'>>) => {
      state.filter.status = payload.status;
    },

    setUserNameFilter: ( state, { payload }: PayloadAction<Pick<FilterUsers, 'userName'>>) => {
      state.filter.userName = payload.userName
    },

    resetFilter: ( state ) => {
      state.filter = {
        role: null,
        status: null,
        userName: null
      }
    },

    setHasEnteredPasswordCorrectly: ( state, {payload}: PayloadAction<boolean> ) => {
      state.hasEnteredPasswordCorrectly = payload
    },

    setTableView: (state, {payload}: PayloadAction<boolean>) => {
      state.isTableStyleActive = payload
      state.isGridStyleActive = !payload
    },

    resetUsersState: (state) => {
      state.isLoading = false
      state.users = null
      state.allUsers = null
      state.userSelected = null
      state.filter = { role: null, status: null, userName: null }
      state.pagination = { page: 1, total: 1, totalPages: 1, itemsPerPage: 5 }
      state.isPaginationVisible = true
      state.hasEnteredPasswordCorrectly = false
      state.isTableStyleActive = true
      state.isGridStyleActive = false
      state.isOrderedAsc = false
    },

  },
});

export const {
  setIsLoading,
  addUser,
  updateUser,
  setUsers,
  setAllUsers,
  setUserSelected,
  resetUsers,
  setUsersMetaPagination,
  setPage,
  setRoleFilter,
  setStatusFilter,
  setUserNameFilter,
  setHasEnteredPasswordCorrectly,
  setTableView,
  setOrderedAsc,
  resetFilter,
  resetUsersState,
} = usersSlice.actions;
