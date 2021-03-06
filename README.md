# Integral

Integral is a new stack-based golfing language invented by [nph](https://codegolf.stackexchange.com/users/95627/nph).

## Example programs

Let's start with a few sample programs, to showcase the language.

### Hello, World

```
⌡Hello, World!
```

Unlike most stack-based golfing languages, the quote delimiter is non-ASCII(`⌡`), which brings in a lot of convenience, because you'll never need to escape the quote when you're trying to enter an ASCII character.

In Integral, the entire stack is automatically outputted, joined by newlines. Also, when you have a string literal at the end of the program, you can leave out the ending quotation mark and it will be automatically inserted.

Even shorter:

```
÷▄llo,▒╦ld!
```

Integral uses an optimized 130 word dictionary to optimally compress any occurrence of characters. Wrapping your text in `÷` instead of `⌡` tells the interpreter to automatically decompress the string. And like `⌡` s, if you have a `÷` at the end of a program, you can leave it off. `⌠` tells the interpreter to end a string, and automatically start a new one. `≤` works similarly but starts a compressed string.

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

### Why is it xx bytes? Shouldn't it be yy bytes

Like most modern golfing languages, which encode an SBCS codepage, Integral encodes the CP437 codepage, in which every character is always a byte. If you want to take a look at the entire codepage, you can go to [encoder.ts](ts/encoder.ts). So, don't be surprised when the code length in UTF-8 is different than the shown code length!

### Why does the interpreter not work

If anything doesn't work in the online interpreter, try refreshing the interpreter, to clear your browser cache.

If it still doesn't work in <https://nph278.github.io/integral/>, feel free to raise an issue to the interpreter. Or, if you aren't the post writer, please write a comment to mention the problem.

## Online interpreter tips! (pretty self-explanatory)

* You can have several different test cases by separating them with two newlines. The inputs separated by these two newlines execute by themselves. Try it: [`►` (1 bytes)](https://a-ee.github.io/integral/?code=EA&input=1%0A2%0A%0A4%0A4%0A%0A2%0A4)
* You can use the bottom bar to conveniently encode integers and strings.

## Links

A tutorial might happen sometime...

* [Online interpreter link](https://nph278.github.io/integral/)
* [Instruction reference](https://nph278.github.io/integral/docs/table.html)
* [Language Showcase](https://codegolf.stackexchange.com/a/208978/96495)

## Note about the old interpreter

The old interpreter source code by A-ee can be found in the [`old` tag](https://github.com/nph278/integral/releases/tag/old).
