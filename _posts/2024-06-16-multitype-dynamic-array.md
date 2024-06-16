---
layout: post
title: Making A Multi-Type Vector In C
tags: [Computer Science, Programming, Data Structures]
comments: true
mathjax: true
author: mintsuku
social-share: false
---

C does not have built in Vector Arrays, let alone ones that can hold multiple types, and as a project I decided to implement one. Vectors are simply dynamically allocated arrays, which means that unlike a regular array (in which it is a fixed size that cannot be extended nor shruken), It's size is not fixed, and can be extended or shrunken. This is very useful if you don't know how many elements you need to store at any given time. A Multi Type dynamically allocated array is the same thing, except for the obvious fact that you may store many different types of data inside of the array. I will give a crash course (with visuals) on both how memory works and the memory layout of an array, as well as how an array works. 

