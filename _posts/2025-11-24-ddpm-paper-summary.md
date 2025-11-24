---
layout: post
title: "Paper Summary: Denoising Diffusion Probabilistic Models"
published: false
categories: [paper-notes, deep-learning, diffusion]
mathjax: true
---

# 1. Paper Overview
_Starter:_  
This paper is about **…**  
It addresses the problem of **…**  
The authors propose a method that **…**  
The core motivation is **…**

Add 1–2 sentences explaining why this paper matters in ML, traffic simulation, robotics, etc.

---

# 2. Key Contributions
_Starter:_  
The paper claims the following contributions:

1. **…** (write the first)
2. **…** (write the second)
3. **…** (optional)
4. **…** (optional)

_Brief list ONLY. Full explanations go later._

---

# 3. Problem Formulation
_Starter:_  
The authors formalize the problem as **…**  
The input data is **…**  
The output the model tries to predict is **…**  
The learning objective is **…**

Add assumptions if the paper mentions any.

---

# 4. Method / Model Architecture  
## 4.1 Overview (Intuition first)
_Starter:_  
At a high level, the model works by **…**  
The architecture contains components such as **…**  
Each component plays the role of **…**

## 4.2 Detailed Components
_Starter:_  
- **Forward process:** This section describes **…**  
- **Reverse process:** This part explains **…**  
- **Noise schedule:** The paper uses **…**  
- **Neural network backbone:** The authors choose **…**  
- **Training objective:** The objective is **…**

Include diagrams or images here, e.g.:

{% raw %}{% include paper_diagram.html
   src="/assets/images/ddpm-forward-reverse.png"
   alt="Forward and reverse diffusion"
   caption="High-level view of the forward and reverse processes."
%}{% endraw %}

---

# 5. Key Equations (with MathJax)
_Starter:_  
The forward diffusion process is defined as:

$$
q(x_t \mid x_{t-1}) = \mathcal{N}(\sqrt{\alpha_t}x_{t-1}, (1-\alpha_t)I)
$$

The reverse denoising process is:

$$
p_\theta(x_{t-1} \mid x_t) = \mathcal{N}(\mu_\theta(x_t, t), \sigma_t^2 I)
$$

The training loss is:

$$
L = \mathbb{E}_{x_0, \epsilon, t}\big[ \| \epsilon - \epsilon_\theta(x_t, t)\|^2 \big]
$$

_Starter instructions:_  
- Write equations exactly as in the paper  
- Add one sentence per equation explaining **what the equation does**  
- Not your opinion — just the meaning

---

# 6. Step-by-Step Explanation (My Own Words)
_Starter:_  
Here I explain the paper as if teaching a **junior PhD student**.

## 6.1 What the paper is really doing  
_Starter:_  
In simple language, the model **…**  
The forward process means **…**  
The reverse process exists because **…**

## 6.2 Why the model works  
_Starter:_  
This approach works because **…**  
The noise modeling helps **…**  
The denoising network learns **…**

## 6.3 Intuition behind the math  
_Starter:_  
The equations imply that **…**  
By rewriting the loss, we see **…**  
This helps the model because **…**

---

# 7. Algorithm (Pseudocode)
_Starter:_  
Below is a simplified, paper-faithful pseudocode:

```text
Algorithm 1: Training DDPM
Input: data x0, noise schedule αt
for each iteration do
  sample t ~ Uniform(1, T)
  sample noise ε
  compute xt = forward_diffuse(x0, t, ε)
  predict ε_θ(x_t, t)
  optimize model using MSE(ε, ε_θ)
end for
```

---

# 8. Python Implementation (Starter Code)

## 8.1 Forward Diffusion Process
```python
def forward_process(x0, t, alpha_t):
    """
    Starter:
    - Compute sqrt(alpha_t) * x_{t-1}
    - Add noise based on (1 - alpha_t)
    - Return x_t
    """
    # your code here
    return xt
```

## 8.2 Reverse Denoising Model

```python
def reverse_process(xt, t, model):
    """
    Starter:
    - Apply neural network epsilon_theta
    - Compute predicted mean of p(x_{t-1} | x_t)
    - Sample or return mean
    """
    # your code here
    return x_prev
```

## 8.3 Training Loop

```python
def train(model, data, schedule):
    """
    Starter:
    - Sample t
    - Generate xt
    - Predict noise
    - Compute loss
    - Backprop
    """
    # your code here
```

---

# 9. Experimental Setup (Optional)

_Starter:_  
The authors test on **…**  
They measure performance using **…**  
Important hyperparameters include **…**

---

# 10. Strengths & Weaknesses

_Starter:_  
**Strengths:**

- …
- …

**Weaknesses:**

- …
- …

Short bullets only — no essays.

---

# 11. Personal Notes / Insights

_Starter:_  
This paper made me realize that **…**  
One interesting detail is **…**  
A question I still have is **…**

---

# 12. References

_Starter:_

- Original paper: **Ho et al., 2020**
- Additional resources you used
- Blog posts or videos that helped

---

# 13. Related Work to Read Next

_Starter:_

- DDIM  
- Latent Diffusion  
- Score-based generative modeling  
- Variational diffusion models  

