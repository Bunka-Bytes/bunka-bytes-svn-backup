import React, { useState } from 'react';
// ------- STYLES -----
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import './main.css';


// ------- COMPONENTS -----
// Antd and Bootstrap
import Container from 'react-bootstrap/Container';
import { Layout, ConfigProvider } from 'antd';


// Created 
import Home from './components/home';
import MenuSup from './components/menus/menu-sup';
import MenuSide from './components/menus/menu-side';
import Contato from './components/contato'
import DetalhesPergunta from './components/detalhes-pergunta';
import CriaPergunta from './components/cria-pergunta';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Redirect
} from 'react-router-dom';



// ------ LOCALE -------
import enUS from 'antd/lib/locale/en_US';
import ptBR from 'antd/lib/locale/pt_BR';
import moment from 'moment';
// import 'moment/locale/en-us';

moment.locale('pt');


// Destructuring
const { Content } = Layout;

const MainLayout = props => {
	// ------- STATES ------

	const [render, updateRender] = useState(1);
	const [locale, setLocale] = useState({
		locale: ptBR
	});

	// ------- VARIABLES ------

	const screens = {
		1: <Home />,
		2: <DetalhesPergunta />,
		3: <Home />,
		4: <Home />,
		5: <Home />
	};

	// ------- FUNCTIONS ------

	const changeLocale = e => {
		const localeValue = e.target.value;
		setLocale({ locale: localeValue });
		console.log('cheguei aqui');
		if (!localeValue) {
			moment.locale('pt');
		} else {
			moment.locale('en-us');
		}
	};

	const opcaoSelecionada = menu => {
		updateRender(menu.key);
	};
	return (
		<Layout
			style={{ minHeight: '100vh' }}
			// className="locale-components"
		>
			<MenuSide opcao={opcaoSelecionada} />
			<Layout>
				<MenuSup
				// value1={ptBR}
				// value2={enUS}
				// locale={locale}
				// changeLocale={changeLocale}
				/>
				<Container>
					<Content>{screens[render]}</Content>
				</Container>
				<Contato />
			</Layout>
		</Layout>
	);
}


function App() {
	// ------- STATES ------

	const [render, updateRender] = useState(1);
	const [locale, setLocale] = useState({
		locale: ptBR
	});

	// ------- VARIABLES ------

	const screens = {
		1: <Home href="/" />,
		2: <DetalhesPergunta />,
		3: <Home />,
		4: <Home />,
		5: <Home />
	};

	// ------- FUNCTIONS ------

	const changeLocale = e => {
		const localeValue = e.target.value;
		setLocale({ locale: localeValue });
		console.log('cheguei aqui');
		if (!localeValue) {
			moment.locale('pt');
		} else {
			moment.locale('en-us');
		}
	};

	const opcaoSelecionada = menu => {
		updateRender(menu.key);
	};

	return (
		<>
			<Layout
				style={{ minHeight: '100vh' }}
				// className="locale-components"
			>
				<MenuSide opcao={opcaoSelecionada} />
				<Layout>
					<MenuSup
					// value1={ptBR}
					// value2={enUS}
					// locale={locale}
					// changeLocale={changeLocale}
					/>
					<Container>
						<Content>							
							<Router>
								<Routes>
									<Route exact path="/" element={<Home />} />
									<Route path="/pergunta/:name" element={<DetalhesPergunta />} />
									<Route path="/criar-pergunta/" element={<CriaPergunta />} />
								</Routes>
							</Router>
						</Content>
					</Container>
					<Contato />
				</Layout>
			</Layout>
		</>
	);
}

export default App;
