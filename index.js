import App from "./js/App.js";
import Router from "./js/router.js";
import Api from "./js/Api.js";

const app = new App('#app');
const router = new Router(app)

//Components
app.addComponent(
    {
        name: "home",
        model: {
            data: ''
        },
        view(model){
            return `
                <div>
                    <h1>Home</h1>
                    <p>${model.data}</p>
                </div>
            `
        },
        controller(model){
            model.data = 'Welcome to Home!';
        }
    }
)
app.addComponent(
    {
        name: "dogs",
        model: {
            dogs: []
        },
        view(model){
            return `
                <ul>
                    ${model.dogs.map(dog=>dogTempleate(dog)).join('')}
                </ul>
            `;
        },
        async controller(model){
            const dataDogs = await Api.getDogs();
            model.dogs = dataDogs;
        }
    }
)

app.addComponent({
    name: 'dog',
    model: {
        dog: {}
    },
    view(model){
        return dogTempleate(model.dog);
    },
    async controller(model){
        const dataDog = await Api.getDog(router.params[1]);
        console.log(dataDog);
        model.dog = dataDog;
    }
});

//Template Dogs
const dogTempleate = (dog)=>`
<section class="dog-listing">
    <a href="#/dogs/${dog.id}">
        <h3 class="name">${dog.name}</h3>
        <section>
            <figure>
                <img src="${dog.url}" alt="${dog.name}">
            </figure>
            <p>${dog.description}</p>
        </section>
    </a>
</section>
`;

//Routes
router.addRoutes('home', '^#/home$')
router.addRoutes('dogs', '^#/dogs$')
router.addRoutes('dog', '^#/dogs/([0-9]+)$')