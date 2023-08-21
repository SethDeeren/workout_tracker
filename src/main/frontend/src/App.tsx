import React, { useContext } from "react";
import { AuthContext } from "./store/auth-context";
import { Route, Routes, Navigate } from "react-router-dom";
import CreateWorkoutPage from "./pages/CreateWorkoutPage";
import WorkoutPage from "./pages/WorkoutPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";

import UserProfilePage from "./pages/UserProfilePage";
import WorkoutsList from "./components/WorkoutsList";
import MyWorkoutsPage from "./pages/MyWorkoutsPage";
import MyWorkoutExercisesPage from "./pages/MyWorkoutExercisesPage";
import MyExerciseTrackerPage from "./pages/MyExerciseTrackerPage";
import MyWorkoutEditPage from "./pages/MyWorkoutEditPage";


function App() {
  const authCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<h1>Home Page</h1>} /> */}
        <Route path="/fit-challenge" element={<h1>Fit Challenge</h1>} />
        <Route path="/workouts" element={<WorkoutsList/>} />
        {authCtx.isLoggedIn && (
          <Route path="/my-workouts">
              <Route path="/my-workouts" element={<MyWorkoutsPage/>} />
              <Route path="/my-workouts/:id" element={<MyWorkoutEditPage />} />
              <Route path="/my-workouts/:id/exercises" element={<MyWorkoutExercisesPage />} />
              
          </Route>         
        )}
        {authCtx.isLoggedIn && (
          <Route path="/my-workouts/:workoutId/exercises/:exerciseId" element={<MyExerciseTrackerPage />} />
        )}
        {authCtx.isLoggedIn && (
          <Route path="/user-profile" element={<UserProfilePage />} />
        )}
        {authCtx.isLoggedIn && (
          <Route path="/create-workout" element={<CreateWorkoutPage />} />
        )}
        {!authCtx.isLoggedIn && ( //authCtx.isLoggedIn
          <Route path="/login" element={<LoginPage />} />
        )}
        <Route path="/workouts/:id" element={<WorkoutPage/>} />
        <Route path="*" element={authCtx.isLoggedIn ? <Navigate replace to="/my-workouts"/> : <Navigate replace to="/login" />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
