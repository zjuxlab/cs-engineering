---
title: DPM-Solver
slug: DPM-Solver
sidebar_position: 2
---


# DPM-Solver

Author：陈哲恺

## Denoting Diffusion Probabilistic Model (DDPM)

![](/assets/XaQ6bu8HIolSakxVWHOcpFoHnYx.png)

- The differences between VAE and Diffusion
    - VAEs: Learn models by "<b>searching</b>", both $p_\theta$ and $q_\theta$
    - Diffusion models: Learn by "<b>imitating</b>" a fixed forward process $q$

- MSE Loss

  $\mathcal{L}=\frac{1}{2}\int_0^Tw(t)\mathbb{E}_{q_0(x_0)}\mathbb{E}_{q(\varepsilon)}[||\epsilon_\theta(x_t,t)-\epsilon||_2^2]dt$

- Convergence guarantee

  For large enough $T$, the reverse process is indeed Gaussian

## Two Types of Diffusion Probabilistic Models

### From noise to data

![](/assets/PC1bbYVveojPEGxXReDcjEELnfd.png)

### From SDE to ODE

Starting from the distribution $q_0(x_0)$, define the distribution through the following SDE at time $t$ as $q_t(x_t)$

- Forward SDE

  $dx_t=f(x_t,t)dt+g(t)dw_t$

- Forward ODE

  $\frac{dx_t}{dt}=f(x_t,t)-\frac{1}{2}g(t)^2\nabla_x\log q_t(x_t)$, it has the same marginal distribution $q_t(x_t)$ at each $t$

### Summary

- Diffusion SDEs

  $dx_t=[f(t)x_t+\frac{g^2(t)}{\sigma_t}\epsilon_\theta(x_t,t)]dt+g(t)d\overline{w_t}$,        $x_T\sim\mathcal{N}(0,\overline{\sigma}^2I)$

  <em>DDPM</em>:                     first-order diffusion SDEs

  <em>Analytic-DPM</em>:        diffusion SDEs

- Diffusion ODEs:

  $\frac{dx_t}{dt}=f(t)x_t+\frac{g^2(t)}{2\sigma_t}\epsilon_\theta(x_t,t)$,        $x_T\sim\mathcal{N}(0,\overline{\sigma}^2I)$

  <b>Deterministic</b>: no more noises, Generally faster than SDE

  <b>Invertible</b>: The encoded noise can be used for downstream tasks, such as inpainting

  <em>DDIM</em>:                       first-order diffusion ODEs

## DPM-Solver

ODE:<b> </b>$\frac{dx_t}{dt}=f(t)x_t+\frac{g^2(t)}{2\sigma_t}\epsilon_\theta(x_t,t)$,        $x_T\sim\mathcal{N}(0,\overline{\sigma}^2I)$

Where $\epsilon_\theta(x_t,t)$ is a result of the neural network

> DDPM: 200~1000 steps

> DDIM: ~100 steps

### Traditional Runge-Kutta

$$x_t=x_s+\int_s^t\underbrace{(f(\tau)x_\tau+\frac{g^2(\tau)}{2\sigma_\tau}\epsilon_\theta(x_\tau,\tau))}_{h_\theta(x_t,t)}d\tau$$

set $h_\theta(x_t,t)$ as a "<b>black block</b>" function, lose the known information $f$ and $g$

cannot converge for $<20$ steps

### Improvement

Totally, replace the $h_\theta(x_t,t)$ with a more precise function

#### Observation1: Exactly Computing the Linear Part

The linear part $f(t)x_t$ can be transformed into a certain part

by using <b>"variation of constants" formula</b>

$$\Rightarrow\;x_t=\underbrace{e^{\int_s^tf(\tau)d\tau}x_s}_{Exactly\ Computed}+\int_s^t(e^{\int_s^tf(\tau)d\tau}\frac{g^2(\tau)}{2\sigma_\tau}\epsilon_\theta(x_\tau,\tau))d\tau$$

#### Observation2: Simplifying by log-SNR

Swap the variables

$$q_{0t}(x_t|x_0)=\mathcal{N}(x_t\alpha(t)x_0,\sigma^2(t)I)$$

define <em>signal-to-noise-ratio(</em><b>SNR</b><em>)</em> $\alpha^2_t/\sigma^2_t$

Define $\lambda_t := \log(\alpha_t/\sigma_t)$ (half of log-SNR)

