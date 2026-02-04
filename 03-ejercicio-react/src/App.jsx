import { Route } from './hooks/router/Route.jsx';

import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';

import { HomePage } from './pages/Home.jsx';
import { SearchPage } from './pages/Search.jsx';
import { ContactPage } from './pages/Contact.jsx';
import { ErrorPage } from './pages/404.jsx'

export function App() {

  return (
    <>
      <div className='organized'>
        <Header />
        <Route path="/" component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="*" component={ErrorPage} codeError="notFound" />
        <Footer />
      </div>
    </>
  )
}
