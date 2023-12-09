import RecipePage from "./pages/RecipePage"
import RecipesListPage from "./pages/RecipesListPage"

const routes = [
    {
        element: <RecipePage />,
        path: "/"
    },
    {
        element: <RecipesListPage />,
        path: "/recipes"
    }
]

export default routes