console.log('entra?');

const articles = [
    {
        id: '1',
        title: 'Scoperta di una nuova specie di papera di gomma',
        content: 'Scoperta di una nuova specie di papera di gomma.',
        tags: 'geo, tech, politica', //aggiunto politica
        author: 'Diana Rossi',
        published: '2023-02-11',
        img: 'rubber-duck.jpg'
    },
    {
        id: '2',
        title: 'Esplorando le profondità marine: il mistero degli abissi',
        content: 'Esplorando le profondità marine: il mistero degli abissi',
        tags: 'viaggi, geo',
        author: 'Fabio Mari',
        published: '2023-03-14',
        img: 'deep-sea.jpg'
    },
    {
        id: '3',
        title: 'Viaggio culinario: alla ricerca dei sapori perduti',
        content: 'Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici',
        tags: 'cucina',
        author: 'Marta Bianchi',
        published: '2023-04-20',
        img: 'kitchen-food.jpg'
    },
    {
        id: '4',
        title: 'Arte moderna: oltre i confini convenzionali',
        content: 'Un\'analisi delle tendenze e delle sfide nell\'arte contemporanea, con interviste a artisti emergenti.',
        tags: 'arte, tech',
        author: 'Gabriele Neri',
        published: '2023-05-29',
        img: 'modern-art.jpg'
    }
]



function creaCard(title, content, author, published, img, tags){

    const row = document.querySelector('.row');
    
    const cardMarkUp = `
    <div class="card p-3">
        <div class="title d-flex justify-content-between align-items-center">
            <h2 class="mb-0 fw-bold">${title}</h2>
            <i class="fa-regular fa-2x fa-bookmark"></i>
        </div>
        <h5 class="mb-0 fw-bold">pubblicato da ${author}</h5>
        <p>in data ${published}</p>
        <h6>${content}</h6>
        <img src="./m2_assets_newsfeed/images/${img}" alt="${img}">
        <ul class="tags d-flex list-unstyled mt-3 mb-0"> 
        ${tags.map((tag) => creaTags(tag)).join('')}      
        </ul>
    </div>
    `

    row.insertAdjacentHTML('beforeend', cardMarkUp);

}



function creaTags(tags){

    const tagMarkup = `
    <li class="py-1 px-2 
        ${tags == 'geo' ? 'bg-primary'
        : tags == 'tech' ? 'bg-success'
        : tags == 'viaggi' ? 'bg-warning'
        : tags == 'cucina' ? 'bg-info'
        : tags == 'arte' ? 'bg-danger'
        : tags == 'politica' ? 'bg-dark'
        : 'bg-success-subtle'}
    rounded-3 me-2 text-white">${tags}</li>
    `;
    return tagMarkup;

}





articles.forEach((article) => {

    const tags = article.tags.split(', ');

    creaCard(article.title, article.content, article.author, article.published, article.img, tags);

})

