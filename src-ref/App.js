import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Counter from './components/Counter';
import Posts from './components/Posts';
import Users from './components/Users';
import Contact from './components/Contact';
import Notfound from './components/Notfound';
import Noida from './components/child/Noida';
import Delhi from './components/child/Delhi';
import Gurugram from './components/child/Gurugram';
import Products from './components/Products';
import Myproducts from './components/Myproducts';
import ChangeTheme from './Context/ChangeTheme';
import Myredux from './components/Myredux';
const App=()=>{
  return(
    <ChangeTheme> 
    <main>
      
      <Router>
        <Nav />
        <section className='container'>
            {/* load dynamic components */}
            <Routes>
                <Route path='' element={<Home />}/>
                <Route path='about' element={<About />}/>
                <Route path='myredux' element={<Myredux />}/>
                <Route path='counter' element={<Counter />}/>
                <Route path='posts' element={<Posts />}/>
                <Route path='users' element={<Users />}/>
                <Route path='myproducts' element={<Myproducts />}/>
                <Route path='products/:cname' element={<Products />}/>
                <Route path='contact' element={<Contact />}>
                     <Route path='noida' element={<Noida /> }/>
                     <Route path='delhi' element={<Delhi /> }/>
                     <Route path='gurugram' element={<Gurugram /> }/>
                </Route>
                {/* not found  */}
                <Route path='*' element={<Notfound />}/>
            </Routes>
        </section>
      </Router>
      
    </main>
    </ChangeTheme>
  )
}
export default App;