import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/index.js';
import Python from './components/Python/index.js';
import JavaScript from './components/JavaScript/index.js';
import Container from 'react-bootstrap/Container';

import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes, Route, Link, NavLink} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

const Root = () => 
<Router>
	<div>
        <Navbar className="topNav">
	        <Container>
        		<Navbar.Brand>
        			<Link to="/" className="navTitle">NEWSAPP</Link>
        		</Navbar.Brand>
        		<Navbar.Toggle />
        		<Navbar.Collapse>
    			<Nav>
        			<NavItem>
        				<NavLink to="/" className={({ isActive }) => isActive? "active": 'notactive'}>Home</NavLink>
        			</NavItem>
        			<NavItem>
        				<NavLink to="/javascript" className={({ isActive }) => isActive? "active": 'notactive'}>Javascript</NavLink>
        			</NavItem>
		            <NavItem>
		            	<NavLink to="/python" className={({ isActive }) => isActive? "active": 'notactive'}>Python</NavLink>
		            </NavItem>
        		</Nav>
        		</Navbar.Collapse>	

	        </Container>
        </Navbar>

		<Routes>
			<Route path="/" element={<App />}></Route>
			<Route path="/javascript" element={<JavaScript />}></Route>
			<Route path="/python" element={<Python />}></Route>		
		</Routes>
	</div>
</Router>


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
