import Frontdoor from "Pages/frontdoor";
import FavoritesPage from "Pages/favorites";
import WorkoutPage from "Pages/workout/workout-page";
import RootPage from "Pages/root";
import WorkoutCreatePage from "Pages/workout/workout-create-page";
import ExerciseSelectPage from "Pages/exercise/exercise-select-page";
import ExerciseCreatePage from "Pages/exercise/exercise-create-page";

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
        component: WorkoutPage,
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
