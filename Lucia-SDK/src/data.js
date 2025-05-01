import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";

export async function udata() {
  var pluginsLength;
  var plugins;
  var pluginNames;

  try {
    pluginsLength = navigator.plugins.length;
    plugins = navigator.plugins;
    pluginNames = [];
    for (let i = 0; i < pluginsLength; i++) {
      pluginNames[i] = plugins[i].name;
    }
  } catch (e) {
    console.log(e.message);
  }

  // not yet working

  // const { ApplePaySession, matchMedia } = window
  // var applePay;
  // if (typeof ApplePaySession?.canMakePayments !== 'function') {
  //     applePay = false
  // }

  // try {
  //    ApplePaySession.canMakePayments() ? applePay = true : applePay = false
  // } catch (error) {
  //    console.log(error.message)
  // }
  var colorDepth;
  try {
    colorDepth = window.screen.colorDepth;
  } catch (e) {
    console.log(e.message);
  }

  // function doesMatch(value) {
  //     return matchMedia(`(prefers-contrast: ${value})`).matches
  // }
  //  var contrast;
  // try{
  //     if (doesMatch('no-preference')) {
  //         contrast = 'None';
  //       }
  //       if (doesMatch('high') || doesMatch('more')) {
  //         contrast = 'More';
  //       }
  //       if (doesMatch('low') || doesMatch('less')) {
  //         contrast = 'Less';
  //       }
  //       if (doesMatch('forced')) {
  //         contrast = 'ForcedColors';
  //       }
  // }catch(e){
  //     console.log(e.message)
  // }

  // var gamut;
  // for (const g of ['rec2020', 'p3', 'srgb']) {
  //     if (matchMedia(`(color-gamut: ${g})`).matches) {
  //         gamut = g
  //     }
  //   }

  var indexedDB;
  try {
    indexedDB = window.indexedDB;
  } catch (e) {
    console.log(e.message);
  }

  var localStorage;
  var openDB;

  try {
    localStorage = window.localStorage;
    openDB = window.openDatabase;
  } catch (e) {
    console.log(e.message);
  }
  // var sourceId;

  // //private click measurement

  // try{
  //     const link = document.createElement('a')
  //     sourceId = link.attributionSourceId ?? link.attributionsourceid
  // }catch(e){
  //     console.log(e.message)
  // }

  var loc;
  try {
    loc = document.referrer;
  } catch (e) {
    console.log(e.message);
  }
  var cook;
  try {
    if (!document.cookie) {
      document.cookie = "name=oeschger" + ";max-age=" + 60 * 1000;
    }
    cook = document.cookie;
  } catch (e) {
    console.log(e.message);
  }

  var srch;
  try {
    srch = window.location.search;
    if (srch && srch.length > 0) {
      srch = srch.replace(/.*?=/, "");
    }
  } catch (e) {
    console.log(e.message);
  }

  var mem;
  try {
    mem = navigator.deviceMemory;
  } catch (e) {
    console.log(e.message);
  }
  var agnt;
  try {
    agnt = navigator.userAgent;
  } catch (e) {
    console.log(e.message);
  }
  var cores;
  try {
    cores = navigator.hardwareConcurrency;
  } catch (e) {
    console.log(e.message);
  }
  var lang;
  try {
    lang = navigator.language;
  } catch (e) {
    console.log(e.message);
  }
  var scale;
  try {
    scale = window.devicePixelRatio;
  } catch (e) {
    console.log(e.message);
  }

  var encoding;
  try {
    encoding = TextDecoder.encoding;
  } catch (e) {
    console.log(e.message);
  }

  var timeZone;
  var date = new Date();
  try {
    timeZone = -date.getTimezoneOffset() / 60;
  } catch (e) {
    console.log(e.message);
  }

  var screenWidth;
  try {
    screenWidth = window.screen.width;
  } catch (e) {
    console.log(e.message);
  }
  var screenheight;
  try {
    screenheight = window.screen.height;
  } catch (e) {
    console.log(e.message);
  }

  var navPer;
  try {
    navPer = navigator.permissions.webglVersion;
  } catch (e) {
    console.log(e.message);
  }

  var renderedPer;
  try {
    renderedPer = navigator.permissions.RENDERER;
  } catch (e) {
    console.log(e.message);
  }

  var cpuClass;
  try {
    cpuClass = navigator.cpuClass;
  } catch (e) {
    console.log(e.message);
  }

  var geoPer;
  try {
    geoPer = navigator.permissions.geolocation;
  } catch (e) {
    console.log(e.message);
  }

  var availHeight;

  try {
    availHeight = window.screen.availHeight;
  } catch (e) {
    console.log(e.message);
  }

  var availWidth;
  try {
    availWidth = window.screen.availWidth;
  } catch (e) {
    console.log(e.message);
  }

  var screenOrientationType;
  try {
    screenOrientationType = window.screen.orientation.type;
  } catch (e) {
    console.log(e.message);
  }

  var screenOrientationAngle;
  try {
    screenOrientationAngle = window.screen.orientation.angle;
  } catch (e) {
    console.log(e.message);
  }

  var src;
  var hVal;
  // canvas
  try {
    const canvas = document.createElement("canvas");
    canvas.id = "canvasLucia";
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(255,0,255)";
    ctx.beginPath();
    ctx.rect(20, 20, 150, 100);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "rgb(0,255,255)";
    ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    var txt = "abz190#$%^@£éú";
    ctx.textBaseline = "top";
    ctx.font = '17px "Arial 17"';
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "rgb(255,5,5)";
    ctx.rotate(0.03);
    ctx.fillText(txt, 4, 17);
    ctx.fillStyle = "rgb(155,255,5)";
    ctx.shadowBlur = 8;
    ctx.shadowColor = "red";
    ctx.fillRect(20, 12, 100, 5);
    src = canvas.toDataURL();
    hVal = CryptoJS.SHA256(src).toString(CryptoJS.enc.Hex);
    //hVal = sha256(src);
    // await hash(src)
    //   .then((result) => {
    //     hVal = result;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  } catch (e) {
    console.log(e.message);
  }

  //to check if device is touch enabled
  function fingerprint_touch() {
    "use strict";
    var bolTouchEnabled, bolOut;

    bolTouchEnabled = false;
    bolOut = null;

    try {
      if (document.createEvent("TouchEvent")) {
        bolTouchEnabled = true;
      }
      bolOut = bolTouchEnabled;
      return bolOut;
    } catch (ignore) {
      bolOut = bolTouchEnabled;
      return bolOut;
    }
  }

  //to get the OS details
  function fingerprint_os() {
    "use strict";
    var strSep, strOnError, strUserAgent, strPlatform, strOS, strOSBits, strOut;

    strSep = "|";
    strOnError = "Error";
    strUserAgent = null;
    strPlatform = null;
    strOS = null;
    strOSBits = null;
    strOut = null;

    try {
      /* navigator.userAgent is supported by all major browsers */
      strUserAgent = navigator.userAgent.toLowerCase();
      /* navigator.platform is supported by all major browsers */
      strPlatform = navigator.platform.toLowerCase();
      if (strUserAgent.indexOf("windows nt 6.3") !== -1) {
        strOS = "Windows 8.1";
      } else if (strUserAgent.indexOf("windows nt 6.2") !== -1) {
        strOS = "Windows 8";
      } else if (strUserAgent.indexOf("windows nt 6.1") !== -1) {
        strOS = "Windows 7";
      } else if (strUserAgent.indexOf("windows nt 6.0") !== -1) {
        strOS = "Windows Vista/Windows Server 2008";
      } else if (strUserAgent.indexOf("windows nt 5.2") !== -1) {
        strOS = "Windows XP x64/Windows Server 2003";
      } else if (strUserAgent.indexOf("windows nt 5.1") !== -1) {
        strOS = "Windows XP";
      } else if (strUserAgent.indexOf("windows nt 5.01") !== -1) {
        strOS = "Windows 2000, Service Pack 1 (SP1)";
      } else if (strUserAgent.indexOf("windows xp") !== -1) {
        strOS = "Windows XP";
      } else if (strUserAgent.indexOf("windows 2000") !== -1) {
        strOS = "Windows 2000";
      } else if (strUserAgent.indexOf("windows nt 5.0") !== -1) {
        strOS = "Windows 2000";
      } else if (strUserAgent.indexOf("windows nt 4.0") !== -1) {
        strOS = "Windows NT 4.0";
      } else if (strUserAgent.indexOf("windows nt") !== -1) {
        strOS = "Windows NT 4.0";
      } else if (strUserAgent.indexOf("winnt4.0") !== -1) {
        strOS = "Windows NT 4.0";
      } else if (strUserAgent.indexOf("winnt") !== -1) {
        strOS = "Windows NT 4.0";
      } else if (strUserAgent.indexOf("windows me") !== -1) {
        strOS = "Windows ME";
      } else if (strUserAgent.indexOf("win 9x 4.90") !== -1) {
        strOS = "Windows ME";
      } else if (strUserAgent.indexOf("windows 98") !== -1) {
        strOS = "Windows 98";
      } else if (strUserAgent.indexOf("win98") !== -1) {
        strOS = "Windows 98";
      } else if (strUserAgent.indexOf("windows 95") !== -1) {
        strOS = "Windows 95";
      } else if (strUserAgent.indexOf("windows_95") !== -1) {
        strOS = "Windows 95";
      } else if (strUserAgent.indexOf("win95") !== -1) {
        strOS = "Windows 95";
      } else if (strUserAgent.indexOf("ce") !== -1) {
        strOS = "Windows CE";
      } else if (strUserAgent.indexOf("win16") !== -1) {
        strOS = "Windows 3.11";
      } else if (strUserAgent.indexOf("iemobile") !== -1) {
        strOS = "Windows Mobile";
      } else if (strUserAgent.indexOf("wm5 pie") !== -1) {
        strOS = "Windows Mobile";
      } else if (strUserAgent.indexOf("windows") !== -1) {
        strOS = "Windows (Unknown Version)";
      } else if (strUserAgent.indexOf("openbsd") !== -1) {
        strOS = "Open BSD";
      } else if (strUserAgent.indexOf("sunos") !== -1) {
        strOS = "Sun OS";
      } else if (strUserAgent.indexOf("ubuntu") !== -1) {
        strOS = "Ubuntu";
      } else if (strUserAgent.indexOf("ipad") !== -1) {
        strOS = "iOS (iPad)";
      } else if (strUserAgent.indexOf("ipod") !== -1) {
        strOS = "iOS (iTouch)";
      } else if (strUserAgent.indexOf("iphone") !== -1) {
        strOS = "iOS (iPhone)";
      } else if (strUserAgent.indexOf("mac os x beta") !== -1) {
        strOS = "Mac OSX Beta (Kodiak)";
      } else if (strUserAgent.indexOf("mac os x 10.0") !== -1) {
        strOS = "Mac OSX Cheetah";
      } else if (strUserAgent.indexOf("mac os x 10.1") !== -1) {
        strOS = "Mac OSX Puma";
      } else if (strUserAgent.indexOf("mac os x 10.2") !== -1) {
        strOS = "Mac OSX Jaguar";
      } else if (strUserAgent.indexOf("mac os x 10.3") !== -1) {
        strOS = "Mac OSX Panther";
      } else if (strUserAgent.indexOf("mac os x 10.4") !== -1) {
        strOS = "Mac OSX Tiger";
      } else if (strUserAgent.indexOf("mac os x 10.5") !== -1) {
        strOS = "Mac OSX Leopard";
      } else if (strUserAgent.indexOf("mac os x 10.6") !== -1) {
        strOS = "Mac OSX Snow Leopard";
      } else if (strUserAgent.indexOf("mac os x 10.7") !== -1) {
        strOS = "Mac OSX Lion";
      } else if (strUserAgent.indexOf("mac os x") !== -1) {
        strOS = "Mac OSX (Version Unknown)";
      } else if (strUserAgent.indexOf("mac_68000") !== -1) {
        strOS = "Mac OS Classic (68000)";
      } else if (strUserAgent.indexOf("68K") !== -1) {
        strOS = "Mac OS Classic (68000)";
      } else if (strUserAgent.indexOf("mac_powerpc") !== -1) {
        strOS = "Mac OS Classic (PowerPC)";
      } else if (strUserAgent.indexOf("ppc mac") !== -1) {
        strOS = "Mac OS Classic (PowerPC)";
      } else if (strUserAgent.indexOf("macintosh") !== -1) {
        strOS = "Mac OS Classic";
      } else if (strUserAgent.indexOf("googletv") !== -1) {
        strOS = "Android (GoogleTV)";
      } else if (strUserAgent.indexOf("xoom") !== -1) {
        strOS = "Android (Xoom)";
      } else if (strUserAgent.indexOf("htc_flyer") !== -1) {
        strOS = "Android (HTC Flyer)";
      } else if (strUserAgent.indexOf("android") !== -1) {
        strOS = "Android";
      } else if (strUserAgent.indexOf("symbian") !== -1) {
        strOS = "Symbian";
      } else if (strUserAgent.indexOf("series60") !== -1) {
        strOS = "Symbian (Series 60)";
      } else if (strUserAgent.indexOf("series70") !== -1) {
        strOS = "Symbian (Series 70)";
      } else if (strUserAgent.indexOf("series80") !== -1) {
        strOS = "Symbian (Series 80)";
      } else if (strUserAgent.indexOf("series90") !== -1) {
        strOS = "Symbian (Series 90)";
      } else if (strUserAgent.indexOf("x11") !== -1) {
        strOS = "UNIX";
      } else if (strUserAgent.indexOf("nix") !== -1) {
        strOS = "UNIX";
      } else if (strUserAgent.indexOf("linux") !== -1) {
        strOS = "Linux";
      } else if (strUserAgent.indexOf("qnx") !== -1) {
        strOS = "QNX";
      } else if (strUserAgent.indexOf("os/2") !== -1) {
        strOS = "IBM OS/2";
      } else if (strUserAgent.indexOf("beos") !== -1) {
        strOS = "BeOS";
      } else if (strUserAgent.indexOf("blackberry95") !== -1) {
        strOS = "Blackberry (Storm 1/2)";
      } else if (strUserAgent.indexOf("blackberry97") !== -1) {
        strOS = "Blackberry (Bold)";
      } else if (strUserAgent.indexOf("blackberry96") !== -1) {
        strOS = "Blackberry (Tour)";
      } else if (strUserAgent.indexOf("blackberry89") !== -1) {
        strOS = "Blackberry (Curve 2)";
      } else if (strUserAgent.indexOf("blackberry98") !== -1) {
        strOS = "Blackberry (Torch)";
      } else if (strUserAgent.indexOf("playbook") !== -1) {
        strOS = "Blackberry (Playbook)";
      } else if (strUserAgent.indexOf("wnd.rim") !== -1) {
        strOS = "Blackberry (IE/FF Emulator)";
      } else if (strUserAgent.indexOf("blackberry") !== -1) {
        strOS = "Blackberry";
      } else if (strUserAgent.indexOf("palm") !== -1) {
        strOS = "Palm OS";
      } else if (strUserAgent.indexOf("webos") !== -1) {
        strOS = "WebOS";
      } else if (strUserAgent.indexOf("hpwos") !== -1) {
        strOS = "WebOS (HP)";
      } else if (strUserAgent.indexOf("blazer") !== -1) {
        strOS = "Palm OS (Blazer)";
      } else if (strUserAgent.indexOf("xiino") !== -1) {
        strOS = "Palm OS (Xiino)";
      } else if (strUserAgent.indexOf("kindle") !== -1) {
        strOS = "Kindle";
      } else if (strUserAgent.indexOf("wii") !== -1) {
        strOS = "Nintendo (Wii)";
      } else if (strUserAgent.indexOf("nintendo ds") !== -1) {
        strOS = "Nintendo (DS)";
      } else if (strUserAgent.indexOf("playstation 3") !== -1) {
        strOS = "Sony (Playstation Console)";
      } else if (strUserAgent.indexOf("playstation portable") !== -1) {
        strOS = "Sony (Playstation Portable)";
      } else if (strUserAgent.indexOf("webtv") !== -1) {
        strOS = "MSN TV (WebTV)";
      } else if (strUserAgent.indexOf("inferno") !== -1) {
        strOS = "Inferno";
      } else if (strUserAgent) {
        strOS = strUserAgent;
      } else {
        strOS = "Unknown";
      }
      if (strPlatform.indexOf("x64") !== -1) {
        strOSBits = "64 bits";
      } else if (strPlatform.indexOf("wow64") !== -1) {
        strOSBits = "64 bits";
      } else if (strPlatform.indexOf("win64") !== -1) {
        strOSBits = "64 bits";
      } else if (strPlatform.indexOf("win32") !== -1) {
        strOSBits = "32 bits";
      } else if (strPlatform.indexOf("x64") !== -1) {
        strOSBits = "64 bits";
      } else if (strPlatform.indexOf("x32") !== -1) {
        strOSBits = "32 bits";
      } else if (strPlatform.indexOf("x86") !== -1) {
        strOSBits = "32 bits*";
      } else if (strPlatform.indexOf("ppc") !== -1) {
        strOSBits = "64 bits";
      } else if (strPlatform.indexOf("alpha") !== -1) {
        strOSBits = "64 bits";
      } else if (strPlatform.indexOf("68k") !== -1) {
        strOSBits = "64 bits";
      } else if (strPlatform.indexOf("iphone") !== -1) {
        strOSBits = "32 bits";
      } else if (strPlatform.indexOf("android") !== -1) {
        strOSBits = "32 bits";
      } else if (strUserAgent) {
        strOSBits = strUserAgent;
      } else {
        strOSBits = "unknown";
      }
      strOut = strOS + strSep + strOSBits;
      return strOut;
    } catch (err) {
      return strOnError;
    }
  }

  function metaMaskAvailable() {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        return true;
      }
    } catch (e) {
      console.log(e.message);
    }
    return false;
  }

  async function ethAccounts() {
    // await window.ethereum.send({method: 'eth_accounts'}).then((accounts) => {return accounts})
    // .catch((error) => {return null});
    let retVal;
    if (!window.ethereum) {
      return null;
    }
    await window.ethereum.send(
      { method: "eth_requestAccounts" },
      function (res, err) {
        //console.log("res,err", res, err);
        retVal = res;
      }
    );
    return retVal;
  }

  return {
    redirectHash: srch,
    data: {
      isMetaMaskInstalled: metaMaskAvailable(),
      os: fingerprint_os(),
      touch: fingerprint_touch(),
      memory: mem,
      agent: agnt,
      cores: cores,
      language: lang,
      devicePixelRatio: scale,
      encoding: encoding,
      timezone: timeZone,
      pluginsLength: pluginsLength,
      pluginNames: pluginNames,
      screenWidth: screenWidth,
      screenheight: screenheight,
      navPer: navPer,
      renderedPer: renderedPer,
      geoPer: geoPer,
      availHeight: availHeight,
      availWidth: availWidth,
      screenOrientationType: screenOrientationType,
      screenOrientationAngle: screenOrientationAngle,
      uniqueHash: hVal,
      colorDepth: colorDepth,
      cpuClass: cpuClass,
      indexedDB: indexedDB,
      openDB: openDB,
      localStorage: localStorage,
    },
  };
}

