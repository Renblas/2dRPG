/* Main Variables */

// Initial Setup
function setup() {
  createCanvas(windowWidth - 10, windowHeight - 10);

  textAlign(CENTER);
}

// Draw Loop
function draw() {
  background(200);
  text("helloWorld", 0, 0);
}

/* Load Game */

// Load Assets Array
const LOAD_ASSET_ARRAY = [
  //"scripts/library/p5.sound.min.js",
];

let loadAssetIndex = 0;
let loadingBool = false;
let loadedBool = false;

let loadingImgArray = [];

// Loading Menu
function LoadingMenu() {
  background(155);
  textAlign(CENTER, CENTER);
  textSize(64 * textConst);

  // if finished loading current asset load next one
  if (loadingBool === false) {
    LoadAssets(LOAD_ASSET_ARRAY[loadAssetIndex]);
  }

  // if finished all assets, end loading stage
  if (loadAssetIndex >= LOAD_ASSET_ARRAY.length - 1) {
    loadedBool = true;
    gameState = "mainMenu";
    return;
  }

  // text on screen
  text(
    "Loading...  " + (loadAssetIndex + 1) + "/" + LOAD_ASSET_ARRAY.length,
    width * 0.5,
    height * 0.5
  );
  text(LOAD_ASSET_ARRAY[loadAssetIndex], width * 0.5, height * 0.6);
}

// Load Assets Function
function LoadAssets(assetArray) {
  // say that you are currently loading something
  loadingBool = true;

  // split path into necessary components
  let assetPath = assetArray[1];

  let assetNameArray = split(assetArray[0], ".");
  let assetName = assetNameArray[0];
  let assetExt = assetNameArray[1];

  for (let i = 0; i < assetArray.length; i++) {
    const element = assetArray[i];
    // detect file type
    if (assetExt === "js") {
      let script = document.createElement("script");
      script.addEventListener("load", (event) => {
        loadAssetIndex += 1;
        loadingBool = false;
      });
      script.src = assetString;
      document.body.appendChild(script);
    } else if (assetExt === "png") {
      loadingImgArray[0] = assetName;
      // print(assetString)
      loadImage(assetPath, (img) => {
        loadingImgArray[1] = img;
        ImageArray.push(loadingImgArray);
        loadingImgArray = [];

        loadAssetIndex += 1;
        loadingBool = false;
        //print(ImageArray)
      });
    } else {
      print("ERROR: Wrong File Type");
    }
  }
}
