import Frontdoor from "Pages/frontdoor";
import FavoritesPage from "Pages/favorites";
import RootPage from "Pages/root";
import WorkoutCreatePage from "Pages/workout/workout-create-page";
import WorkoutEditPage from "Pages/workout/workout-edit-page";
import ExerciseCreatePage from "Pages/exercise/exercise-create-page";
import ExerciseSelectPage from "Pages/exercise/exercise-select-page";

export default [
  {
    component: RootPage,
    routes: [
      {
        component: Frontdoor,
        exact: true,
        path: "/",
      },
      {
        component: FavoritesPage,
        path: "/favorites",
      },
      {
        component: WorkoutCreatePage,
        path: "/workout/create",
      },
      {
        component: WorkoutEditPage,
        path: "/workout/:id",
      },
      {
        component: ExerciseSelectPage,
        path: "/exercise/select",
      },
      {
        component: ExerciseCreatePage,
        path: "/exercise/create",
      },
    ],
  },
];
