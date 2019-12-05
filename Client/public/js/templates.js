const headerDiv = `<h1>Welcome</h1>
        <h2> Please select what you want</h2>
        
`;

const gamesDiv = `<button id ="popularButton">Show the most popular games</button>`;
const groupsDiv = `<button id ="getGroupsButton">Show all Groups</button>`;

const gamesListTemplate =
    Handlebars.compile(
        `
            <ul>
                {{#each this}}
                    <li><a href='#game/{{name}}'>{{name}}</a></li>
                {{/each}}
            </ul>
        `);

const groupListTemplate =
    Handlebars.compile(
        `
            <ul>
                {{#each this}}
                    <li><a href='#group/{{id}}'>{{name}}</a></li>
                {{/each}}
            </ul>
        `);

const groupTemplate =
    Handlebars.compile(`
    <h1>{{name}}<h1>
    <h2>{{description}}</h2>
    <ul>
        {{#each games}}
            <li><a href='#game/{{this.name}}'>{{this.name}}</a></li>
        {{/each}}
    </ul>
     <button id ="goToHome">Go back!</button>
    ` )

const gameTemplate =
    Handlebars.compile(
        `
     {{#each this}}
        <h1>{{name}}</h1>
        <img src={{image_url}}>
        <h2>{{description}}</h2>
        <h2>maximum playtime: {{max_playtime}}</h2>
         {{/each}}
         <button id ="goToHome">Go back!</button>
    `);