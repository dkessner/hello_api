//
// hello.js
//


// https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/
// https://github.com/taniarascia/sandbox/tree/master/ghibli


const ghibli = "https://ghibliapi.herokuapp.com/films";
const blah = "https://byabbe.se/on-this-day/10/27/events.json";

function sendRequest(url)
{
    const app = document.getElementById('root');

    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    app.appendChild(container);

    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {

      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
        data.forEach(thing => {
          
            const item = document.createElement('div');
            item.setAttribute('class', 'item');
            container.appendChild(item);

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
                td_value.textContent = thing[name];
                tr.appendChild(td_value);
            }

            item.appendChild(document.createElement("hr"));
        });
      } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
      }
    }

    request.send();
}


sendRequest(ghibli);
//sendRequest(blah);


