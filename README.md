# project-calculator
A simple calculator web page using HTML, CSS, JS

Style modeled after old school calculators. Js event
listeners add/remove responsive click styling on
num pad and operator btns.

Can compute long strings of input: executes operations
one at a time, that is, two operands and their joining
operator at a time. Running total becomes the first operator
in any sequence of 2 or more operations.
(This means that order of operations is *not* followed. First
entered is first computed. Ex: 12 + 7 - 5 * 3 = 42)

Should the computing input contain division by 0 anywhere in
the sequence, a math meme gif plays in the display along with
x files theme audio.

The equals btn remains styled as 'pressed/clicked' to indicate
execution of input and to encourage clearing and starting over.
However, the running total remains and further calculations can
be made.

Contents: index.html, styles.css, main.js, xFilesTheme.mp3