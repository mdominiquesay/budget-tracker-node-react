
import './App.css';
import { createBrowserRouter,
  RouterProvider, } from 'react-router-dom';
import HomePage,{HomePageLoader} from './Pages/HomePage';
import NavBar from './Pages/NavBar';
import Category,{CategoryLoader} from './Pages/Category';
import ErrorPage from './Pages/Error';
// Layouts
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      loader: HomePageLoader,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Category />,
          loader: CategoryLoader,
          errorElement: <ErrorPage />
        }
      ]
    },{
      path: "/category",
      element: <Category />,
      loader: CategoryLoader,
      errorElement: <ErrorPage />
    }
  ]);
  return (
    <>
      <div className="container pt-3">      
        <NavBar />
          <RouterProvider router={router} />
      </div>
    </>
  );
}
export default App;
