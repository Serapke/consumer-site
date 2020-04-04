import Frontdoor from "Pages/frontdoor";
import FavoritesPage from "Pages/favorites";
import WorkoutPage from "Pages/workout/workout-page";
import RootPage from "Pages/root";

export default [
  {
    component: RootPage,
    routes: [
      {
        component: Frontdoor,
        exact: true,
        path: "/"
      },
      {
        component: FavoritesPage,
        path: "/favorites"
      },
      {
        component: WorkoutPage,
        path: "/workout/:id"
      }
    ]
  }
];
