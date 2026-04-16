
(function () {

    function sysHash(str) {
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
        }
        return hash >>> 0;
    }


    let _f = [];
    _f.push('f', 'l', 'a', 'g', '{');

    let _m = [];
    setTimeout(() => {
        _m.push('_', 'm', '6', 'c', 'r', '0');
        Promise.resolve().then(() => _m.push('_', 's', 'Y', 'n', 'c', '}'));
    }, 0);

    Promise.resolve().then(() => {
        _m.push('m', '3', 'c', 'r', '0');
    });

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
        if (sel.includes('AUTH') || sel.includes('network')) {
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
