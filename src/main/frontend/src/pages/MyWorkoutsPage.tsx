import React, { useRef, useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";

import MyWorkoutList from "../components/MyWorkoutList";

const MyWorkoutsPage = () => {
    return <div><MyWorkoutList/></div>
}

export default MyWorkoutsPage;