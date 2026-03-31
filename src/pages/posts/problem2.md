---
layout: '../../Layouts/PostLayout.astro'
title: 'An expected problem.'
pubDate: 2026-03-31
description: 'Expected value dp'
author: 'Santiago López'
tags: ["DP", "Probability", "CP"]
---

Here's the new problem!

# Problem

Given the success probability on step $i$ compute the expected value of the squared sum of the maximal lengths of success blocks in the sequence

_Problem taken from  <a href = "https://codeforces.com/group/WJMaozvXdX/contest/680294/problem/E" >Codeforces</a> and solution by <a href="https://codeforces.com/profile/dani_iel"> dani_iel </a>._

## Solution

If you're not familiar with dissecting expected value problems I highly recommend you to visit <a href="https://brilliant.org/wiki/linearity-of-expectation/">Brilliant Wiki</a> about this topic, is pure gold.

Let,

1. $X:=$ "Game score" be a random variable

2. $B_{i,k}:=$ "It does start a maximal block of size $k$ at position $i$" be an indicator variable.

I want you to try this approach and see what happens.

I ended up needing to use FFT to compute my expected value, a bit insane tbh.

So let's try to solve the problem for the prefix and extend the solution (DP)!

Let,

1. $X_i:=$ "Game score for the prefix of size $i$".

For taking those from definition to formula think on these 2 things:

1. Imagine they're not random variables and you've actually computed their values.

2. Encode your logic using indicator variables.

Let's see these tips in action. Starting for base case we think on $X_0$. 

What's the expected value for size 1? Let $s_i:=$ "Success in position $i$" (Of course we know $P(s_i) = p_i$). So we have:


$$
\begin{align*}
    X_0 &= 1_{s_0}\cdot 1+ (1-1_{s_0}) \cdot 0\\
    &= 1_{s_0}
\end{align*}
$$

therefore,

$$
\begin{align*}
E[X_0] = P(s_0) = p_0
\end{align*}
$$

Again, if it's not clear to you up to this point check Brillant entry. 

How could we extend the score? We need 2 things, the last score AND (this is important) the length of the last block.

Why? Because we analyze a simple recursion on $X_i$. If we don't succeed at position $i+1$, $X_{i+1} = X_i$, but if we succeed we'll have $X_i = z + l^2$ where $l$ is the length of the last block and $z$ is everything else. So $X_{i+1} = z + (l+1)^2$. And here the extension observation is algebra:

$$
\begin{align*}
    (l+1)^2 - l^2 &= l^2 + 2l +1 - l^2\\
    &=2l+1
\end{align*}
$$

So we have $X_{i+1} = z + l^2 + 2l + 1 = X_i + 2l +1$ in the case of success. But again, $X$ is a random variable and we are using $l$ as if we had it computed. Before seeing how we'll deal with $l$ let summarize what we have until now:

$$
    X_{i+1} = 1_{s_{i+1}} (X_i+ 2l + 1) + (1-1_{s_{i+1}})X_i
$$

Let that sink in for a moment. We've encoded our logic with indicator variables and assumed $X_i,l$ were an actual variable. When we take expectation we have:

$$
    E[X_{i+1}] = p_{i+1} (E[X_i]+ 2E[l] + 1) + (1-p_{i+1})E[X_i]
$$

So it seems that $l$ is like a random variable, so let's define it and see where it takes us.

Let $L_i:=$ "Last block length for the game in the prefix of size $i$". Fine! Let's apply the tools we've used until now trying to reduce $L_i$ as a recursion not depending on other random variables.

If we success at first position we'll have a length of $1^2 = 1$, otherwise 0. That is:

$$
\begin{align*}
L_0 &= 1_{s_0}\cdot 1 + (1-1_{s_0}) \cdot 0\\
 &= 1_{s_0}\\
E[L_0] &= p_0
\end{align*}
$$

And how do we extend it? That's even cleaner than $X_i$ transition. If we got succes $L_{i+1} = L_{i} + 1$ else $L_{i+1} = 0$. Translating we have:

$$
\begin{align*}
    L_{i+1} &= 1_{s_{i+1}} (1 + L_i) + (1 - 1_{s_{i+1}}) \cdot 0 \\
    &= 1_{s_{i+1}} (1 + L_i) \\
    E[L_{i+1}] &= p_{i+1} (1 + E[L_i])
\end{align*}
$$

So we got it! We precompute $L_i$ in $O(n)$ and then $X_i$ in $O(n)$. Here's my implementation:

```cpp
/*
    Author: sankiago
    SPES RESURRECTIONIS MORTUORUM
*/

#include <bits/stdc++.h>
using namespace std;

#define int long long
#define vi vector<int>
#define vb vector<bool>
#define ii pair<int,int>
#define ff first
#define ss second
#define endl "\n"
#define ld long double
#define vld vector<ld>

int32_t main(){
    
    cin.tie(0); cout.tie(0);
    ios::sync_with_stdio(0);

    int n; cin >> n;
    vld p(n);
    for ( int i = 0 ; i < n ; i++ ) cin >> p[i];
    
    vld r(n,0);
    r[0] = p[0];
    for ( int i = 0 ; i < n-1 ; i++ ){
        r[i+1] = (r[i] + 1) * p[i+1];
    }

    vld x(n,0);
    x[0] = r[0];
    for ( int i = 0 ; i < n-1 ; i++ ){
        x[i+1] = p[i+1] * ( x[i] + 2*r[i] + 1 ) + (1 - p[i+1]) * x[i];
    }

    cout << setprecision(7) << fixed << x[n-1] << endl;

}
```



