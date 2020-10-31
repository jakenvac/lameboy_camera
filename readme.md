# LAME BOY camera

A Game Boy Camera clone in the web.

Built with Typescript, React & Parcel.

## Running locally

This was built using the yarn package manager, but npm will probably work fine.

Install the deps:

```shell
$ yarn install
```

Run locally:

```shell
$ yarn dev
```

Parcel will serve the site at `localhost:1234`

Build for production:

```shell
$ yarn build
```

Parcel will output the build in `./dist/`

Deploy to github pages:

```shell
$ yarn deploy
```

gh-pages cli tool will deploy eveything in the `./dist` folder to the configured github pages branch.

## TODO

- Full refactor. The site is in a bad state due to starting out as a proof of concept and me being lazy. 🙄
- Implement full test suite with the goal of all future development being TDD.
- Overhaul UI to make settings UX more appropriate.
- More frames.
- More palettes.
- Options for scaled image downloads.
- Camera reel for reviewing past photos, changing frames and palettes after the fact.
- Convert to PWA.
- ???
- Profit...

## Credits

- [AntionoND and his work on giibii advance](https://github.com/AntonioND/giibiiadvance) - The camera reverse engineering work he did helped me out with getting the dithering working properly.
- [James Ide](https://github.com/ide) - Massive assistance ironing out some camera bugs that I was unable to replicate
- [crizzlycruz aka @23kpixels](https://www.instagram.com/23kpixels/?hl=en) - Helping out with various iOS bug reporting/fixing as I don't have an iOS device
- [GAME BOY discord](https://discord.gg/7fWs8jgrMd)
- [GAME BOY Camera discord](https://discord.gg/5BhpTrJSG2)
- [lospec](https://discord.gg/5BhpTrJSG2) for various palettes. (find links in the palettes.json)
- If I've missed anyone I'm really sorry 😭
