const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');
connectDB();

app.get('/', (req, res) => res.send({ msg: 'Welcome to the Contactkeeper api' }));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}
// const PORT = process.env.port || 8800;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}..`))
var server_port = process.env.YOUR_PORT || process.env.PORT || 7500;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function () {
    console.log('Listening on port %d', server_port);
});