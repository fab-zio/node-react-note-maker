const http = require('http');
const url = require('url');
const querystring = require('querystring');
const notes = require('./notes');
const port = 3001;

const server = http.createServer((request, response) => {
    console.log(notes);
    const urlObject = url.parse(request.url);
    const data = querystring.parse(urlObject.query);
    let payload = {};
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.setHeader('Content-Type', 'application/json');

    switch (urlObject.pathname) {
        case '/api/notes/list':
            // response.end('List all notes');
            payload = {
                endpoint: 'list',
                description: 'List all notes',
                data: notes.fetchNotes()
            };

            break;
        case '/api/notes/add':
            payload = {
                endpoint: 'add',
                description: 'Add a note',
            };
            if (data.title) {
                let note = notes.addNote(data.title, data.body);
                if (note) {
                    payload['note'] = note;
                } else {
                    payload['error'] = 'Note title already taken';
                }
            }
            payload['data'] = notes.fetchNotes();
            //  response.end(`{
            //     status: "Not created",
            //     title: "${note.title}",
            //     body: "${note.body}"
            // }`);
            // } else {
            //     response.end('Note title already taken');
            // }
            // response.end('Add a note');
            break;
        case '/api/notes/delete':
            payload = {
                endpoint: 'delete',
                description: 'Delete a note'
            };
            // response.end('Delete a note');
            break;
        default:
            payload = {
                api: 'Notes 0.0.1',
                endpoints: 'add, list, delete',
            }
    }

    response.end(JSON.stringify(payload));
    // response.end('API alive:' + request.url);
});
server.listen(port,()=>console.log(`running on port ${port}`)
);