# DSNView
This is a little project I'm working on that includes a library and a frontend
for accessing and viewing live data from NASA's Deep Space Network.

This is current a work-in-progress. I'm using this project to help hone my
development skills in general, but particularly with nodejs.

Feel free to download, use, and contribute to this codebase, but as usual, a
standard disclaimer: If this breaks your code or computer, I take no
responsibility.

## Installation
You will need the following applications and libraries installed to use this:
  * [nodejs](https://nodejs.org)
  * [xml2js (npm)](https://www.npmjs.com/package/xml2js)
  * [q (npm)](npm install node-q)
  * [node.extend (npm)](https://www.npmjs.com/package/node.extend)
  * [blessed (npm)](https://www.npmjs.com/package/bless)

  If the npm installer throws errors, you might have to review [this issue](https://github.com/npm/npm/issues/10434).

Ideally, you should be able to simply clone this project, enter it's directory,
and run the following command:

    $ npm install

## Usage
You can run the CLI UI with the following from within the project root:

    $ node main.js

The API I'm working on for fetching DSN data is still in a state of flux, so it
is not documented very well.

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :-)

## Credits
  * mepholic - project maintainer

## License
GPLv2
