const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = __dirname;
const FLAG_0 = 'flag{m1cr0_m4cr0_sYnc}';
const FLAG_1 = 'flag{n0_c0py_p4st3}';
const FLAG_2 = 'flag{rc4_1s_n0t_d34d}';
const FLAG_3 = 'flag{fl3xb0x_m4st3r}';

const hashFunc = `
function sysHash(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return hash >>> 0;
}
`;

function sysHash(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return hash >>> 0;
}

const HASH_F0 = sysHash(FLAG_0);
const HASH_F1 = sysHash(FLAG_1);
const HASH_F2 = sysHash(FLAG_2);
const HASH_F3 = sysHash(FLAG_3);

function encodeBinaryToHomoglyphs(text, payload) {
    let binary = '';
    for (let i = 0; i < payload.length; i++) {
        binary += payload[i].charCodeAt(0).toString(2).padStart(8, '0');
    }

    const homoglyphs = {
        'a': '\u0430',
        'e': '\u0435',
        'c': '\u0441',
        'o': '\u043E',
        'p': '\u0440',
        'x': '\u0445',
        'y': '\u0443'
    };

    let result = '';
    let binIdx = 0;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (homoglyphs[char] && binIdx < binary.length) {
            if (binary[binIdx] === '1') {
                result += homoglyphs[char];
            } else {
                result += char;
            }
            binIdx++;
        } else {
            result += char;
        }
    }
    return result;
}

const baseText = "Authentication process initiated. Connecting to core network. Verify peer identity via secure exchange topology. Payload extraction ready. System operational and clear. Check authorization protocols exceptionally carefully. Do not copy paste blindly.";
let expandedText = baseText.repeat(8);
const encodedFlag1Text = encodeBinaryToHomoglyphs(expandedText, FLAG_1);

function rc4(key, str) {
    let s = [], j = 0, x, res = '';
    for (let i = 0; i < 256; i++) { s[i] = i; }
    for (let i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i]; s[i] = s[j]; s[j] = x;
    }
    let i = 0; j = 0;
    for (let y = 0; y < str.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i]; s[i] = s[j]; s[j] = x;
        res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    return res;
}

const rc4KeyBase = FLAG_0 + "422";
const rc4Key = sysHash(rc4KeyBase).toString();
const f2Encrypted = Buffer.from(rc4(rc4Key, FLAG_2)).toString('base64');

let paddingClassesCSS = '';
for (let i = 1; i <= 255; i++) {
    paddingClassesCSS += `.pd-${i} { padding-left: ${i}px; }\n`;
}

let f3_html = '';
for (let i = 0; i < FLAG_3.length; i++) {
    let val = FLAG_3.charCodeAt(i);
    let p1 = Math.floor(val / 2);
    let p2 = val - p1;
    f3_html += `<div class="sys-sector sub-node pd-${p1} mx-offset pd-${p2}"></div>\n`;
}

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WRAITHNET :: PROTOCOL VIGIL</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Traps -->
    <!-- SECURE PAYLOAD: Xx_WRAITH_AES_IV_xX = "4b61726d615f506f6c696365" -->
    <!-- flag{base64_is_too_easy_try_again} -->
    <!-- ZmxhZ3tiYXNlNjRfaXNfdG9vX2Vhc3lfdHJ5X2FnYWlufQ== -->

    <div id="terminal">
        <div class="header">
            WRAITHNET &lt;SYSTEM CORE&gt; v9.42<br>
            INITIALIZATION SEQUENCE : <span id="seq">...</span>
        </div>
        
        <div class="log-entry auth-log">
            [SYS_LOG: AUTH] ${encodedFlag1Text}
        </div>

        <div id="wraith-core" data-rc-blob="${f2Encrypted}">
            [ENCRYPTED CORE MODULE]
            WAITING FOR DESERIALIZATION...
        </div>

        <div id="sector-grid">
            ${f3_html}
        </div>

    </div>

    <!-- Client Logic -->
    <script src="sys.js"></script>
</body>
</html>`;

const cssTemplate = `:root {
    --bg: #0a0a0f;
    --text: #0fdb8c;
    --warn: #db1b0f;
    --dt-shift: 0px;
}
body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Courier New', Courier, monospace;
    padding: 2rem;
    overflow-x: hidden;
}
body.dt-open {
    --dt-shift: -3px; 
}
#terminal {
    max-width: 900px;
    margin: 0 auto;
    border: 1px solid #333;
    padding: 20px;
    box-shadow: 0 0 15px rgba(15, 219, 140, 0.1);
}
.header {
    border-bottom: 2px dashed #333;
    padding-bottom: 15px;
    margin-bottom: 20px;
    opacity: 0.8;
}
.log-entry { margin: 10px 0; line-height: 1.4; color: #aaa; text-shadow: 0 0 2px rgba(170,170,170,0.5); }
.log-entry.auth-log { user-select: text; }

#wraith-core {
    margin: 20px 0;
    padding: 15px;
    border: 1px solid var(--warn);
    color: var(--warn);
    /* Strict layout property for Flag 2 dependency */
    box-sizing: border-box;
    width: 422px; 
}

#sector-grid {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
    opacity: 0.15; /* Hard to see visually */
}
.sys-sector {
    background: #222;
    height: 2px;
    width: 0; 
    box-sizing: content-box;
    /* When devtools is open, this shifts padding, destroying width metric! */
    margin-left: var(--dt-shift);
}

.input-area {
    margin-top: 40px;
    display: flex;
    gap: 10px;
}
#flag-input {
    flex-grow: 1;
    background: #000;
    color: #fff;
    border: 1px solid #555;
    padding: 10px;
}
#submit-btn {
    background: #333;
    color: var(--text);
    border: 1px solid var(--text);
    padding: 10px 20px;
    cursor: pointer;
}
#submit-btn:hover { background: #111; }
#result { margin-top: 15px; font-weight: bold; }

${paddingClassesCSS}
`;

const jsPayload = `
(function(){
    ${hashFunc}

    let _f = [];
    _f.push('f', 'l', 'a', 'g', '{');

    let _m = [];
    setTimeout(() => {
        _m.push('_', 'm', '4', 'c', 'r', '0');
        Promise.resolve().then(() => _m.push('_', 's', 'Y', 'n', 'c', '}'));
    }, 0);

    Promise.resolve().then(() => {
        _m.push('m', '1', 'c', 'r', '0');
    });

    // Anti-Debug worker
    let _dt = false;
    setInterval(() => {
        const _s = performance.now();
        debugger;
        if ((performance.now() - _s) > 100) {
            _dt = true;
            document.body.classList.add('dt-open');
        }
    }, 1000);

    document.addEventListener('copy', (e) => {
        const sel = window.getSelection().toString();
        if(sel.includes('AUTH') || sel.includes('network')) {
            e.clipboardData.setData('text/plain', "SYS_LOG: " + unescape("%66%6C%61%67%7B%77%72%30%6E%67%5F%70%34%74%68%5F%66%30%30%6C%7D"));
            e.preventDefault();
        }
    });

    // Initialize sequence view
    setTimeout(() => {
        const full0 = _f.join('') + _m.join('');
        document.getElementById('seq').innerText = "LOADED. SALT READY.";
        // We expose the array to window just so the event loop generates it.
        // It resides purely in memory closure otherwise. 
        window._wS = _m; 
    }, 500);

})();
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), htmlTemplate);
fs.writeFileSync(path.join(OUTPUT_DIR, 'style.css'), cssTemplate);
fs.writeFileSync(path.join(OUTPUT_DIR, 'sys.js'), jsPayload);

console.log("Challenge built successfully in " + OUTPUT_DIR);
