console.log('entra?');

const articles = [
    {
        id: '1',
        title: 'Scoperta di una nuova specie di papera di gomma',
        content: 'Scoperta di una nuova specie di papera di gomma.',
        tags: 'geo, tech',
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

//dichiarazione variabili globali/comuni
const container = document.querySelector('.container');
const row = document.querySelector('.row');
const main = document.createElement('main');

//Creazione del tag main per sfruttarlo come eventHandler
main.setAttribute('id', 'siteMain');
main.classList.add('px-0');
row.appendChild(main);
const mainEl = document.getElementById('siteMain');


//funzione per l'assemblaggio della card dei filtri
function creaFiltersCard(tags) {

    const cardFiltersMarkUp = `
    <header id="siteHeader" class="px-0">
        <h1 class="text-center py-3">News Feed</h1>
        <div class="card d-flex flex-row justify-content-between p-3">
            <div class="filtro-tag">
            <label for="tags">Filtra per tags:</label>
            <select id="tags">
                ${creaOptions('Tutti i tags')}
                ${tags.map((tag) => creaOptions(tag))}
                ${creaOptions('politica')}
            </select>
            </div>
            <div class="filtro-saved">
                <input id="saved" type="checkbox">
                <label for="saved">Solo news salvate</label>
            </div>
        </div>
    </header>
    `

    row.insertAdjacentHTML('afterbegin', cardFiltersMarkUp);

}


//Creazione array vuoto di supporto per le savedCards e le discardedCards
const savedCards = [];
let discardedCards = [];


//Creazione array vuoto di supporto per i Tags
let supportArray = [];

//Creazione di un unico grande array, contenente i duplicati di tutti i tag presi dagli oggetti
articles.map((article) => {

    const tags = article.tags.split(', ');

    supportArray = supportArray.concat(tags);

})

//Applicazione di Set per scremare tutti i doppioni all'interno dell'array
let tagsNoDuplicate = Array.from(new Set(supportArray));

//richiamo la funzione DOPO la dichiarazione della variabile contenente il Set
creaFiltersCard(tagsNoDuplicate);



//funzione per la creazione del mark-up delle options
function creaOptions(tag) {

    const optionMarkUp = `
    <option>${tag}</option>
    `

    return optionMarkUp;

}


//funzione per l'assemblaggio della card
function creaCard(id, title, content, author, published, img, tags) {

    const cardMarkUp = `
    <div class="card p-3 news" data-id="${id}">
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

    main.insertAdjacentHTML('beforeend', cardMarkUp);

}


//funzione per creazione dei tag ed affibbiazione colore
function creaTags(tags) {

    const tagMarkup = `
    <li class="py-1 px-2 
        ${tags == 'geo' ? 'bg-primary'
            : tags == 'tech' ? 'bg-success'
                : tags == 'viaggi' ? 'bg-warning'
                    : tags == 'cucina' ? 'bg-danger'
                        : tags == 'arte' ? 'bg-info'
                            : tags == 'politica' ? 'bg-dark'
                                : 'bg-success-subtle'}
    rounded-3 me-2 text-white">${tags}</li>
    `;
    return tagMarkup;

}

articles.forEach((article) => {

    article.show = 'true';
    article.saved = 'false';
    //console.log(article.show);
    //console.log(article);

    //divisione dei tag nella stringa
    const tags = article.tags.split(', ');

    //divisione, inversione e separazione della stringa della data
    const data = article.published.split('-').reverse().join('-');

    //creazione delle cards
    creaCard(article.id, article.title, article.content, article.author, data, article.img, tags);

})


//seleziono tutti i bookmarks di FontAwesome e rendo l'oggetto da html collection ad un array per poter poi applicare l'eventlistener
const bookmarks = document.getElementsByClassName('fa-2x');
const bookmarksArray = [...bookmarks];
const news = Array.from(document.getElementsByClassName('news'));


for (let i = 0; i < articles.length; i++) {

    //applico ad ogni card la funzione toggle che intercambia le due icone di FontAwesome
    bookmarksArray[i].addEventListener('click', function () {

        bookmarksArray[i].classList.add('fa-solid');

        const dataId = news[i].getAttribute('data-id');

        if (bookmarksArray[i].classList.contains('fa-solid')) {

            savedCards.push(dataId);
            articles[i].saved = 'true';
            console.log(savedCards);

        }

    })

}


//selezione dell'elemento select
const select = document.querySelector('select');

//aggiunto evento 'change' sul select
select.addEventListener('change', function () {


    const filtratiSelect = articles.filter(article => {

        const tags = article.tags.split(', ');
        const id = article.id - 1;

        if (tags.includes(select.value)) {

            article.show = 'true';
            console.log(article.id);
            if (checkbox.checked) {
                if (savedCards.includes(article.id)) {
                    news[id].classList.remove('d-none');
                }
            } else {
                savedCards.includes(article.id);
                news[id].classList.remove('d-none');
                console.log('entro in all');
                console.log(news[id].classList);
            }


        } else if (select.value === 'Tutti i tags') {

            article.show = 'true';

            if (checkbox.checked) {
                if (savedCards.includes(article.id)) {
                    news[id].classList.remove('d-none');
                }
            } else {
                savedCards.includes(article.id);
                news[id].classList.remove('d-none');
                console.log('entro in all');
                console.log(news[id].classList);
            }

        } else {

            article.show = 'false';
            console.log('ig specifico');
            //if(checkbox.checked && article.saved)
            news[id].classList.add('d-none');


        }

        return article;
    })


    console.log(filtratiSelect);

    /*
    const giro = news.filter(singleNews => {

        if(checkbox.checked){
        
            if()


        }



    })*/


    //feedback per l'empty case
    /*
    if (news.every((singleNews) => singleNews.classList.contains('d-none'))) {

        const feedbackMarkUp = `
        <h3 id='empty' class='text-white'>Nessun elemento contiene i criteri di ricerca</h3>
        `

        row.insertAdjacentHTML('beforeend', feedbackMarkUp);


    }

    //prendo la stringa dell'empty case della select tramite id
    const empty = document.getElementById('empty')

    //rimuovo il feedback dell'empty case nel caso di una nuova ricerca che abbia riscontri
    if ((empty != null) && !(news.every((singleNews) => singleNews.classList.contains('d-none')))) {

        empty.remove();

    }

}*/

})




const checkbox = document.getElementById('saved');

checkbox.addEventListener('change', function () {

    const filtratiSaved = news.filter(singleNews => {

        const dataId = singleNews.getAttribute('data-id');
        const empty = document.getElementById('empty');

        if (checkbox.checked) {
            if (!(savedCards.includes(dataId))) {


                singleNews.classList.add('d-none');
                console.log(singleNews);
                

                if ((savedCards.length === 0) && (empty == null)) {
                    const feedbackMarkUp = `
                    <h3 id='empty' class='text-white'>Nessun elemento contiene i criteri di ricerca</h3>
                    `

                    row.insertAdjacentHTML('beforeend', feedbackMarkUp);
                }


            }

            /*else if(!(savedCards.includes(dataId)) && singleNews.classList.contains('d-none')){

            singleNews.classList.remove('d-none');

        }*/



            return singleNews;
        } else {
            singleNews.classList.remove('d-none');

            if(empty != null){
                empty.remove();
            }

            
        }
    })

    console.log(filtratiSaved);

})


