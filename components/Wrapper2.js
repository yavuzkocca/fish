import { useState } from 'react';
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import hl from "../constants/hl-gen"

export default function Wrapper2() {
    const [reloadKey, setReloadKey] = useState(0); // State tanımı
    const [showReload, setShowReload] = useState(false);

    const sketch = (p5, userData1) => {
        const high = hl(userData1)
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


        const artworkWidth = 700;
        const artworkHeight = 700;

        p5.setup = () => {

            p5.createCanvas(artworkWidth, artworkHeight);
            p5.noLoop();
            p5.frameRate(60);
            p5.pixelDensity(1);
            //scaleCanvasToFit();
            p5.resizeCanvas(artworkWidth, artworkHeight);

            color1 = p5.color(1, 22, 39);
            color2 = p5.color(1, 22, 39);

            backgroundColor = high.randomElement([color1, color2]);
            paletteColor = high.randomInt(5);

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
            let showReload = false;
            p5.background(backgroundColor);
            if (showReload) {
                p5.textSize(32);
                p5.text("Reload", p5.width / 2 - 50, p5.height / 2);
            } else {

                p5.translate(p5.width / 2, p5.height / 2);
                rarityMap1 = high.randomInt(1, 101);
                rarityMap2 = high.randomInt(1, 101);
                mintSize = high.randomInt(1, 10);
                console.log(mintSize);



                for (let i = 0; i < 10; i++) {
                    let x1 = p5.cos(i * p5.TWO_PI / 10) * 200;
                    let y1 = p5.sin(i * p5.TWO_PI / 10) * 200;
                    let x2 = p5.cos((i + 1) * p5.TWO_PI / 10) * 200;
                    let y2 = p5.sin((i + 1) * p5.TWO_PI / 10) * 200;

                    let palletteColorSelectOnlyOneC1 = high.randomInt(4);
                    let palletteColorSelectOnlyOneC2 = high.randomInt(4);

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

                        let palletteColorSelectOnlyOne = high.randomInt(4);
                        let col = palettePicked[palletteColorSelectOnlyOne];
                        p5.noStroke();
                        p5.push();
                        p5.translate(x, y);
                        p5.fill(col);
                        p5.ellipse(0, 0, radius / 2, radius / 2);
                        p5.pop();

                        if (sonIkiHane(high.tx.timestamp) >= 0 && sonIkiHane(high.tx.timestamp) < 25) {
                            x += p5.cos(angle) * radius * 1;
                            y += p5.sin(angle) * radius * 1;
                            timeStamp = "Morning";
                        } else if (sonIkiHane(high.tx.timestamp) >= 25 && sonIkiHane(high.tx.timestamp) < 60) {
                            x += p5.cos(angle) * radius * 2;
                            y += p5.sin(angle) * radius * 2;
                            timeStamp = "Noon";
                        } else if (sonIkiHane(high.tx.timestamp) >= 60 && sonIkiHane(high.tx.timestamp) < 100) {
                            x += p5.cos(angle) * radius * 3;
                            y += p5.sin(angle) * radius * 3;
                            timeStamp = "Evening";
                        }
                    }
                }

            }



            high.token.capturePreview();

            let traits = {
                "Background Color": backgroundColor,
                "Palette": paletteName,
                "Capi": rarityCapi,
                "Puskulu": rarityPuskul,
                "Jargon": jargonTrait,
                "Time": timeStamp,
            };
            console.log(JSON.stringify(traits));

            high.token.setTraits(traits);

            high.token.setName(`Fish #${high.tx.tokenId}`);
            high.token.setDescription(
                `This is Fish. It has ${backgroundColor} as background color. The timestamp of the mint was ${high.tx.timestamp}. The minting wallet address was ${high.tx.walletAddress}`
            );
        };

        p5.mouseMoved = () => {
            if (p5.mouseX > 0 && p5.mouseX < p5.width && p5.mouseY > 0 && p5.mouseY < p5.height) {
                setShowReload(true);

            } else {
                setShowReload(false);
            }
        };

        // p5.mousePressed = () => {
        //     if (showReload) {
        //         p5.setup(); // Reset the canvas
        //         setShowReload(false);
        //     }
        // };

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

    return (
        // style={{ display: 'none' }}
        <div className="px-5 flex justify-items-start" >
            <div className="items-center justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {/* <button
                onClick={reloadSketch}
                className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80 mb-4"
            >
                <svg
                    className="w-5 h-5 mx-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                    />
                </svg>
                <span className="mx-1">Refresh</span>
            </button> */}
                <NextReactP5Wrapper key={reloadKey} sketch={(p5) => sketch(p5)} />
            </div>
        </div>

    )
}