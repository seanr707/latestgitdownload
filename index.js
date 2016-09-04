const express = require('express');
const get = require('simple-get');
const app = express();

app.set('port', (process.env.PORT || 5000));

// Root path for users who are looking into project
app.get('/', (req, res) => {
  res.send(
    '<p><b>Hello!</b></p>' +
    '<p>Thank you for using my microservice!' +
    '<p></p>' +
    '<p>To use the site use the /downloadLatest path</p>' +
    '<p>Add the queries <em>file</em> and <em>url</em></p>' +
    '<p><em>url</em> should be the exact url to your latest releases page.</p>' +
    '<p><em>file</em> should be the file name. If the release # is in the file name, then add RELEASE in place.</p>'
  );
});

// API to get latest file; use 'url' for latest github url and 'file' for the file name
app.get('/downloadLatest', (req, res) => {
  if (!req.query.url || !req.query.file) {
    res.send('Error: URL or File name not provided.');
  } else {
    let url;
    let version;
    let file;

    get(req.query.url, (err, urlInfo) => {
      if (err) throw err;

      // Create url to download path
      url = 'https://github.com' + urlInfo.socket.parser.outgoing.path
        .replace('tag', 'download');

      // Find the version number
      version = url.match(/\d.\d.\d/gi);

      // Add the version number to the file input
      file = req.query.file.replace('VERSION', version);

      console.log('Redirecting to ' + url + '/' + file);

      // Redirect the user out
      res.redirect(url + '/' + file);
    });
  }
});

// HTTP port
const port = 80;

app.listen(app.get('port'), () => {
  console.log('Listening on port = ' + port);
});
