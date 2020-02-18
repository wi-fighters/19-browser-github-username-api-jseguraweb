// GitHub API => https://api.github.com/users/

const userInput = document.querySelector('#user-input');
const form = document.querySelector('form');
const container = document.querySelector('.container');
const userName = document.querySelector('.name');

const gitHubData = async () => {
    try {
        let gitHubResponse = await fetch(`https://api.github.com/users/${userInput.value}/repos`);
        let convertedData = await gitHubResponse.json();

        convertedData.map(repo => {
            container.style.display = 'none';
            const item = document.createElement('div');
            item.classList.add('repo');
            const link = document.createElement('a');
            link.classList.add('link');
            link.setAttribute('href', `https://github.com/${userInput.value}/${repo.name}`);
            link.appendChild(item);
            const title = document.createElement('h3');
            title.classList.add('title');
            title.appendChild(document.createTextNode(repo.name));
            const description = document.createElement('p');
            description.classList.add('description');
            description.appendChild(document.createTextNode(repo.description));
            item.append(title, description);
            container.appendChild(link);
            userName.innerText = userInput.value;
            container.style.display = 'flex';
        })
    } catch(err){
        console.log(err);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (userInput.value === '') {
        alert('Please, enter username')
    } else {
        gitHubData();
    }
})