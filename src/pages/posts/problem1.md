---
layout: '../../Layouts/PostLayout.astro'
title: 'Building non-divisible set.'
pubDate: 2025-12-19
description: 'An intersting constructive problem'
author: 'Santiago López'
tags: ["Computing", "Number Theory"]
---

Let $n$ be an integer. Build a set $S \subseteq [1,4n]$ of size $n$ such as for every $x,y \in S$ it holds $(x,y) \neq 1$, $x \not | y$ and $y \not | x$.

Problem taken from  <a href = "https://codeforces.com/contest/1443/problem/A" > here</a> and solution <a href="https://codeforces.com/blog/entry/84298?#comment-718339"> here </a>. 

How could we approach this?. Let's try for some $n$ and we'll look for a pattern or observation.

- $n=2$. 
    
    Therefore we have

    $$
    [1,4\cdot 2] = \{1,2,3,4,5,6,7,8\}
    $$
    
    What happens if $1\in S$? It clearly makes impossible to choose other number (1 divides everything). What happens if $2\in S$? We can't choose other even numbers. What happens if $3 \in S$? We can't choose $3k$ $(k>1)$ numbers.

    By simple inspection we see that $2,3$  don't divide each other but $(2,3) = 1$. So we can fix the gcd by multiplying these numbers by 2. So we have $(4,6) = 2$ and $4\not|6$ and conversely. 

So we make an interesting observation, the smallest $gcd$ is clearly 2, so we're gonna look only even numbers. 

Let's consider the condition that forbids division between any $x,y \in S$. So we have $\frac{x}{y} \notin \Z$, nothing interesting. But if we examine the complement of this condition we have that $\frac{x}{y} = 1,2,3,..$ and fixing $y$ we realize that from $x$ and $2x$ there's no mutually divisible numbers why is it? because $2x$ is the smallest multiple and $2(x+1)$ is clearly greater than $2x$.

 If $x=2$ we have $2,3$, with $x=3$ we'll have $3,4,5$ ans so on. We can have $n$ nondivisible-betweem-them numbers considering $n,n+1,...,2n-1$!! BUT they are not all even. What can we do? ez, multiply them by two. So we'll have $S  = \{2k : k\in  [n,2n-1]\}$