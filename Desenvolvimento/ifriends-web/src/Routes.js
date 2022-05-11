import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Home from './components/home'
import DetalhesPergunta from './components/detalhes-pergunta';


function Routing() {
    return (
			<Router>
				<Routes>
					<Route exact path="/pergunta" element={<DetalhesPergunta />} />
				</Routes>
			</Router>
		);

}


export default Routing;