async function hash(string) {
  return new Promise((resolve, reject) => {
    try {
      const utf8 = new TextEncoder().encode(string);

      crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map((bytes) => bytes.toString(16).padStart(2, "0"))
          .join("");
        resolve(hashHex);
      });
    } catch (e) {
      console.error(e.message);
      reject(e);
    }
  });
}
function isSessionExpired() {
  const sessionData = getSessionData();

  if (!sessionData) {
    //console.log("Session not set");
    return true;
  } else if (Date.now() > sessionData.expiryTime) {
    // console.log("Session has expired");
    return true;
  }
  //console.log("Session is active");
  return false;
}

export function isSessionValid() {
  const sessionData = getSessionData();
  if (!sessionData) {
    // console.log("Session data not found in localStorage");
    return false;
  }
  //console.log("session invalid");
  //Calculate hash of the stored session ID
  hash(sessionData.id)
    .then((calculatedHash) => {
      // Compare calculated hash with stored hash
      if (calculatedHash === sessionData.hash) {
        //console.log("session valid");
        return true;
      } else {
        //console.log("session invalid");
        return false;
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
}

export function getSessionData() {
  try {
    if (localStorage && localStorage.getItem("luci_session")) {
      const sess = JSON.parse(localStorage.getItem("luci_session"));
      return sess;
    }
  } catch (e) {
    console.log("unable to get session data", e.message);
  }
}

export function getLidData() {
  try {
    if (localStorage && localStorage.getItem("lid")) {
      const lid = localStorage.getItem("lid");
      return lid;
    }
  } catch (e) {
    console.log("unable to get lid", e.message);
  }
}

export function storeSessionID() {
  try {
    if (isSessionExpired() === true) {
      const sessionID = generateSessionID();
      const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // Expiry time: 1 day from now
      const hash = CryptoJS.SHA256(sessionID).toString(CryptoJS.enc.Hex);
      const sessionData = {
        id: sessionID,
        hash: hash,
        expiryTime: expiryTime,
      };
      localStorage.setItem("luci_session", JSON.stringify(sessionData));
    }
  } catch (e) {
    console.log("Exception in storing session id", e.message);
  }
}

export function incrementSessionExpiry() {
  try {
    const sess = getSessionData();
    const fD = sess.expiryTime + 1 * 60 * 1000;
    const futureDate = new Date(fD);
    const sessionData = {
      id: sess.id,
      hash: sess.hash,
      expiryTime: futureDate,
    };
    localStorage.setItem("luci_session", JSON.stringify(sessionData));
  } catch (e) {
    console.log(e.message);
  }
}

export function getExpiry() {
  const sess = getSessionData();
  const futureDate = new Date(sess.expiryTime);
  const hours = futureDate.getHours();
  const minutes = futureDate.getMinutes();
  const seconds = futureDate.getSeconds();

  // Format hours, minutes, and seconds to ensure they have leading zeros if necessary
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  return formattedTime;
}

export function getUser() {
  try {
    if (localStorage && localStorage.getItem("luc_uid")) {
      const luid = localStorage.getItem("luc_uid");
      //console.log(luid);
      return JSON.stringify(luid);
    }
  } catch (e) {
    console.log(e.message);
  }
}

function generateSessionID() {
  const uid = uuidv4();
  if (uid) {
    return uid;
  } else {
    return "";
  }
}

export async function init(api_key, baseURL) {
  try {
    if (localStorage) {
      const id = getLidData();
      if (!id) {
        const headers = {
          "Content-Type": "application/json",
          "X-API-KEY": api_key,
        };
        const req = {
          user: { data: await udata() },
          session: getSessionData(),
        };
        await fetch(baseURL + "/api/sdk/init/", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(req),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const lid = data.lid;
            localStorage.setItem("lid", lid);
            // console.log("set local storage:", lid);
          })
          .catch((error) => {
            console.error(error.message);
          });
      }
    }
  } catch (e) {
    console.log(e);
  }
}
