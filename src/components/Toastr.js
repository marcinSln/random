import React, { useState, useEffect } from 'react';

const Toastr = (props) => {
	const { toastList } = props;

	return (
		<div className="toastr__container">
			{toastList.isActive ? (
				<div className={`toastr  toastr--${toastList.title}`}>
					<div className="toastr__content">
						<div className="toastr__text">{toastList.desc}</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default Toastr;
