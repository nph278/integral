document.write("<script language=javascript src='constants.js'></script>")

var input_cnt = 0;

var indent = "";

function runlang(t, inp) {
    // wrapper
    input_cnt = 0;
    try {
        var a = inp.split("\n\n");
        var o = "";
        if(a.length==1)
            return String(actualRunlang(t, a[0]))
        for(var x=0;x<a.length;x++)
            o += "=== Test case #"+(x+1)+", input:"+a[x].replace(/\n/g,"\\n")+" ===\n"+String(actualRunlang(t, a[x]))+"\n\n";
        return o;
    } catch (error) {
        return t+"\n"+indent+"^\n"+error;
    }
}

function sPop(arr, inp) {
    a = arr.pop();
    if(a == undefined) {
         return inp[inp.length-(input_cnt++)%inp.length-1]
    }
    return a;
}

function actualRunlang(t, inp) {
    inp = inp || "";
    var stack = [];
    var new_inp = [];
    if (inp !== "") {
        for (var i = 0; i < inp.split("\n")
            .length; i++) {
            if (!!Number(inp.split("\n")[i]) || inp.split("\n")[i] === "0") {
                new_inp.push(parseFloat(inp.split("\n")[i]));
                stack.push(parseFloat(inp.split("\n")[i]));
            } else {
                new_inp.push(eval(inp.split("\n")[i]));
                stack.push(eval(inp.split("\n")[i]));
            }
        }
    }
    var stringmode = false;
    var encstringmode = false;
    var charmode = false;
    var intmode = false;
    var str1 = "";
    for (var i = 0; i < t.length; i++) {
        if (stringmode) {
            if (t[i] === "⌡") {
                stringmode = false;
                stack.push(str1);
                str1 = "";
            } else if (t[i] === "≤") {
                stringmode = false;
                encstringmode = true;
                stack.push(str1);
                str1 = "";
            } else if (t[i] === "⌠") {
                stack.push(str1);
                str1 = "";
            } else if (i === t.length - 1) {
                str1 += t[i];
                stringmode = false;
                stack.push(str1);
                str1 = "";
            } else {
                str1 += t[i];
            }
        } else if (encstringmode) {
            if (t[i] === "÷") {
                encstringmode = false;
                stack.push(decodestr(str1));
                str1 = "";
            } else if (i === t.length - 1) {
                str1 += t[i];
                stringmode = false;
                stack.push(decodestr(str1));
                str1 = "";
            } else {
                str1 += t[i];
            }
        } else if (intmode) {
            if (t[i] === ";") {
                intmode = false;
                stack.push(decode(str1));
                str1 = "";
            } else if (i === t.length - 1) {
                str1 += t[i];
                intmode = false;
                stack.push(decode(str1));
                str1 = "";
            } else {
                str1 += t[i];
            }

        } else if (charmode) {
            charmode = false;
            stack.push(t[i]);
        } else {
            snack: switch (t[i]) {
                case "☺":
                    sPop(stack, new_inp);
                    break snack;
                case "☻":
                    sPop(stack, new_inp);
                    sPop(stack, new_inp);
                    break snack;
                    break;
                case "♥":
                    sPop(stack, new_inp);
                    sPop(stack, new_inp);
                    sPop(stack, new_inp);
                    break snack;
                    break;
                case "♦":
                    tmp = sPop(stack, new_inp);
                    tmp2 = sPop(stack, new_inp);
                    stack.push(tmp, tmp2);
                    break snack;
                    break;
                case "♠":
                    c = sPop(stack, new_inp);
                    b = sPop(stack, new_inp);
                    a = sPop(stack, new_inp);
                    stack.push(b, a, c);
                    break snack;
                    break;
                case "•":
                    c = sPop(stack, new_inp);
                    b = sPop(stack, new_inp);
                    a = sPop(stack, new_inp);
                    stack.push(b, c, a);
                    break snack;
                    break;
                case "◘":
                    c = sPop(stack, new_inp);
                    b = sPop(stack, new_inp);
                    a = sPop(stack, new_inp);
                    stack.push(c, a, b);
                    break snack;
                    break;
                case "○":
                    c = sPop(stack, new_inp);
                    b = sPop(stack, new_inp);
                    a = sPop(stack, new_inp);
                    stack.push(c, b, a);
                    break snack;
                    break;
                case "◙":
                    a = sPop(stack, new_inp);
                    stack.push(a);
                    stack.push(a);
                    break snack;
                    break;
                case "♂":
                    a = sPop(stack, new_inp);
                    stack.push(a);
                    stack.push(a);
                    stack.push(a);
                    break snack;
                    break;
                case "♀":
                    a = sPop(stack, new_inp);
                    stack.push(a);
                    stack.push(a);
                    stack.push(a);
                    stack.push(a);
                    break snack;
                    break;
                case "♪":
                    stack = stack.reverse();
                    break snack;
                    break;
                case "♫":
                    b = sPop(stack, new_inp);
                    a = Number(sPop(stack, new_inp));
                    for (var j = 0; j < a; j++) {
                        stack.push(b);
                    }
                    break snack;
                    break;
                case "☼":
                    b = Number(sPop(stack, new_inp));
                    a = sPop(stack, new_inp);
                    for (var j = 0; j < b; j++) {
                        stack.push(a);
                    }
                    break;
                case "►":
                    console.log(String(stack));
                    b = sPop(stack, new_inp);
                    console.log(String(stack));
                    a = sPop(stack, new_inp);
                    console.log(String(stack));
                    stack.push(a + b);
                    break;
                case "◄":
                    b = Number(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(a - b);
                    break;
                case "↕":
                    b = Number(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(a * b);
                    break;
                case "‼":
                    b = Number(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(a / b);
                    break;
                case "¶":
                    b = Number(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(a % b);
                    break;
                case "§":
                    b = Number(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(Math.pow(a, b));
                    break;
                case "▬":
                    a = Number(sPop(stack, new_inp));
                    stack.push(~a);
                    break;
                case "↨":
                    b = Number(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(a | b);
                    break;
                case "↓":
                    b = Number(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(a & b);
                    break;
                case "→":
                    b = Number(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(a ^ b);
                    break;
                case "←":
                    b = Number(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(~(a | b));
                    break;
                case "∟":
                    b = Number(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(~(a & b));
                    break;
                case "↔":
                    b = Number(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(~(a ^ b));
                    break;
                case "▲":
                    a = Number(sPop(stack, new_inp));
                    stack.push(1 + a);
                    break;
                case "▼":
                    a = Number(sPop(stack, new_inp));
                    stack.push(a - 1);
                    break;
                case " ":
                    stack.push(1);
                    break;
                case "!":
                    stack.push(2);
                    break;
                case "\"":
                    stack.push(3);
                    break;
                case "#":
                    stack.push(4);
                    break;
                case "$":
                    stack.push(5);
                    break;
                case "%":
                    stack.push(6);
                    break;
                case "&":
                    stack.push(7);
                    break;
                case "'":
                    stack.push(8);
                    break;
                case "(":
                    stack.push(9);
                    break;
                case ")":
                    stack.push(10);
                    break;
                case "*":
                    stack.push(100);
                    break;
                case "+":
                    stack.push(1000);
                    break;
                case ",":
                    stack.push(10000);
                    break;
                case "-":
                    stack.push(100000);
                    break;
                case ".":
                    stack.push(1000000);
                    break;
                case "/":
                    stack.push(1000000000);
                    break;
                case "♣":
                    a = Number(sPop(stack, new_inp));
                    stack.push(2 * a);
                    break;
                case "0":
                    stack.push(Math.E);
                    break;
                case "1":
                    stack.push(Math.PI);
                    break;
                case "2":
                    stack.push((Math.sqrt(5) + 1) / 2);
                    break;
                case "3":
                    a = Number(sPop(stack, new_inp));
                    stack.push(Math.pow(10, a));
                    break;
                case "4":
                    a = Number(sPop(stack, new_inp));
                    stack.push(Math.pow(a, 2));
                    break;
                case "5":
                    a = Number(sPop(stack, new_inp));
                    stack.push(Math.pow(Math.E, a));
                    break;
                case "⌡":
                    stringmode = true;
                    break;
                case "7":
                    stack.push("\n");
                    break;
                case "8":
                    stack.push(" ");
                    break;
                case "9":
                    stack.push("\0");
                    break;
                case ":":
                    stack.push(",");
                    break;
                case ";":
                    intmode = true;
                    break;
                case "<":
                    a = Number(sPop(stack, new_inp));
                    stack.push(Number(!a));
                    break;
                case "=":
                    b = Number(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(a || b);
                    break;
                case ">":
                    b = Number(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(a && b);
                    break;
                case "?":
                    b = Number(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(Number((a || b) && (!a && b)));
                    break;
                case "@":
                    b = Number(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(Number(!(a || b)));
                    break;
                case "A":
                    b = Number(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(Number(!(a && b)));
                    break;
                case "B":
                    b = Number(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(Number(!((a || b) && (!a && b))));
                    break;
                case "C":
                    stack.push(0);
                    break;
                case "D":
                    stack.push("abcdefghijklmnopqrstuvwxyz");
                    break;
                case "E":
                    stack.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
                    break;
                case "F":
                    stack.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
                    break;
                case "G":
                    stack.push("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
                    break;
                case "H":
                    stack.push("qwertyuiopasdfghjklzxcvbnm");
                    break;
                case "I":
                    stack.push("QWERTYUIOPASDFGHJKLZXCVBNM");
                    break;
                case "J":
                    stack.push("QWERTYUIOPASDFGHJKLZXCVBNMabcdefghijklmnopqrstuvwxyz");
                    break;
                case "K":
                    stack.push("abcdefghijklmnopqrstuvwxyzQWERTYUIOPASDFGHJKLZXCVBNM");
                    break;
                case "L":
                    stack.push("abcdefghijklmnopqrstuvwxyz0123456789");
                    break;
                case "M":
                    stack.push("0123456789abcdefghijklmnopqrstuvwxyz");
                    break;
                case "N":
                    stack.push("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");
                    break;
                case "O":
                    b = String(sPop(stack, new_inp));
                    a = String(sPop(stack, new_inp));
                    stack.push(a.split(b));
                    break;
                case "P":
                    b = sPop(stack, new_inp);
                    a = String(sPop(stack, new_inp));
                    stack.push(a.join(b));
                    break;
                case "Q":
                    b = Number(sPop(stack, new_inp));
                    a = String(sPop(stack, new_inp));
                    stack.push(string_chop(a, b));
                    break;
                case "R":
                    a = sPop(stack, new_inp);
                    stack.push(a.join("\n"));
                    break;
                case "S":
                    a = sPop(stack, new_inp);
                    stack.push(a.join(""));
                    break;
                case "T":
                    a = sPop(stack, new_inp);
                    stack.push(a.join(" "));
                    break;
                case "U":
                    a = sPop(stack, new_inp);
                    stack.push(a.join(","));
                    break;
                case "V":
                    a = sPop(stack, new_inp);
                    if (typeof a === "string") {
                        stack.push(a.split("")
                            .reverse()
                            .join(""));
                    } else {
                        stack.push(a.reverse());
                    }
                    break;
                case "W":
                    c = String(sPop(stack, new_inp));
                    b = String(sPop(stack, new_inp));
                    a = String(sPop(stack, new_inp));
                    stack.push(a.split(b)
                        .join(c));
                    break;
                case "X":
                    c = String(sPop(stack, new_inp));
                    b = String(sPop(stack, new_inp));
                    a = String(sPop(stack, new_inp));
                    stack.push(a.replace(RegExp(b, "g"), c));
                    break;
                case "Y":
                    a = String(sPop(stack, new_inp));
                    stack.push(a.split("\n"));
                    break;
                case "Z":
                    a = String(sPop(stack, new_inp));
                    stack.push(a.split(""));
                    break;
                case "[":
                    a = String(sPop(stack, new_inp));
                    stack.push(a.split(" "));
                    break;
                case "\\":
                    a = String(sPop(stack, new_inp));
                    stack.push(a.split(","));
                    break;
                case "]":
                    stack.push("⌠");
                    break;
                case "^":
                    stack.push("⌡");
                    break;
                case "_":
                    b = sPop(stack, new_inp);
                    a = sPop(stack, new_inp);
                    stack.push(Number(a < b));
                    break;
                case "`":
                    b = sPop(stack, new_inp);
                    a = sPop(stack, new_inp);
                    stack.push(Number(a == b));
                    break;
                case "a":
                    b = sPop(stack, new_inp);
                    a = sPop(stack, new_inp);
                    stack.push(Number(a > b));
                    break;
                case "b":
                    b = sPop(stack, new_inp);
                    a = sPop(stack, new_inp);
                    stack.push(Number(a <= b));
                    break;
                case "c":
                    b = sPop(stack, new_inp);
                    a = sPop(stack, new_inp);
                    stack.push(Number(a >= b));
                    break;
                case "6":
                    a = Number(sPop(stack, new_inp));
                    stack.push(Math.sqrt(a));
                    break;
                case "d":
                    a = String(sPop(stack, new_inp));
                    t = t.slice(0, i + 1) + a + t.slice(i + 1, t.length);
                    break;
                case "e":
                    b = Number(sPop(stack, new_inp));
                    a = String(sPop(stack, new_inp));
                    t = t.slice(0, i + 1) + a.repeat(b) + t.slice(i + 1, t.length);
                    break;
                case "÷": // NBSP
                    encstringmode = true;
                    break;
                case "f":
                    b = Number(sPop(stack, new_inp));
                    a = String(sPop(stack, new_inp));
                    stack.push(a.repeat(b));
                    break;
                case "g":
                    b = String(sPop(stack, new_inp));
                    a = Number(sPop(stack, new_inp));
                    stack.push(b.repeat(a));
                    break;
                case "h":
                    b = Number(sPop(stack, new_inp));
                    a = String(sPop(stack, new_inp));
                    if (b) {
                        t = t.slice(0, i + 1) + a + t.slice(i + 1, t.length);
                    }
                    break;
                case "i":
                    c = Number(sPop(stack, new_inp));
                    b = String(sPop(stack, new_inp));
                    a = String(sPop(stack, new_inp));
                    if (c) {
                        t = t.slice(0, i + 1) + a + t.slice(i + 1, t.length);
                    } else {
                        t = t.slice(0, i + 1) + b + t.slice(i + 1, t.length);
                    }
                    break;
                case "j":
                    a = sPop(stack, new_inp);
                    stack = stack.concat(a);
                    break;
                case "k":
                    b = sPop(stack, new_inp);
                    a = sPop(stack, new_inp);
                    if (a > b) {
                        stack.push(-1);
                    } else if (b > a) {
                        stack.push(1);
                    } else {
                        stack.push(0);
                    }
                    break;
                case "l":
                    a = sPop(stack, new_inp);
                    stack.push(a.length);
                    break;
                case "m":
                    b = Number(sPop(stack, new_inp));
                    a = sPop(stack, new_inp);
                    stack.push(a[b]);
                    break;
                case "n":
                    a = sPop(stack, new_inp);
                    stack.push(a[0]);
                    break;
                case "o":
                    a = sPop(stack, new_inp);
                    stack.push(a[a.length - 1]);
                    break;
                case "p":
                    c = Number(sPop(stack, new_inp));
                    b = Number(sPop(stack, new_inp));
                    a = sPop(stack, new_inp);
                    stack.push(a.slice(b, c));
                    break;
                case "q":
                    b = Number(sPop(stack, new_inp));
                    a = sPop(stack, new_inp);
                    stack.push(a.slice(0, b));
                    break;
                case "r":
                    b = Number(sPop(stack, new_inp));
                    a = sPop(stack, new_inp);
                    stack.push(a.slice(b, a.length));
                    break;
                case "s":
                    a = sPop(stack, new_inp);
                    stack.push(Math.floor(a));
                    break;
                case "t":
                    a = sPop(stack, new_inp);
                    stack.push(Math.ceil(a));
                    break;
                case "u":
                    a = sPop(stack, new_inp);
                    stack.push(Math.round(a));
                    break;
                case "v":
                    charmode = true;
                    break;
                case "w":
                    stack.push(16);
                    break;
                case "x":
                    stack.push(32);
                    break;
                case "y":
                    stack.push(64);
                    break;
                case "z":
                    stack.push(128);
                    break;
            }
        }
    }
    return stack.map(String)
        .join("\n");
}
