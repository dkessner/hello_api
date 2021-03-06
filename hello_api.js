//
// hello_api.js
//


// https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/
// https://github.com/taniarascia/sandbox/tree/master/ghibli


const ghibli = "https://ghibliapi.herokuapp.com/films";
const events = "https://byabbe.se/on-this-day/3/31/events.json";
const randomCat = "https://aws.random.cat/meow";


function objectToElement(thing)
{
    const item = document.createElement('div');
    item.setAttribute('class', 'item');

    /*
    const p = document.createElement('p');
    p.textContent = JSON.stringify(thing);
    */

    const table = document.createElement('table');
    item.appendChild(table);
        
    for (let name in thing)
    {
        const tr = document.createElement('tr');
        table.appendChild(tr);

        const td_name = document.createElement('td');
        td_name.textContent = name;
        tr.appendChild(td_name);

        const td_value = document.createElement('td');
        td_value.textContent = JSON.stringify(thing[name]);
        tr.appendChild(td_value);
    }

    item.appendChild(document.createElement("hr"));

    return item;
}


const callback = function () {

    const root = document.getElementById('root');

    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    root.appendChild(container);

    var data = JSON.parse(this.response); // this === XMLHttpRequest object

    if (this.status >= 200 && this.status < 400) 
    {
        if (Array.isArray(data)) 
        {
            data.forEach(thing => {
                let item = objectToElement(thing);
                container.appendChild(item);
            });
        }
        else
        {
            let item = objectToElement(data);
            container.appendChild(item);
        }
    } 
    else 
    {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
    }
}


function sendRequest(url)
{
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = callback;
    request.send();
}


sendRequest(randomCat);
sendRequest(ghibli);
sendRequest(events);


