import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBoard } from "src/api/drello-api/board";
import { Board as innerBoard } from "src/types/board.g";
import { Board as OuterBoard } from "src/api/drello-api/board";
import { RootState } from "src/redux/root";

interface BoardState {
  boards: innerBoard[];
}

const initialState: BoardState = {
  boards: [],
};

const convertBoardToInnerType = (ob: OuterBoard): innerBoard => {
  return {
    id: ob.id,
    title: ob.title,
  };
};

/**
 * getBoardsThunk call the function to hit the API to fetch Board list data.
 */
export const getBoardThunk = createAsyncThunk(
  "board/getBoardsThunk",
  async (boardId: number) => {
    return await getBoard(boardId);
  }
);

export const slice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardThunk.fulfilled, (state, action) => {
      state.boards = [convertBoardToInnerType(action.payload.data)];
    });
    builder.addCase(getBoardThunk.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

export const selectBoards = (state: RootState) => state.boardState.boards;

export const boardReducer = slice.reducer;
