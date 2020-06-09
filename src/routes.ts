import Frontdoor from "Pages/frontdoor";
import FavoritesPage from "Pages/favorites";
import RootPage from "Pages/root";
import WorkoutCreatePage from "Pages/workout/workout-create-page";
import WorkoutEditPage from "Pages/workout/workout-edit-page";
import WorkoutPage from "Pages/workout/workout-page";
import ExerciseCreatePage from "Pages/exercise/exercise-create-page";
import ExerciseSelectPage from "Pages/exercise/exercise-select-page";

export default [
  {
    component: RootPage,
    routes: [
      {
        path: "/",
        exact: true,
        component: Frontdoor,
      },
      {
        path: "/favorites",
        component: FavoritesPage,
      },
      {
        path: "/workout/create",
        component: WorkoutCreatePage,
      },
      {
        path: "/workout/:id/edit",
        component: WorkoutEditPage,
      },
      {
        path: "/workout/:id",
        component: WorkoutPage,
      },
      {
        path: "/exercise/select",
        component: ExerciseSelectPage,
      },
      {
        path: "/exercise/create",
        component: ExerciseCreatePage,
      },
    ],
  },
];
