import React, { useState, useCallback, useEffect, createContext } from 'react';

const ToastContext = createContext();
export default ToastContext;

export const ToastContextProvider = ({ children }) => {
	const [ toastrs, setToastrs ] = useState([]);

	useEffect(
		() => {
			if (toastrs.length > 0) {
				const timer = setTimeout(() => setToastrs((toastrs) => toastrs.slice(1)), 6000);
				return () => clearTimeout(timer);
			}
		},
		[ toastrs ]
	);

	const addToast = useCallback(
		function(toastr) {
			setToastrs((toastrs) => [ ...toastrs, toastr ]);
		},
		[ setToastrs ]
	);

	return (
		<ToastContext.Provider value={{ addToast, toastrs }}>
			{children}
			{console.log('toasrt', toastrs)}
			<div className="toastr__wrapper">
				{toastrs.map((toasrt, index) => (
					<div className={'toastr toastr--' + toasrt.title} key={index}>
						{toasrt.desc}
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
};
