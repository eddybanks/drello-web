import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getColumns } from "src/api/drello-api/column";
import { Column as innerColumn } from "src/types/inner/column.g";
import { Column as OuterColumn } from "src/types/outer/drello-api/column";
import { RootState } from "src/redux/root";

interface ColumnState {
  columns: innerColumn[];
}

const initialState: ColumnState = {
  columns: [],
};

const convertColumnToInnerType = (ob: OuterColumn): innerColumn => {
  return {
    id: ob.id,
    title: ob.title,
  };
};

/**
 * getColumnsThunk call the function to hit the API to fetch Column list data.
 */
export const getColumnsThunk = createAsyncThunk(
  "column/getColumnsThunk",
  async () => {
    const res = await getColumns();
    return res.data.columns.map((b) => convertColumnToInnerType(b));
  }
);

export const slice = createSlice({
  name: "column",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getColumnsThunk.fulfilled, (state, action) => {
      state.columns = action.payload;
    });
    builder.addCase(getColumnsThunk.rejected, (state, action) => {
      // handle errors if needed.
    });
  },
});

/**
 * selectColumns returns columns list from ColumnState of redux store.
 * This kind of functions that select proper data and return them are called `selector`.
 * Selector is often used when you want to access redux store's data from a component file,
 * so you can reuse the code to access them in many components.
 */
export const selectColumns = (state: RootState) => state.columnState.columns;

export const columnReducer = slice.reducer;
