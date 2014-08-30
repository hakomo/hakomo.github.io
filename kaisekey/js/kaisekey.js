(function($, keylog) {

    var keyNames = [
        ,,,,,,,,'Backspace','Tab',,,,'Enter',,,
        ,,,'Pause','CapsLock',,,,,,,'Esc',,,,,
        'Space','PgUp','PgDn','End','Home','←','↑','→','↓',,,,'PrtSc','Insert','Delete',,
        ,,,,,,,,,,,,,,,,
        ,,,,,,,,,,,,,,,,
        ,,,,,,,,,,,'Win','Win','Apps',,,
        ,,,,,,,,,,,,,,,,
        'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12',,,,,
        ,,,,,,,,,,,,,,,,
        ,'ScrLk',,,,,,,,,,,,,,,
        'Shift','Shift','Ctrl','Ctrl','Alt','Alt',,,,,,,,,,,
        ,,,,,,,,,,';','=',',','-','.','/',
        '`',,,,,,,,,,,,,,,,
        ,,,,,,,,,,,'[','\\',']','\'',,
        ,,,,,,,,,,,,,,,,
        ,,,,,,,,,,,,,,,,
    ], shiftKeyNames = [
        ,,,,,,,,,,,,,,,,
        ,,,,,,,,,,,,,,,,
        ,,,,,,,,,,,,,,,,
        ')','!','@','#','$','%','^','&','*','(',,,,,,,
        ,,,,,,,,,,,,,,,,
        ,,,,,,,,,,,,,,,,
        ,,,,,,,,,,,,,,,,
        ,,,,,,,,,,,,,,,,
        ,,,,,,,,,,,,,,,,
        ,,,,,,,,,,,,,,,,
        ,,,,,,,,,,,,,,,,
        ,,,,,,,,,,':','+','<','_','>','?',
        '~',,,,,,,,,,,,,,,,
        ,,,,,,,,,,,'{','|','}','"',,
        ,,,,,,,,,,,,,,,,
        ,,,,,,,,,,,,,,,,
    ], ease = [
        ,,,,,,,,72,88,,,,87,,,
        ,,,,93,,,,,,,,,,,,
        100,,,,,,,,,,,,,,,,
        87,88,89,89,88,83,83,88,89,89,,,,,,,
        ,98,88,94,99,94,98,93,93,94,98,99,99,93,88,94,
        92,93,93,99,88,93,93,94,94,88,94,100,100,83,,,
        ,,,,,,,,,,,,,,,,
        ,,,,,,,,,,,,,,,,
        ,,,,,,,,,,,,,,,,
        ,,,,,,,,,,,,,,,,
        100,100,100,100,100,100,,,,,,,,,,,
        ,,,,,,,,,,97,85,94,87,94,92,
        84,,,,,,,,,,,,,,,,
        ,,,,,,,,,,,91,82,87,92,,
        ,,,,,,,,,,,,,,,,
        ,,,,,,,,,,,,,,,,
    ], Width = 60, visibleKeyIds;

    (function() {
        var i, a = [];
        keylog[0x1c0] = keylog[0x119] || 0;
        delete keylog[0x119];
        for(var k in keylog) {
            if((k / 256 & 5) === 5 || (k / 256 & 12) === 12)
                a.push(k);
        }
        for(i = 0; i < a.length; ++i) {
            if(keylog[(a[i] / 256 & ~4) * 256 + a[i] % 256]) {
                keylog[(a[i] / 256 & ~4) * 256 + a[i] % 256] += keylog[a[i]];
            } else {
                keylog[(a[i] / 256 & ~4) * 256 + a[i] % 256] = keylog[a[i]];
            }
            delete keylog[a[i]];
        }
    }());

    function setKeyNames(c, d) {
        var i;
        for(i = c.charCodeAt(0); i <= d.charCodeAt(0); ++i)
            keyNames[i] = String.fromCharCode(i);
    }
    setKeyNames('A', 'Z');
    setKeyNames('0', '9');

    var frequentOrder = function() {
        var a = [];
        for(var k in keylog)
            a.push({ keyId: k, count: keylog[k] });
        a.sort(function(p, q) { return q.count - p.count; });
        return a;
    }();

    function modifiersName(m) {
        var s = '';
        if((m & 2) === 2)
            s += 'Ctrl + ';
        if((m & 1) === 1)
            s += 'Alt + ';
        if((m & 8) === 8)
            s += 'Win + ';
        if((m & 4) === 4)
            s += 'Shift + ';
        return s;
    }

    function shortcutName(k) {
        if(parseInt(k / 256) === 4 && shiftKeyNames[k % 256]) {
            return shiftKeyNames[k % 256];
        } else {
            return modifiersName(k / 256) + (keyNames[k % 256] || k % 256);
        }
    }

    function modifiers() {
        var i, a = ['alt', 'ctrl', 'shift', 'win'], sm = 0;
        for(i = 0; i < a.length; ++i)
            sm += $('.modifiers > .' + a[i]).hasClass('btn-primary') ? Math.pow(2, i) : 0;
        return sm;
    }

    function isShift() {
        return $('#tab-keyboard').hasClass('active') && modifiers() === 4;
    }

    function keyName(cd) {
        return isShift() && shiftKeyNames[cd] ? shiftKeyNames[cd] : keyNames[cd] || cd;
    }

    function count(cd) {
        var i, ct = 0;
        if(!$('.modifiers > .total').hasClass('btn-primary'))
            return keylog[modifiers() * 256 + cd] || 0;
        for(i = 0; i < 16; ++i)
            ct += keylog[i * 256 + cd] || 0;
        return ct;
    }

    function popover(cd) {
        var i, a = [0, 4, 2, 6, 1, 5, 8, 12, 3, 7, 10, 14, 9, 13, 11, 15],
            t = $('<table class="table table-striped">').css('width', 350 + 'px');
        for(i = 0; i < a.length; ++i) {
            if(keylog[a[i] * 256 + cd] !== undefined)
                t.append('<tr><th>' + shortcutName(a[i] * 256 + cd) + '</th><td class="col-xs-2">' + keylog[a[i] * 256 + cd] + '</td></tr>');
        }
        return t;
    }

    function key(x, y, cd, w) {
        var i, ct = count(cd);
        visibleKeyIds.push(cd);
        return $('<a class="key" href="#">')
            .attr('data-count', ct)
            .css('left', x * Width).css('top', y * Width)
            .css('width', w === undefined ? Width - 2 : w * Width - 2)
            .css('height', Width - 2)
            .css('line-height', (Width / 2) + 'px')
            .html(keyName(cd) + '<br>' + (ct < 1000 ? ct : parseInt(ct / 1000) + 'K'))
            .popover({
                content: popover(cd)[0].outerHTML,
                html: true,
                placement: 'bottom',
                //trigger: 'focus',
            });
    }

    function keys(x, y, cds, w) {
        var i, a = $();
        for(i = 0; i < cds.length; ++i)
            a = a.add(key(x + i * (w || 1), y, cds[i], w));
        return a;
    }

    function ints(s) {
        var i, a = [];
        for(i = 0; i < s.length; ++i)
            a.push(s.charCodeAt(i));
        return a;
    }

    function uniqueCounts() {
        var i, a = [];
        for(i = 0; i < visibleKeyIds.length; ++i) {
            var ct = count(visibleKeyIds[i]);
            if(ct > 0)
                a.push(ct);
        }
        a.sort(function(p, q) { return p - q; });
        var b = [a[0]];
        for(i = 1; i < a.length; ++i) {
            if(b[b.length - 1] !== a[i])
                b.push(a[i]);
        }
        return b;
    }

    function setKeyboard() {
        visibleKeyIds = [];
        var i, a = [
            key(0, 0, 0x1b), keys(2, 0, [0x70, 0x71, 0x72, 0x73]), keys(6.5, 0, [0x74, 0x75, 0x76, 0x77]), keys(11, 0, [0x78, 0x79, 0x7a, 0x7b]),
            keys(0, 1.5, [0xc0].concat(ints('1234567890')).concat([0xbd, 0xbb])), key(13, 1.5, 0x8, 2),
            key(0, 2.5, 0x9, 1.5), keys(1.5, 2.5, ints('QWERTYUIOP').concat([0xdb, 0xdd])), key(13.5, 2.5, 0xdc, 1.5),
            key(0, 3.5, 0x14, 1.75), keys(1.75, 3.5, ints('ASDFGHJKL').concat([0xba, 0xde])), key(12.75, 3.5, 0xd, 2.25),
            key(0, 4.5, 0xa0, 2.25), keys(2.25, 4.5, ints('ZXCVBNM').concat([0xbc, 0xbe, 0xbf])), key(12.25, 4.5, 0xa1, 2.75),
            keys(0, 5.5, [0xa2, 0x5b, 0xa4], 1.25), key(3.75, 5.5, 0x20, 6.25), keys(10, 5.5, [0xa5, 0x5c, 0x5d, 0xa3], 1.25),
            keys(15.5, 0, [0x2c, 0x91, 0x13]),
            keys(15.5, 1.5, [0x2d, 0x24, 0x21]), keys(15.5, 2.5, [0x2e ,0x23 , 0x22]),
            key(16.5, 4.5, 0x26), keys(15.5, 5.5, [0x25, 0x28, 0x27]),
        ], b = $();
        visibleKeyIds.sort(function(p, q) { return p - q; });
        var c = uniqueCounts();
        for(i = 0; i < a.length; ++i) {
            a[i].each(function() {
                if(parseInt($(this).attr('data-count')) === 0) return;
                var l = 0, r = c.length;
                while(r - l > 1) {
                    if(c[parseInt((l + r) / 2)] > $(this).attr('data-count')) {
                        r = parseInt((l + r) / 2);
                    } else {
                        l = parseInt((l + r) / 2);
                    }
                }
                $(this).css('background-color', 'hsl(' + parseInt(360 - (c.length - l - 1) / c.length * 120) + ', 50%, ' + parseInt((c.length - l - 1) / c.length * 35 + 65) + '%)');
            });
            b = b.add(a[i]);
        }
        $('.keyboard').css('width', Width * 18.5 - 2).css('height', Width * 6.5 - 2).empty().append(b);
    }

    function setFrequent() {
        var i;
        $('.frequent').empty();
        for(i = 0; i < Math.min(50, frequentOrder.length); ++i)
            $('.frequent').append('<tr><th>' + shortcutName(frequentOrder[i].keyId) + '</th><td class="col-xs-2">' + frequentOrder[i].count + '</td></tr>');
    }

    function setSupplyAndDemand() {
        var i, j, a = {};
        for(i = 0; i < visibleKeyIds.length; ++i) {
            for(j = 0; j < 16; ++j) {
                if(j === 0 || visibleKeyIds[i] !== 0x5b && visibleKeyIds[i] !== 0x5c &&
                        (visibleKeyIds[i] < 0xa0 || 0xa5 < visibleKeyIds[i])) {
                    a[j * 256 + visibleKeyIds[i]] = { frequent: -1 };
                }
            }
        }
        for(i = 0; i < frequentOrder.length; ++i) {
            if(a[frequentOrder[i].keyId] !== undefined)
                a[frequentOrder[i].keyId].frequent = i;
        }
        for(var k in a) {
            if(a[k].frequent === -1)
                a[k].frequent = frequentOrder.length;
        }

        var b = [];
        for(i = 0; i < visibleKeyIds.length; ++i) {
            for(j = 0; j < 16; ++j) {
                if(j === 0 || visibleKeyIds[i] !== 0x5b && visibleKeyIds[i] !== 0x5c &&
                        (visibleKeyIds[i] < 0xa0 || 0xa5 < visibleKeyIds[i])) {
                    var sm = 0;
                    if((j & 4) === 4)
                        sm += 5;
                    if((j & 2) === 2)
                        sm += 10;
                    if((j & 1) === 1)
                        sm += 15;
                    if((j & 8) === 8)
                        sm += 20;
                    b.push({ keyId: j * 256 + visibleKeyIds[i], ease: Math.max(0, (ease[visibleKeyIds[i]] || 0) - sm) });
                }
            }
        }
        b.sort(function(p, q) { return q.ease - p.ease; });
        for(i = 0; i < b.length && b[i].ease > 0; ++i)
            a[b[i].keyId].ease = i;
        for(j = i; j < b.length; ++j)
            a[b[j].keyId].ease = i;

        var c = [];
        for(var k in a)
            c.push({ keyId: k, diff: a[k].frequent - a[k].ease });
        c.sort(function(p, q) { return p.diff - q.diff; });

        var t = $('.excessive-demand').css('width', 350 + 'px');
        for(i = 0; i < 15; ++i)
            t.append('<tr><th>' + shortcutName(c[i].keyId) + '</th></tr>');
        t = $('.excessive-supply').css('width', 350 + 'px');
        for(i = 0; i < 15; ++i)
            t.append('<tr><th>' + shortcutName(c[c.length - i - 1].keyId) + '</th></tr>');
    }

    $(function() {
        $('.modifiers > button').on('click', function() {
            $(this).toggleClass('btn-primary');
            if($(this).hasClass('total')) {
                $('.modifiers > :not(.total)').removeClass('btn-primary');
            } else {
                $('.modifiers > .total').removeClass('btn-primary');
            }
            setKeyboard();
        });

        setKeyboard();
        setFrequent();
        setSupplyAndDemand();
    });
}(jQuery, keylog));
