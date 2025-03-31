import { configureStore } from '@reduxjs/toolkit';
import {
  loadingBarMiddleware,
  loadingBarReducer,
} from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import classesReducer from './classes/reducer';
import studentsReducer from './students/reducer';
import subjectsReducer from './subjects/reducer';
import commonReducer from './common/reducer';
import teachersReducer from './teachers/reducer';
import examsReducer from './exams/reducer';
import schoolReducer from './school/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    classes: classesReducer,
    students: studentsReducer,
    subjects: subjectsReducer,
    common: commonReducer,
    teachers: teachersReducer,
    exams: examsReducer,
    school: schoolReducer,
    loadingBar: loadingBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingBarMiddleware()),
});

export default store;
