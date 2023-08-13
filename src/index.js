import './styles/main.scss';

const BUTTON = document.querySelector('.main-btn');
const countriesBox = document.querySelector('.countries-box');
const filter = document.querySelector('.filter');

class displayCountries {
    constructor() {
        this.API = 'https://restcountries.com/v3.1/all';
    }
    async getCountriesAPI () {
        const apiRes = [];
        await fetch(this.API)
        .then(response => response.json())
        .then(item => 
            item.forEach(element => {
            const newLI = document.createElement('span');
            const newBtn = document.createElement('button');

            const modalName = document.querySelector('.country-name');

            modalName.innerText = element.name.common;

            newBtn.classList = 'country-btn';
            newBtn.innerText = 'Info';

            newLI.classList = 'country-item';

            newLI.innerHTML = `${element.name.common}`;
            newLI.appendChild(newBtn)
            countriesBox.appendChild(newLI);
            apiRes.push(newLI)
            newBtn.addEventListener('click', () => {
                this.callModal(element)
            })

        }));
    }

    callModal(countryItem) {
        const mainModal = document.querySelector('.modal');
        const countryName = document.querySelector('.country-name');  
        const countryPopulation = document.querySelector('.country-population');  
        const countryCurrency = document.querySelector('.country-currency');   
        const countryFlag = document.querySelector('.country-flag');   
        const countryLanguage = document.querySelector('.country-language');   
        const closeBtn = document.querySelector('.close-btn');
        const wrapper = document.querySelector('.wrapper');

        mainModal.style.display = 'flex';
        
        countryLanguage.innerHTML = Object.values(countryItem.languages);
        countryFlag.setAttribute('src', countryItem.flags.png);
        countryPopulation.innerText = countryItem.population;
        countryName.innerText = countryItem.name.common;

        for(let currency in countryItem.currencies) {
            countryCurrency.innerText = currency;
        }

        closeBtn.addEventListener('click', this.closeModal);

    }

    closeModal(){
        const mainModal = document.querySelector('.modal');
        mainModal.style.display = 'none';
    }

    filter(e){
        const countryItems = document.querySelectorAll('.country-item');
        const text = e.target.value.toLowerCase();

        countryItems.forEach(item => {
            const itemName = item.firstChild.textContent.toLowerCase();

            if(itemName.indexOf(text) > -1) {
                item.style.display = 'flex';
             } else {
                item.style.display = 'none';
            }
        })

    }
}


filter.addEventListener('input', (e) => {
    const callAPI = new displayCountries();
    callAPI.filter(e);
})


BUTTON.addEventListener('click', (e) => {
    const callAPI = new displayCountries();
    callAPI.getCountriesAPI();
    e.target.disabled = true;
})