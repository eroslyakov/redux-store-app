export default class BookstoreService {

    getBooks() {
        return new Promise((resolve, reject) => {
            const data = [
              { id: 1,
                title: 'Secrets of the JavaScript Ninja',
                author: 'John Resig',
                price: 32,
                coverUrl: 'https://images.manning.com/720/960/resize/book/b/72b6dbb-4eb6-4bbd-9078-b47f0393a1bb/Resig-JSN-2ed-HI.png'  },
              { id: 2,
                title: 'How JavaScript works',
                author: 'Douglas Crockford',
                price: 17,
                coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/71K5DR1-xeL.jpg' }
            ];
            setTimeout(() => {
                if(Math.random() < 0.75) {
                    resolve(data);
                } else {
                    reject(new Error('Something went wrong'));
                }
            }, 700);
        });
    }
}