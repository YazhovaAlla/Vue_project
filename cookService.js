class Dishes {
    getDishesList() {
		console.log('dishes.js => getDishesList');
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();
			console.log('1');
			xhr.open('GET', 'http://localhost:3000/api/dishes');
			console.log('2');

			xhr.onload = () => resolve(JSON.parse(xhr.response));
			xhr.send();
		});
    }

    addDish(newDish) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3000/api/dish');
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send(JSON.stringify(newDish));
		});
	}

	getDish(id) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', `http://localhost:3000/api/dish/${id}`);

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
	}

	editDish(updatedDish) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('PUT', `http://localhost:3000/api/dish/${updatedDish.id}`);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve();

			xhr.send(JSON.stringify(updatedDish));
		});
	}

	deleteDish(dishId) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('DELETE', `http://localhost:3000/api/dish/${dishId}`);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve();

			xhr.send();
		});
	}
}

export default Dishes;