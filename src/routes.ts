import Frontdoor from "Pages/frontdoor";
import FavoritesPage from "Pages/favorites";
import WorkoutPage from "Pages/workout/workout-page";
import RootPage from "Pages/root";
import WorkoutCreatePage from "Pages/workout/workout-create-page";
import SelectExercisePage from "Pages/exercise/exercise-select-page";

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
        component: SelectExercisePage,
        path: "/exercise/select",
      },
    ],
  },
];
