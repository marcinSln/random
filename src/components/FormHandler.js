import Firebase from 'firebase/app'; // TODO Make component to connect into firebase

export const validate = async (obj) => {
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
		result['toastr'] = toastr;
		result['errors'] = errors;
		return result;
	} else {
		return await logIn(obj);
	}
};

export const logIn = async (obj) => {
	const { login, password } = obj;
	let errors = [],
		toastr,
		result = [];

	await Firebase.auth().signInWithEmailAndPassword(login, password).then(
		(user) => {
			if (user) {
				this.setState({ redirect: '/admin' });
			}
		},
		(error) => {
			console.log('error', error.code);
			if (error.code.indexOf('invalid-email') > -1) {
				errors['login'] = true;
				obj.desc = 'Pole login nie zawiera prawidłowego formatu e-mail';
			} else if (error.code.indexOf('user-not-found') > -1) {
				errors['login'] = true;
				obj.desc = 'Nie znaleziono takiego użytkownika';
			} else {
				errors['login'] = true;
				errors['password'] = true;
				obj.desc = 'Nieznany błąd';
			}
			obj.title = 'error';
			obj.isActive = true;
			result['toastr'] = obj;
			result['errors'] = errors;
		}
	);

	return result;
};
