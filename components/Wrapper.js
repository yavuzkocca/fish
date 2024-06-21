import { useContext, useRef } from 'react';
import { DataContext } from "../components/DataContext";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

export function sketch(p5, userData1, setData, dataSetRef) {
    const userData = userData1
    console.log("sdt" + JSON.stringify(userData))
    let tokenData = { "hash": `${userData.userData?.walletAddress}${userData.userData.timestamp}${userData.userData.tokenId}` }
    console.log(`TokenHASH ${tokenData.hash}`)
    //let tokenData = { "hash": "0xb871cd70edae9a70815520d7e7ea2d65ded3912b02d3f6e283e5f5fad167b313" }
    class Random {
        constructor(seed) {
            this.seed = seed
        }

        random_dec() {
            this.seed ^= this.seed << 13
            this.seed ^= this.seed >> 17
            this.seed ^= this.seed << 5
            return ((this.seed < 0 ? ~this.seed + 1 : this.seed) % 1000) / 1000
        }

        random_between(a, b) {
            return a + (b - a) * this.random_dec()
        }

        randomInt(a, b) {
            return Math.floor(this.random_between(a, b + 1))
        }

        random_choice(x) {
            return x[Math.floor(this.random_between(0, x.length * 0.99))]
        }
    }

    //let tokenData = { "hash": "0xb871cd70edae9a70815520d7e7ea2d65ded3912b02d3f6e283e5f5fad167b313" }
    let seed = parseInt(tokenData.hash.slice(0, 16), 16);
    let rng = new Random(seed);


    let paletteColor;
    let palettePicked;
    let backgroundColor;
    let color1;
    let color2;
    let palletteColorSelectOnlyOne;
    let paletteName;
    let rarityMap1;
    let rarityMap2;
    let rarityCapi;
    let rarityPuskul;
    let mintSize;
    let jargonTrait;
    let timeStamp;
    let otherdata = {};
    let name

    const artworkWidth = 700;
    const artworkHeight = 700;

    p5.setup = () => {
        p5.createCanvas(artworkWidth, artworkHeight);
        p5.noLoop();
        p5.frameRate(60);
        p5.pixelDensity(1);
        // scaleCanvasToFit();
        p5.resizeCanvas(artworkWidth, artworkHeight); // Canvas'ı pencere boyutuna göre yeniden boyutlandır

        color1 = p5.color(1, 22, 39);
        color2 = p5.color(1, 22, 39);

        backgroundColor = color1
        paletteColor = rng.randomInt(0, 4);
        console.log("clr" + paletteColor)

        switch (paletteColor) {
            case 0:
                palettePicked = [
                    p5.color(1, 22, 39),
                    p5.color(253, 255, 252),
                    p5.color(46, 196, 182),
                    p5.color(231, 29, 54),
                    p5.color(255, 159, 28)
                ];
                paletteName = "Bright Sky";
                break;
            case 1:
                palettePicked = [
                    p5.color(255, 190, 11),
                    p5.color(251, 86, 7),
                    p5.color(255, 0, 110),
                    p5.color(131, 56, 236),
                    p5.color(58, 134, 255)
                ];
                paletteName = "Good Vibes Only";
                break;
            case 2:
                palettePicked = [
                    p5.color(218, 215, 205),
                    p5.color(163, 177, 138),
                    p5.color(88, 129, 87),
                    p5.color(58, 90, 64),
                    p5.color(52, 78, 65)
                ];
                paletteName = "Save the Green";
                break;
            case 3:
                palettePicked = [
                    p5.color(247, 37, 133),
                    p5.color(181, 23, 158),
                    p5.color(114, 9, 183),
                    p5.color(72, 12, 168),
                    p5.color(67, 97, 238)
                ];
                paletteName = "Blue Spell";
                break;
            case 4:
                palettePicked = [
                    p5.color(3, 4, 94),
                    p5.color(0, 119, 182),
                    p5.color(0, 180, 216),
                    p5.color(144, 224, 239),
                    p5.color(202, 240, 248)
                ];
                paletteName = "Blue Spell";
                break;
            default:
                palettePicked = [
                    p5.color(1, 22, 39),
                    p5.color(253, 255, 252),
                    p5.color(46, 196, 182),
                    p5.color(231, 29, 54),
                    p5.color(255, 159, 28)
                ];
                paletteName = "Bright Sky";
                break;
        }
    };

    // p5.windowResized = () => {
    //     p5.resizeCanvas(window.innerWidth, window.innerHeight); // Canvas'ı yeni pencere boyutuna göre yeniden boyutlandır
    // }

    p5.draw = () => {
        p5.background(backgroundColor);
        p5.translate(p5.width / 2, p5.height / 2);
        rarityMap1 = rng.randomInt(1, 101);
        rarityMap2 = rng.randomInt(1, 101);
        mintSize = rng.randomInt(1, 10);
        console.log(mintSize);

        for (let i = 0; i < 10; i++) {
            let x1 = p5.cos(i * p5.TWO_PI / 10) * 200;
            let y1 = p5.sin(i * p5.TWO_PI / 10) * 200;
            let x2 = p5.cos((i + 1) * p5.TWO_PI / 10) * 200;
            let y2 = p5.sin((i + 1) * p5.TWO_PI / 10) * 200;

            let palletteColorSelectOnlyOneC1 = rng.randomInt(0, 4);
            let palletteColorSelectOnlyOneC2 = rng.randomInt(0, 4);

            let c1 = palettePicked[palletteColorSelectOnlyOneC1];
            let c2 = palettePicked[palletteColorSelectOnlyOneC2];

            for (let j = 0; j < 100; j++) {
                let t = p5.map(j, 0, 99, 0, 1);
                let x = p5.lerp(x1, x2, t);
                let y = p5.lerp(y1, y2, t);

                let n;
                if (rarityMap1 > 0 && rarityMap1 < 45) {
                    n = p5.noise(x * 0.005, y * 0.005);
                    rarityPuskul = 0.005;
                } else if (rarityMap1 >= 45 && rarityMap1 < 80) {
                    n = p5.noise(x * 0.025, y * 0.005);
                    rarityPuskul = 0.025;
                } else if (rarityMap1 >= 80 && rarityMap1 < 102) {
                    n = p5.noise(x * 0.015, y * 0.005);
                    rarityPuskul = 0.015;
                }

                let angle = p5.map(n, 0, 1, 0, p5.TWO_PI);
                let len;
                if (rarityMap2 > 0 && rarityMap2 < 25) {
                    len = p5.map(p5.sin(angle * 5), -1, 1, 10, 40);
                    rarityCapi = 40;
                } else if (rarityMap2 >= 25 && rarityMap2 < 60) {
                    len = p5.map(p5.sin(angle * 5), -1, 1, 10, 60);
                    rarityCapi = 60;
                } else if (rarityMap2 >= 60 && rarityMap2 < 102) {
                    len = p5.map(p5.sin(angle * 5), -1, 1, 10, 100);
                    rarityCapi = 100;
                }

                let x3 = x + p5.cos(angle) * len;
                let y3 = y + p5.sin(angle) * len;

                let col = p5.lerpColor(c1, c2, t);
                p5.stroke(col);
                p5.line(x, y, x3, y3);
            }
        }

        for (let i = 0; i < 10; i++) {
            let x = p5.cos(i * p5.TWO_PI / 10) * 100;
            let y = p5.sin(i * p5.TWO_PI / 10) * 100;

            for (let j = 0; j < 50; j++) {
                let angle = p5.map(p5.noise(x * 0.005, y * 0.005), 0, 1, 0, p5.TWO_PI);
                let radius;

                if (mintSize == 1) {
                    radius = p5.map(p5.sin(angle * 5), -1, 1, 10, 50);
                    jargonTrait = "FUD";
                } else if (mintSize == 2) {
                    radius = p5.map(p5.sin(angle * 5), -1, 1, 1, 5);
                    jargonTrait = "NGMI";
                } else if (mintSize == 3) {
                    radius = p5.map(p5.sin(angle * 5), -1, 1, 1, 50);
                    jargonTrait = "FOMO";
                } else if (mintSize >= 4 && mintSize < 6) {
                    radius = p5.map(p5.sin(angle * 5), -1, 1, 1, 30);
                    jargonTrait = "DEGEN";
                } else if (mintSize >= 6 && mintSize < 8) {
                    radius = p5.map(p5.sin(angle * 5), 1, 10, 10, 50);
                    jargonTrait = "OG";
                } else if (mintSize >= 8 && mintSize < 10) {
                    radius = p5.map(p5.sin(angle * 5), -1, 1, 10, 5);
                    jargonTrait = "HODL";
                } else if (mintSize >= 10) {
                    radius = p5.map(p5.sin(angle * 5), -10, 10, 10, 5);
                    jargonTrait = "WHALE";
                }

                let palletteColorSelectOnlyOne = rng.randomInt(0, 4);
                let col = palettePicked[palletteColorSelectOnlyOne];
                p5.noStroke();
                p5.push();
                p5.translate(x, y);
                p5.fill(col);
                p5.ellipse(0, 0, radius / 2, radius / 2);
                p5.pop();

                if (sonIkiHane(userData.userData?.timestamp) >= 0 && sonIkiHane(userData.userData.timestamp) < 25) {
                    x += p5.cos(angle) * radius * 1;
                    y += p5.sin(angle) * radius * 1;
                    timeStamp = "Morning";
                } else if (sonIkiHane(userData.userData?.timestamp) >= 25 && sonIkiHane(userData.userData.timestamp) < 60) {
                    x += p5.cos(angle) * radius * 2;
                    y += p5.sin(angle) * radius * 2;
                    timeStamp = "Noon";
                } else if (sonIkiHane(userData.userData?.timestamp) >= 60 && sonIkiHane(userData.userData.timestamp) < 100) {
                    x += p5.cos(angle) * radius * 3;
                    y += p5.sin(angle) * radius * 3;
                    timeStamp = "Evening";
                }
            }
        }



        let traits = {
            "Background Color": backgroundColor,
            "Palette": paletteName,
            "Capi": rarityCapi,
            "Puskulu": rarityPuskul,
            "Jargon": jargonTrait,
            "Time": timeStamp,
        };
        console.log(JSON.stringify(traits));



        name = `Fish #${userData.userData?.tokenId}`;


        let description =
            `This is Fish. It has ${backgroundColor} as background color. The timestamp of the mint was ${userData.userData?.timestamp}. The minting wallet address was ${userData.userData?.walletAddress}`
            ;
        console.log(description)

        otherdata = {
            "name": name,
            "description": description,
            "attributes": traits
        }

        if (!dataSetRef.current) {
            setData(otherdata);
            dataSetRef.current = true;
        }
        console.log(otherdata)

    };

    function sonIkiHane(number) {
        return number % 100;
    }

    // function scaleCanvasToFit() {
    //     const artworkAspectRatio = artworkHeight / artworkWidth;
    //     const canvasElement = document.querySelector('#defaultCanvas0');

    //     const innerWidth = window.innerWidth;
    //     const innerHeight = window.innerHeight;

    //     if (innerHeight <= innerWidth * artworkAspectRatio) {
    //         canvasElement.style.height = '100%';
    //         canvasElement.style.width = 'auto';
    //     } else {
    //         canvasElement.style.width = '100%';
    //         canvasElement.style.height = 'auto';
    //     }
    // }
}

export default function Wrapper(userData) {
    const userData1 = userData
    const { setData } = useContext(DataContext);
    const dataSetRef = useRef(false);


    if (!userData || !userData.userData) {
        return (
            <div className="container mx-auto px-4 flex items-center justify-center">

            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 flex items-center justify-center" style={{ display: 'none' }}>
            <NextReactP5Wrapper sketch={(p5) => sketch(p5, userData1, setData, dataSetRef)} />
        </div>
    );
}