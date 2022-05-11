import React from 'react';
import { Menu, Layout, Row, Col, Button } from 'antd';
import { FiSettings, FiHelpCircle } from 'react-icons/fi';
import {
	IoHome,
	IoCalendarClearOutline,
	IoPricetagsOutline,
	IoMenu
} from 'react-icons/io5';

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label
	};
}



const MenuSide = props => {
	const { opcao } = props;

	const items = [
		getItem(
			'Perguntas',
			'1',
			<IoHome  style={{ fontSize: '1.5rem' }} />
		),
		getItem(
			'Eventos',
			'2',
			<IoCalendarClearOutline  style={{ fontSize: '1.5rem' }} />
		),
		getItem(
			'Categorias',
			'3',
			<IoPricetagsOutline  style={{ fontSize: '1.5rem' }} />
		),
		getItem(
			'Ajuda',
			'4',
			<FiHelpCircle  style={{ fontSize: '1.5rem' }} />
		),
		getItem(
			'Configurações',
			'5',
			<FiSettings  style={{ fontSize: '1.5rem' }} />
		)
	];

	return (
		<Layout.Sider
			collapsible
			defaultCollapsed
			className="layout-background"
			style={{ width: '4rem !important' }}
		>
			<Menu
				className="layout-background layout-sider"
				mode="vertical"
				style={{
					display: 'grid',
					alignContent: 'space-around',
					alignItems: 'middle'
				}}
				items={items}
				onClick={opcao}
			/>
		</Layout.Sider>
	);
};
export default MenuSide;
