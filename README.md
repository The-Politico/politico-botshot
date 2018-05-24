![POLITICO](https://rawgithub.com/The-Politico/src/master/images/logo/badge.png)

# politico-hotshot

Takes screenshots of DOM elements. Lifted entirely from [innoq/hotshot](https://github.com/innoq/hotshot) with very small changes.

Check out their [blog post](https://www.innoq.com/en/blog/screenshot-dom-elements-puppeteer/) for more info.

## Usage

Build image:

    $ docker build -t politico/hotshot .

Start server:

    $ docker run -p 5000:5000 -e PORT=5000 -e TARGET_HOST='https://www.politico.com' politico/hotshot

Request a screenshot:

    $ curl -G "http://localhost:5000/shoot?path=/relative/path&selector=.my-css-class" > screenshot.png


#### Removing elements on the page from screenshot

If you have an element on your page that is occluding your perfect screenshot, you can add one of two classes and hotshot will hide or remove it from the page before taking the screenshot.

The following classes will receive the corresponding CSS style values before hotshot takes a screenshot:

- `.screenshot-hide` --> `visibility: hidden;`
- `.screenshot-remove` --> `display: none;`
