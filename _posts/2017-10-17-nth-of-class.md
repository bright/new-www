---
layout: post
title: Simulating nth-of-class CSS selector
tags: css
comments: true
hidden: true
author: agnieszka
---
My experience with frontend web development is not long yet, nevertheless, I have already got stacked a few times and spend like a few hours trying to find one perfect solution. I reckon that some of them are worth describing. 

![Image](/images/nth-of-class/image1.jpeg){: .center-image}

I have a list of HTML tags in which a few first have a certain class while the others don‘t. What I want to achieve is styling the last element having the class.
If you look for a pure CSS solution with no JavaScript and no changes in your HTML, I have some bad news: there is no such. Of course, you shouldn‘t believe me and look for it on your own. But if you happen to find one, please come back and feel free to comment. And if you fail, read on and see if one of the below solutions might suit you.

The initial case was to add a separator between _&lt;li>_ tags. This is pretty easy:
```css
li:not(:last-of-type) {
    border-bottom: 1px solid black;
}
```
Now, to make it more complicated, some of the elements are initially hidden and might be turned to visible on a button click. The hidden elements have class _hidden_. Quite natural for me was to add the class selector and have:
```css
li:not(.hidden):not(:last-of-type) {
    border-bottom: 1px solid black;
}
```
To my surprise, it didn‘t work. It turned out that a selector like li.hidden:last-of-type selects _the last element of type li if it happened to have class hidden_ and not _the last element of type li and class hidden._ A subtle difference, right?

The solution to my problem was actually straightforward – adding the top border instead of the bottom one was a way to go. After all, the hidden elements are hidden and so are their borders.
```css
li:not(:first-of-type) {
    border-top: 1px solid black;
}
```
Using adjacent sibling selector is even more readable.
```css
li + li {
    border-top: 1px solid black;
}
```

And this could be the end. I have found a solution to my problem, committed, pushed and deployed. But what if I really needed to style that last element of the class? Is there a way to do that? As already said, no. At least not yet.

In the [Selectors Level 4 Editor‘s Draft](https://drafts.csswg.org/selectors-4/#the-nth-child-pseudo) there is the newest version of nth-child pseudo class described. It introduces an optional clause of S which filters out the children to only the ones matching the S selector. This is only a draft yet and as so shouldn‘t be used in any production code - check [caniuse.com](https://caniuse.com/#search=nth-child) for browsers support.
Confirmed to work in Safari, which already supports it:
```css
li:nth-last-child(1 of li:not(.hidden)){
    border-top: 1px solid black;
}
```

What can we do now? Unfortunately, the answer is: break one of the rules we have previously established.
1. Break the „no changes in HTML“ rule, i.e. divide the elements into two separate lists: one with the elements always visible and one with the hidden ones.
2. Break the „no JavaScript“ rule and just use JavaScript, i.e. using jQuery: 
```javascript
$("li:not(.hidden):last").addClass("last-not-hidden")
```

OK, to be honest, I have found one „pure css solution“, but for me it‘s neither pure nor a solution, just a really strange walk around. [Take a look]( https://stackoverflow.com/questions/1817792/is-there-a-previous-sibling-css-selector/36118012#36118012), you might find it at least interesting.

So this is it. No clear and nice solutions. I‘m lucky that I do not need to have this solved in any real projects, and how about you? How have you handled such a case?

