import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { userReducer } from "./reducers/userReducer";
import { postReducer } from "./reducers/postReducer";
import { courseReducer } from "./reducers/courseReducer";
import { groupReducer } from "./reducers/groupReducer";
import { videoReducer } from "./reducers/videoReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    course: courseReducer,
    group: groupReducer,
    video: videoReducer,
  },
});

export default store;
