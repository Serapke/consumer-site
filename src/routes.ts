import Frontdoor from "Pages/frontdoor";
import FavoritesPage from "Pages/favorites";

export default [
  {
    component: Frontdoor,
    exact: true,
    path: "/"
  },
  {
    component: FavoritesPage,
    path: "/favorites"
  }
];
