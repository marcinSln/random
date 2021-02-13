import React,{ useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/fontawesome-free-solid';
import PopUp from './PopUp';


export default function List(props) {
	let { members, onClick, classStyle, editableMember, onInput, confirmEdit, handleDelete } = props;
	let input;
	const [visible, setVisible] = useState(false);

	
	let newOne = (
		<>
			<li className="list__item list__item--add"  onClick={e => setVisible(!visible)}>
				<span className="text--big member__overall" />
				<span className="member__info">
					<FontAwesomeIcon icon={Icons.faPlusCircle} size="2x" />
					<span className="member__name" />
				</span>
				{input}
			</li>
			{ visible ? (
				<>
				<PopUp closePopUp={e => setVisible(false)}/>
				<div className="mask" onClick={e => setVisible(false)}></div>
				</>
			): null}	
		</>
	);

	let items = Object.keys(members).map((item) => {
		input = (
			<div
				className={
					editableMember && members[item].name === editableMember['0'].name ? (
						'input__block member__edit-input active'
					) : (
						'input__block member__edit-input'
					)
				}
			>
				<input
					className="input__field"
					value={members[item].overall}
					max="10"
					type="number"
					onInput={onInput}
					name={item}
					placeholder={members[item].overall}
				/>
				<FontAwesomeIcon
					className="input__submit-icon"
					onClick={confirmEdit}
					data-id={item}
					icon={Icons.faCheck}
					size="1x"
				/>
				<FontAwesomeIcon
					className="input__submit-icon"
					onClick={handleDelete}
					data-id={item}
					icon={Icons.faTrash}
					size="1x"
				/>
			</div>
		);

		return members[item].name ? (
			<li
				key={item}
				className={`${classStyle ? classStyle : ''} list__item`}
				onClick={onClick}
				data-name={members[item].name}
				name={item}
				data-overall={members[item].overall}
			>
				<span className="text--big member__overall">{members[item].overall}</span>
				<span className="member__info">
					<FontAwesomeIcon icon={Icons.faUserAlt} size="2x" />
					<span className="member__name">{members[item].name}</span>
				</span>
				{input}
			</li>
		) : (
			''
		);
	});

	return (
		<div>
			<ul className="list">
				{items}
				{newOne}
			</ul>
		</div>
	);
}
