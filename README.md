![POLITICO](https://rawgithub.com/The-Politico/src/master/images/logo/badge.png)

# politico-botshot

Takes screenshots of DOM elements on your pages. Lifted almost entirely from [innoq/hotshot](https://github.com/innoq/hotshot) with very small changes to the script and a new frontend.

Check out their [blog post](https://www.innoq.com/en/blog/screenshot-dom-elements-puppeteer/) for more info.


## Usage

```
$ curl -G "https://politico-hotshot.herokuapp.com/shoot?path=/relative/path/to/page/&selector=.a-css-class" > screenshot.png

```

Use the API tool at  [https://politico-botshot.herokuapp.com/](https://politico-botshot.herokuapp.com/).

#### Removing elements on the page from screenshot

If you have an element on your page that is occluding your perfect screenshot, you can add one of two classes and hotshot will hide or remove it from the page before taking the screenshot.

The following classes will receive the corresponding CSS style values before hotshot takes a screenshot:

- `.screenshot-hide` --> `visibility: hidden;`
- `.screenshot-remove` --> `display: none;`

## Develop

#### Frontend assets

```
$ npm start
```

... and to build ...

```
$ npm run-script build
```

#### Run locally

Build image:

```
$ docker build -t botshot .
```

Start server:

```
$ docker run -p 5000:5000 -e PORT=5000 -e TARGET_HOST='https://www.politico.com' botshot
```

## Deploy

```
$ make deploy
```
