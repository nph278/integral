common_patterns = ['andt', 'ment', 'atio', 'ions', 'thec', 'inth', 'ngth', 'here',
                   'with', 'thei', 'sthe', 'thes', 'ting', 'sand', 'fthe', 'this',
                   'ethe', 'ofth', 'from', 'ingt', 'that', 'thep', 'dthe', 'ther',
                   'rthe', 'tthe', 'nthe', 'them', 'othe', 'tion', 'ont', 'eth',
                   'Int', 'int', 'res', 'all', 'Nth', 'nth', 'oth', 'ate', 'Tha',
                   'tha', 'sth', 'hat', 'For', 'for', 'fth', 'ati', 'Her', 'her',
                   'ith', 'ers', 'Ion', 'ion', 'oft', 'est', 'Ent', 'ent', 'his',
                   'ter', 'Ing', 'ing', 'ver', 'tio', 'And', 'and', 'hes', 'ere',
                   'The', 'the', ' t', ' T', ' a', ' A', ' i', ' I', ' s', ' S',
                   ' o', ' O', ' w', ' W', ' h', ' H', ' b', ' B', ' c', ' C',
                   ' m', ' M', 'of', 'te', 'Nt', 'nt', 'ou', 'ar', 'St', 'st',
                   'se', 'ti', 'On', 'on', 'et', 'ea', 'Es', 'es', 'ha', 'or',
                   'Re', 're', 'is', 'to', 'An', 'an', 'as', 'nd', 'Er', 'er',
                   'it', 'ed', 'In', 'in', 'al', 'at', 'He', 'he', 'ng', 'en',
                   'Th', 'th']

string_chop = function(str, size) {
    if (str == null)
        return [];

    str = String(str);
    size = ~~size;

    if (size > 0)
        return str.match(new RegExp('.{1,' + size + '}', 'g'));

    return [str];
}

codestr = "×☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;" +
    "<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂Ç" +
    "üéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞" +
    "╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■Þ"

function decode(a) {
    l = codestr.length;
    base = 1;
    val = 0;
    for (var i = 0; i < a.length; i++) {
        val += base * codestr.indexOf(a[i]);
        base *= l;
    }
    return val;
}

function encode(a) {
    if (a === 0) {
        return codestr[0];
    }
    b = a;
    l = codestr.length;
    base = 1;
    str = "";
    while (base <= a) {
        str += codestr[b % l];
        b = Math.floor(b / l);
        base *= l;
    }
    return str;
}

function decodestr(a) {
    for (var i = 0; i < 32; i++) {
        a = a.split(codestr[i])
            .join(common_patterns[i]);
    }
    for (var i = 128; i < 256; i++) {
        a = a.split(codestr[i])
            .join(common_patterns[i - 96]);
    }
    return a;
}

function encodestr(a) {
    for (var i = 0; i < 32; i++) {
        a = a.split(common_patterns[i])
            .join(codestr[i]);
    }
    for (var i = 128; i < 256; i++) {
        a = a.split(common_patterns[i - 96])
            .join(codestr[i]);
    }
    return a;
}

function encodeLink(a) {
    try {
        return btoa(a.split ``.map(i => String.fromCharCode(codestr.indexOf(i)))
                .join ``)
            .replace(/=+$/, '')
    } catch (error) {
        return escape(a)
    }
}

function decodeLink(a) {
    try {
        return atob(a)
            .split ``.map(i => codestr[i.charCodeAt(0)])
            .join ``
    } catch (error) {
        return unescape(a)
    }
}
