![POLITICO](https://rawgithub.com/The-Politico/src/master/images/logo/badge.png)

# politico-hotshot

Takes screenshots of DOM elements. Lifted entirely from [innoq/hotshot](https://github.com/innoq/hotshot) with very small changes.

Check out their [blog post](https://www.innoq.com/en/blog/screenshot-dom-elements-puppeteer/) for more info.

## Usage

```
$ curl -G "https://politico-hotshot.herokuapp.com/shoot?path=/relative/path/to/page/&selector=.a-css-class" > screenshot.png

```


#### Removing elements on the page from screenshot

If you have an element on your page that is occluding your perfect screenshot, you can add one of two classes and hotshot will hide or remove it from the page before taking the screenshot.

The following classes will receive the corresponding CSS style values before hotshot takes a screenshot:

- `.screenshot-hide` --> `visibility: hidden;`
- `.screenshot-remove` --> `display: none;`

## Deploy

```
$ make deploy
```
