//new Array
var RandomUserInfoArray = [];


//Fetch API
async function getData() {
    let url = 'https://randomuser.me/api',
        response = await fetch(url);
    return response.json();
}
async function getDataHelper() {
    return await getData()
        .then(data => data.results)
        .then(results => {
            let persona = results[0];
            let consolidateInfo = {
                name: `${persona.name.first} ${persona.name.last}`,
                phone: persona.phone,
                email: persona.email,
                picture: persona.picture.medium,
                location: persona.location
            };
            RandomUserInfoArray.push(consolidateInfo)
        });
};
async function callingData() {
    await getDataHelper();
    await getDataHelper();
    await getDataHelper();
}



//DOM Rendering starts here
//DOM
const table = document.querySelector('.table');
const button = document.querySelector('.btn');
const select = document.querySelector('select');



class createTable {
    constructor(name, email, phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    createTopTable() {
        return `
     <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
  </tr>`;
    }
    creatingNewRow(name, email, phone) {
        return `<tr>
                <th>${name}</th>
                <th>${email}</th>
                <th>${phone}</th>
                </tr>
             `
    }


}

function showitonTable(array) {
    let tableMaker = new createTable(),
        top = tableMaker.createTopTable();
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    table.insertAdjacentHTML('beforeend', top);
    array.forEach(value => {
        let name = value.name,
            phone = value.phone,
            picture = value.picture,
            email = value.email;
        let newRow = tableMaker.creatingNewRow(name, email, phone);
        table.insertAdjacentHTML('beforeend', newRow)
    })
}

function displayData() {
    RandomUserInfoArray = [];
    const newPromise = Promise.all([
        callingData()
    ]);
    newPromise
        .then(() => {
            showitonTable(RandomUserInfoArray)
        })
}

const newPromise = Promise.all([
    callingData()
]);

newPromise
    .then(() => {
        showitonTable(RandomUserInfoArray)
    })


//Event listeners
select.addEventListener('change', () => {
    let debounce = _.debounce(function() {
        console.log(RandomUserInfoArray)
        let newArray = _.sortBy(RandomUserInfoArray, `${select.value}`)
        showitonTable(newArray)
    }, 300);
    debounce();
})
button.addEventListener('click', e => {
    e.preventDefault();
    displayData();
    console.log('callingData')
})