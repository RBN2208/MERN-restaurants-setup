import AddReview from "./components/add-review";
import Login from "./components/login";
import Restaurants from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import {Switch, Link, Route} from 'react-router-dom'
import {useState} from 'react'
import styled from 'styled-components'

export default function App() {

  const [user, setUser] = useState(null)

  async function login(user = null) {
    setUser(user)
  }

  async function logout(){
    setUser(null)
  }
  return (
    <div className="App">
      <Navigation>
        <Home href="/restaurants">
          Restaurants Reviews
        </Home>
        <Menubar>
          <li>
            <Link to={"/restaurants"}>
              Restaurants
            </Link>
          </li>
          <li>
            { user ? (
              <a onClick={logout} href="/#">
                Logout {user.name}
              </a>
            ) : (<Link to={"/login"}>Login</Link>)}
          </li>
        </Menubar>
      </Navigation>
      <Content>
        <Switch>
          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
          <Route path={["/restaurants/:id/review"]} render={(props) => (<AddReview {...props} user={user} /> )} />
          <Route path={["/restaurants/:id"]} render={(props) => (<Restaurants {...props} user={user} /> )} /> 
          <Route path={["/login"]} render={(props) => (<Login {...props} login={login} /> )} /> 
        </Switch>
      </Content>
    </div>
  );
}

const Navigation = styled.nav`
  display: flex;
  gap: 50px;
  top: 0;
  width: 100vw;
  padding: 15px;
  background-color: cadetblue;
  color: white;
`

const Home = styled.a`
  font-size: 2rem;
  font-weight: bold;
  &:active,:visited,:link{
    color: white;
    text-decoration: none;
  }
`

const Menubar = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  a{
    &:active,:visited,:link{
    color: white;
    text-decoration: none;
    }
  }
  li{
    list-style-type:none;
  }
`

const Content = styled.div`
  padding: 20px;
`