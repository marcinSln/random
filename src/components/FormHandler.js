import firebase from 'firebase/app';

export const validate = (obj) => {
	let errors = [],
		toastr,
		result = [];
	const { login, password } = obj;
	if (login === '' || password === '') {
		obj.desc = 'Uzupełnij pola';
		obj.title = 'error';
		obj.isActive = true;

		errors['password'] = password ? false : true;
		errors['login'] = login ? false : true;

		toastr = obj;
		errors = errors;

		result['toastr'] = toastr;
		result['errors'] = errors;

		return result;
	} else {
		obj.desc = 'Hasło lub login są niepoprawne';
		obj.title = 'error';
		obj.isActive = true;

		toastr = obj;
		errors = errors;

		result['toastr'] = toastr;
		result['errors'] = errors;
		return result;
	}
};

// export const login = (obj) => {
// 	Firebase.auth().signInWithEmailAndPassword(login, password).then(
// 		(user) => {
// 			if (user) {
// 				logIn(user.email);
// 				this.setState({ redirect: '/admin' });
// 			}
// 		},
// 		(error) => {
// 			obj.desc = 'Hasło lub login są niepoprawne';
// 			obj.title = 'error';
// 			obj.isActive = true;
// 			// this.setState({
// 			// 	toastr: obj
// 			// });
// 			// setTimeout((e) => {
// 			// 	obj.isActive = false;
// 			// 	this.setState({
// 			// 		toastr: obj
// 			// 	});
// 			// }, 3000);
// 		}
// 	);
// };
