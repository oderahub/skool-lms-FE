import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "../states/userDetails/userDetailsSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import employmentDetailsReducer from "../states/applicationDetails/employmentDetailsSlice";
import academicReferencesReducer from "../states/applicationDetails/academicReferencesSlice";
import fundingInformationReducer from "../states/applicationDetails/fundingInformationSlice";
import disabilityDetailsReducer from "../states/applicationDetails/disabilityDetailsSlice";
import personalStatementReducer from "../states/applicationDetails/personalStatementSlice";
import uploadPassportReducer from "../states/applicationDetails/uploadPassportSlice"
import englishQualificationReducer from "../states/applicationDetails/englishQualificationSlice";
import qualificationsReducer from "../states/applicationDetails/qualificationsSLice";
import stepOneDataReducer from "../states/onboardingViews/stepOneDataSlice";
import stepTwoDataReducer from "../states/onboardingViews/stepTwoDataSlice";
import notificationCountReducer from "../states/notification/notificationSlice";
import messagesReducer from "../states/messages/messagesSlice"; // Import your messages slice
import messageCountReducer from "../states/messages/messageNotificationSlice"



const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    userDetails: userDetailsReducer,
    personalStatement: personalStatementReducer,
    employmentDetails: employmentDetailsReducer,
    academicReferences: academicReferencesReducer,
    disabilityDetails: disabilityDetailsReducer,
    englishQualification: englishQualificationReducer,
    fundingInformation: fundingInformationReducer,
    uploadPassport: uploadPassportReducer,
    qualifications: qualificationsReducer,
    stepOneData: stepOneDataReducer,
    stepTwoData: stepTwoDataReducer,
    notificationStatus: notificationCountReducer,
    messages: messagesReducer,
    messageCount: messageCountReducer
    
  })
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


// Function to purge persisted state

// export const clearPersistedState = async () => {
//   await persistor.purge(); 
// };
