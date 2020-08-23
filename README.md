## Integral
Integral is a new stack-based golfing language invented by [nph](https://codegolf.stackexchange.com/users/95627/nph).

## Example programs
Let's start with a few sample programs, to showcase the language.
### Hello, World!
```
⌡Hello, World!
```
Unlike most stack-based golfing languages, the quote delimiter is non-ASCII(`⌡`), which brings in a lot of convenience, because you'll never need to escape the quote when you're trying to enter an ASCII character.

In Integral, the entire stack is automatically outputted, joined by newlines. Also, when you have a string literal at the end of the program, you can leave out the ending quotation mark and it will be automatically inserted.

Even shorter:
```
÷▄llo,▒╦ld!
```

Integral uses an optimized 130 word dictionary to optimally compress any occurance of characters. Wrapping your text in `÷` instead of `⌡` tells the interpreter to automatically decompress the string. And like `⌡` s, if you have a `÷` at the end of a program, you can leave it off.

## Quine
```
⌡^♦►◙►⌡^♦►◙►
```
This is what the program does behind the scenes:
```
⌡^♦►◙►⌡      Push "^♦►◙►"
       ^     Push "⌡"
        ♦    Swap. Stack: ["⌡", "^♦►◙►"]
         ►   Concatenate: stack: ["⌡^♦►◙►"]
          ◙  Duplicate. stack: ["⌡^♦►◙►", "⌡^♦►◙►"]
           ► Concatenate; stack: ["⌡^♦►◙►⌡^♦►◙►"]

Implicit output at the end of the program
```

## FAQ
### Why is it xx bytes? Shouldn't it be yy bytes?
Like most modern golfing languages, which encode an SBCS codepage, Integral encodes the CP437 codepage, in which every character is always a byte. If you want to take a look at the entire codepage, you can go to [constants.js](https://github.com/A-ee/integral/blob/master/constants.js). So, don't be surprised when the code length in UTF-8 is different than the shown code length!

### Why does the interpreter not work?
If anything doesn't work in the online interpreter, try refreshing the interpreter, to clear your browser cache. This works

Also, if you opened https://a-ee.github.io/integral/, that might be another reason that your answer doesn't work. Use https://nph278.github.io/integral/ - that interpreter is more stable, and has a higher change of working out.

If it still doesn't work in https://nph278.github.io/integral/, feel free to raise an issue to the interpreter. Or, if you aren't the post writer, please write a comment to mention the problem.

## Online interpreter tips! (pretty self-explanatory)
* You can press the Dark mode button to switch to dark mode, if you prefer dark mode over light mode (like how @nph did in [their website](https://nph278.github.io/)).
* You can have several different test cases by separating them with two newlines. The inputs separated by these two newlines execute by themselves. Try it: [`►` (1 bytes)](https://a-ee.github.io/integral/?code=EA&input=1%0A2%0A%0A4%0A4%0A%0A2%0A4)
* If you are looking for the SE post template button, you might be surprised that it doesn't exist. However, evidently, you can see that the SE post template is right next to the code buffer!
* You can use the bottom bar to conveniently encode integers and strings.

## Links
A tutorial might happen sometime...

* [Integral Chat](https://chat.stackexchange.com/rooms/111375/integral)
* [Online interpreter link](https://nph278.github.io/integral/)
* [Instruction reference](https://github.com/nph278/integral/blob/master/docs/instructions.txt)
* [Language Showcase](https://codegolf.stackexchange.com/a/208978/96495)
