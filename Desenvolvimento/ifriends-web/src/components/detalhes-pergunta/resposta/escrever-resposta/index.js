import React, { Fragment, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
	Comment,
	Avatar,
	Form,
	Button,
	List,
	Input,
	Row,
	Col,
	Space,
	Tooltip,
	Typography,
	message
} from 'antd';
import moment from "moment";
import { AiOutlineUser } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { IoIosUndo } from "react-icons/io";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";

// ------ SERVICES -----
import { getRespostas, postResposta } from "../../../../services/resposta";

// ------ FUNCTIONS ------
import { dateDifferenceInDays } from "../../../../utils/functions";
import { t } from 'i18next';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
	<List
		dataSource={comments}
		header={`${comments.length} ${
			comments.length > 1 ? t('label-answers') : t('label-answer')
		}`}
		itemLayout="horizontal"
		renderItem={props => <Comment {...props} />}
	/>
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
	<>
		<Typography>
			<Typography.Title level={3}>{t('label-your-answer')}</Typography.Title>
			<Typography.Paragraph>
				<small>{t('label-your-answer-small')}</small>
			</Typography.Paragraph>
		</Typography>
		<Form.Item>
			<TextArea rows={4} onChange={onChange} value={value} />
		</Form.Item>
		<Form.Item>
			<Row justify="end">
				<Button
					htmlType="submit"
					loading={submitting}
					onClick={onSubmit}
					icon={<IoIosUndo color="white" />}
					type="primary"
					style={{
						background: 'var(--green)',
						borderColor: 'var(--green-medium)'
					}}
				>
					{t('btn-responder')}
				</Button>
			</Row>
		</Form.Item>
	</>
);

const Comentario = (props) => {
	const [comments, setComments] = useState([]);
	const [submitting, setSubmitting] = useState(false);
  	const [value, setValue] = useState('');
	const [likes, setLikes] = useState(0);
  	const { t } = useTranslation();
	

  	const { idPergunta } = props;
  
  	const exibirdata = (resposta) => {
    const { dataEmissao } = resposta;
    const newDataEmissao = new Date(
      `${dataEmissao[0]}-${dataEmissao[1]}-${dataEmissao[2]}`
    );
    const dateToday = new Date();

    const differDatesInDays = dateDifferenceInDays(
      newDataEmissao,
      dateToday
    );

    return differDatesInDays;
  }

  useEffect(() => {
    getRespostas(idPergunta)
			.then(request => {
				console.log('dadosResposta', request.data);

				let respostas = request.data.map(resposta => {
					return {
						content: resposta.texto,
						author: resposta.usuario.nome,
						avatar: resposta.usuario.imagem,
						datetime: `${exibirdata(resposta)} ${t('label-days-ago')}`
					};
				});

				setComments(respostas);
			})
			.catch(error => {
				console.log(error);
				return message.error(
					error.response.data + ' - ' + error.code + ' ' + error.response.status
				);
			});
  }, []);
  
	const handleSubmit = () => {
		if (!value) return;
		setSubmitting(true);
		setTimeout(() => {
			setSubmitting(false);
			setValue('');
			let resposta = {
				texto: value,
				pergunta: idPergunta
      		};
		postResposta(resposta)
			.then(request => {
				message.success(t('label-answers-thks'));
				console.log('dadosResposta', request.data);

				setComments([
					...comments,
					{
						author: request.data.usuario.nome,
						avatar: request.data.usuario.imagem,
						content: <p>{request.data.texto}</p>,
						datetime: `${exibirdata(request.data)} ${t('label-days-ago')}`
					}
				]);
			})
			.catch(error => {
				console.log(error);
				return message.error(
					error.response.data + ' - ' + error.code + ' ' + error.response.status
				);
			});
		}, 1000);
	};

	const handleChange = e => {
		setValue(e.target.value);
	};

	return (
		<>
			{comments.length > 0 && <CommentList comments={comments} />}
			<Comment
				// avatar={
				// 	<Avatar
				// 		src={null}
				// 		icon={<AiOutlineUser />}
				// 		size="large"
				// 		className="icons"
				// 		style={{ marginRight: '1rem' }}
				// 	/>
				// }
				content={
					<Editor
						onChange={handleChange}
						onSubmit={handleSubmit}
						submitting={submitting}
						value={value}
					/>
				}
			/>
		</>
	);
};

export default Comentario;
