import './App.css';
import { Routes, Route } from 'react-router';
import { lazy, Suspense } from 'react';

import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { Spinner } from './components/Spinner.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import ToastContainer from './hooks/global/toast/ToastContainer.jsx';

const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))
const ContactPage = lazy(() => import('./pages/Contact.jsx'))
const ErrorPage = lazy(() => import('./pages/ErrorPage.jsx'))

export function App() {

  return (
    <>
      <div className='organized'>
        <Header />
        <ToastContainer />
        <Route path="/" component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="*" component={ErrorPage} codeError="notFound" />
        <Footer />
      </div>
    </>
  )
}
