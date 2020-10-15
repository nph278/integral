let common_patterns = ['andt', 'ment', 'atio', 'ions', 'thec', 'inth', 'ngth', 'here',
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
  'Th', 'th'];

let chars = "×☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;" +
  "<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂Ç" +
  "üéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞" +
  "╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■Þ"

function encode(a: number) {
  if (a === 0) {
    return chars[0];
  }
  const l = chars.length;
  let b = a;
  let base = 1;
  let str = "";
  while (base <= a) {
    str += chars[b % l];
    b = Math.floor(b / l);
    base *= l;
  }
  return str;
}

function decode(a: string) {
  const l = chars.length;
  let base = 1;
  let val = 0;
  for (let i = 0; i < a.length; i++) {
    val += base * chars.indexOf(a[i]);
    base *= l;
  }
  return val;
}

function decodestr(a: string) {
  for (let i = 0; i < 32; i++) {
    a = a.split(chars[i])
      .join(common_patterns[i]);
  }
  for (let i = 128; i < 256; i++) {
    a = a.split(chars[i])
      .join(common_patterns[i - 96]);
  }
  return a;
}

function encodestr(a: string) {
  for (var i = 0; i < 32; i++) {
    a = a.split(common_patterns[i])
      .join(chars[i]);
  }
  for (var i = 128; i < 256; i++) {
    a = a.split(common_patterns[i - 96])
      .join(chars[i]);
  }
  return a;
}