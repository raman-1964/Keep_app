import {
  ADD_NOTE_FAILED,
  ADD_NOTE_REQUEST,
  ADD_NOTE_SUCCESS,
  DELETE_NOTE_FAILED,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  GET_NOTE_FAILED,
  GET_NOTE_REQUEST,
  GET_NOTE_SUCCESS,
  LIKE_NOTE_FAILED,
  LIKE_NOTE_REQUEST,
  LIKE_NOTE_SUCCESS,
  UNLIKE_NOTE_FAILED,
  UNLIKE_NOTE_REQUEST,
  UNLIKE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILED,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
} from "../Constants/noteConstants";

const initialState = {
  notes: [],
  notesLoading: false,
  addnoteLoading: false,
  updateNoteLoading: false,
  likeNotesLoading: [],
  deleteNoteLoading: [],
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTE_REQUEST:
      return { ...state, notesLoading: true };

    case GET_NOTE_SUCCESS:
      return {
        ...state,
        notes: [...action.payload],
        notesLoading: false,
      };

    case GET_NOTE_FAILED:
      return { ...state, notesLoading: false };

    case ADD_NOTE_REQUEST:
      return { ...state, addnoteLoading: true };

    case ADD_NOTE_SUCCESS:
      return {
        ...state,
        notes: [...state.notes, action.payload],
        addnoteLoading: false,
      };

    case ADD_NOTE_FAILED:
      return { ...state, addnoteLoading: false };

    case UPDATE_NOTE_REQUEST:
      return { ...state, updateNoteLoading: true };

    case UPDATE_NOTE_SUCCESS:
      const tmpNotes = state.notes.map((note) => {
        if (note._id === action.payload._id) return action.payload;
        return note;
      });
      return { ...state, notes: tmpNotes, updateNoteLoading: false };

    case UPDATE_NOTE_FAILED:
      return { ...state, updateNoteLoading: false };

    case DELETE_NOTE_REQUEST:
      return {
        ...state,
        deleteNoteLoading: [...state.deleteNoteLoading, action.payload],
      };

    case DELETE_NOTE_SUCCESS: {
      const updatedNote = state.notes.filter((note) => {
        if (note._id !== action.payload) return note;
      });
      const updatedDeleteLoading = state.deleteNoteLoading.filter((id) => {
        if (id !== action.payload) return id;
      });
      return {
        ...state,
        notes: updatedNote,
        deleteNoteLoading: updatedDeleteLoading,
      };
    }

    case DELETE_NOTE_FAILED: {
      const updatedDeleteLoading = state.deleteNoteLoading.filter((id) => {
        if (id !== action.payload) return id;
      });
      return { ...state, deleteNoteLoading: updatedDeleteLoading };
    }

    case LIKE_NOTE_REQUEST:
      return {
        ...state,
        likeNotesLoading: [...state.likeNotesLoading, action.payload._id],
      };

    case LIKE_NOTE_SUCCESS: {
      const updatedNotes = state.notes.map((note) => {
        if (note._id === action.payload._id) return action.payload;
        return note;
      });
      const updatedLikeLoading = state.likeNotesLoading.filter((id) => {
        if (id !== action.payload) return id;
      });
      return {
        ...state,
        notes: updatedNotes,
        likeNotesLoading: updatedLikeLoading,
      };
    }
    case LIKE_NOTE_FAILED: {
      const updatedLikeLoading = state.likeNotesLoading.filter((id) => {
        if (id !== action.payload) return id;
      });
      return { ...state, likeNotesLoading: updatedLikeLoading };
    }

    case UNLIKE_NOTE_REQUEST:
      return {
        ...state,
        likeNotesLoading: [...state.likeNotesLoading, action.payload._id],
      };

    case UNLIKE_NOTE_SUCCESS: {
      const updatedNotes = state.notes.map((note) => {
        if (note._id === action.payload._id) return action.payload;
        return note;
      });
      const updatedLikeLoading = state.likeNotesLoading.filter((id) => {
        if (id !== action.payload) return id;
      });
      return {
        ...state,
        notes: updatedNotes,
        likeNotesLoading: updatedLikeLoading,
      };
    }
    case UNLIKE_NOTE_FAILED: {
      const updatedLikeLoading = state.likeNotesLoading.filter((id) => {
        if (id !== action.payload) return id;
      });
      return { ...state, likeNotesLoading: updatedLikeLoading };
    }

    default:
      return state;
  }
};