Then we can transform $f$ and $g$: $\left\{ \begin{array}{l} f(t)&=&\frac{d\log\alpha_t}{dt}\\g^2(t)&=&-2\sigma_t^2\frac{d\lambda_t}{dt} \end{array} \right.$

by using <b>"change-of-variable" formula</b>

$$\Rightarrow\;x_t=\frac{\alpha_t}{\alpha_s}x_s-\alpha_t\int_{\lambda_s}^{\lambda_t}e^{-\lambda}\hat{\epsilon}_\theta(\hat{x}_\lambda,\lambda)d\lambda$$

All we need to do is to approximate the exponentially weighted integral

#### Designing High-Order Solvers for Diffusion ODEs

Using Taylor for $\hat{\epsilon}_\theta(\hat{x}_\lambda,\lambda)$

$$\Rightarrow\;x_{t_{i-1}\rightarrow t_i}=\frac{\alpha_{t_i}}{\alpha_{t_{i-1}}}\hat{x_{t_{i-1}}}-\alpha_{t_i}\sum_{n=0}^{k-1}\underbrace{\hat{\epsilon}_\theta^{(n)}(\hat{x}_{\lambda_{t_{i-1}}},\lambda_{t_{i-1}})}_{Derivatives}\underbrace{\int_{\lambda_{t_{i-1}}}^{\lambda_{t_i}}e^{-\lambda}\frac{(\lambda-\lambda_{t_{i-1}})^n}{n!}d\lambda}_{Coefficients}+O(h_i^{k+1})$$

#### Observation3: Exactly Computing the Coefficients

$$\begin{array}{l}\int_{\lambda_{t_{i-1}}}^{\lambda_{t_i}}e^{-\lambda}\frac{(\lambda-\lambda_{t_{i-1}})^n}{n!}d\lambda &=-\int_{\lambda_{t_{i-1}}}^{\lambda_{t_i}}\frac{(\lambda-\lambda_{t_{i-1}})^n}{n!}d(e^{-\lambda})\\ &=(-\frac{(\lambda-\lambda_{t_{i-1}})^n}{n!}e^{-\lambda})|_{\lambda_{t_{i-1}}}^{\lambda_{t_i}}+ \int_{\lambda_{t_{i-1}}}^{\lambda_{t_i}}e^{-\lambda}\frac{(\lambda-\lambda_{t_{i-1}})^{n-1}}{(n-1)!}d\lambda\\ &=\cdots \end{array}$$

<b>Repeatedly applying </b>$n$<b> times of integration-by-parts</b>

#### Observation4: Approximating Derivatives without Autograd

$$\hat{\epsilon}_\theta^{(1)}(\hat{x}_{\lambda_{t_{i-1}}},\lambda_{t_{i-1}})\approx\frac{\hat{\epsilon}_\theta(\hat{x}_{\lambda_{s_i}},\lambda_{s_i})-\hat{\epsilon}_\theta(\hat{x}_{\lambda_{t_{i-1}}},\lambda_{t_{i-1}})}{\lambda_{s_i}-\lambda_{t_{i-1}}}$$

Only function evaluation for $\hat{\epsilon}_\theta$ <b>without applying autograd</b>

### Summary

$$x_{t_{i-1}\rightarrow t_i}=\underbrace{\frac{\alpha_{t_i}}{\alpha_{t_{i-1}}}\hat{x}_{t_{i-1}}}_{Linear\ term}+\alpha_{t_i}\sum_{n=0}^{k-1}\underbrace{\hat{\epsilon}_\theta^{(n)}(\hat{x}_{\lambda_{t_{i-1}}},\lambda_{t_{i-1}})}_{Derivatives}\underbrace{\int_{\lambda_{t_{i-1}}}^{\lambda_{t_i}}e^{-\lambda}\frac{(\lambda-\lambda_{t_{i-1}})^n}{n!}d\lambda}_{Coefficients}+\underbrace{O(h_i^{k+1})}_{High-order\ errors}$$

The <em>Linear term</em>, <em>Corfficients</em> both can be exactly computed, and the <em>High-order errors</em> can be omitted.

So we <b>only</b> approximate the terms about the neural network, which can lead to higher precision

> If set $k=2$, then it is the same with <em>DDIM</em>

![](/assets/ZY5xbNWnCo3jHjxE1Bock4wXnQh.png)

## Result

15~20 steps

No more cost

# DPM-Solver++: Fast Solver for ==Guided Sampling== of Diffusion Probabilistic Models

## (Conditional) Guided Sampling by DPMs

![](/assets/WOPibXN3zocvNVxwzigcbdkLnRf.png)

## DPM-Solver++

![](/assets/FBvAbjBM0o7UU8xbvPDc61ean3b.png)

