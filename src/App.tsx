import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { TRoute } from './appTypes';
import Navbar from './components/navbar/Navbar';
import CenteredLoader from './components/shared/loader/CenteredLoader';
import RecipeProvider from './contexts/RecipeContext';
import SavedProvider from './contexts/SavedContext';

//* lazy import
const Home = lazy(() => import('./components/screens/home/Home'))
const Dishes = lazy(() => import('./components/screens/dishes/Dishes'))
const Dish = lazy(() => import('./components/screens/dish/Dish'))
const Pairing = lazy(() => import('./components/screens/pairing/Pairing'))
const Wines = lazy(() => import('./components/screens/wines/Wines'))
const Saved = lazy(() => import('./components/screens/saved/Saved'))
const Search = lazy(() => import('./components/screens/search/Search'))
const SearchResults = lazy(() => import('./components/screens/searchResults/SearchResults'))
const NotFound = lazy(() => import('./components/screens/notFound/NotFound'))

//* routes
const routes: TRoute[] = [
  {to: '/', elem: <Home />},
  {to: '/dishes', elem: <Dishes />, link: 'Dishes'},
  {to: '/dishes/:id', elem: <Dish />},
  {to: '/pairing', elem: <Pairing />, link: 'Pairing'},
  {to: '/wines', elem: <Wines />, link: 'Wines'},
  {to: '/saved', elem: <Saved />, link: 'Saved'},
  {to: '/saved/:id', elem: <Dish />},
  {to: '/search', elem: <Search />},
  {to: '/search/results', elem: <SearchResults />},
  {to: '/search/results/:id', elem: <Dish />},
  {to: '*', elem: <NotFound />}
]

//* links
const pages = routes.filter(el => el.link)
export const links = pages.map(el => ({to: el.to, link: el.link}))

const App = (): JSX.Element => {
  return (
    <>
    <SavedProvider>
    <Navbar />
    <RecipeProvider>
    <Suspense fallback={<CenteredLoader />}>
      <Routes>
        {
          routes.map((el, i) => <Route key={i} path={el.to} element={el.elem} />)
        }
      </Routes>
    </Suspense>
    </RecipeProvider>
    </SavedProvider>
    </>
  )
}

export default App