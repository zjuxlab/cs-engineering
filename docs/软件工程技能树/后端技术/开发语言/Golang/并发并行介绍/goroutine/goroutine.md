---
title: goroutine
slug: goroutine
sidebar_position: 0
---


# goroutine

Author:NA

> 参考链接：
> https://www.zhihu.com/question/20862617
> https://studygolang.com/articles/33044
> https://blog.csdn.net/weixin_51546892/article/details/123050231

# Goroutine的优点

> 请你解释golang GMP调度模型的优点

Golang 的 GMP 调度模型具有以下优点：

1. <b>高效的协程管理</b>：
    - GMP 模型将 Go 程序中的并发任务抽象为协程（goroutine），协程相比于传统线程具有更小的内存占用和创建销毁成本。通过 GMP 模型，Go 可以高效地管理和调度数以百万计的协程，使得并发编程变得更加轻量和高效。

1. <b>全局运行队列和本地运行队列</b>：
    - M（Machine）和 P（Processor）中的调度器拥有自己的本地运行队列，同时还存在一个全局运行队列。这种双重队列机制允许任务在多个队列之间高效地分配和迁移，提高了调度的灵活性和任务分配的平衡性。

1. <b>工作窃取机制</b>：
    - 为了避免某些处理器（P）长时间空闲，Golang 的 GMP 调度模型采用了工作窃取机制。空闲的处理器可以从其他忙碌的处理器窃取任务，这样可以提高系统的整体利用率和任务执行的并行度，减少因任务不均匀分布而导致的资源浪费。

1. <b>调度器与操作系统线程分离</b>：
    - 在 GMP 模型中，G（Goroutine）是用户级的协程，P（Processor）表示调度器，M（Machine）是实际操作系统线程。GMP 模型将协程调度和系统线程解耦，使得 Go 可以在不直接依赖操作系统线程的情况下，高效地管理和调度大量的并发任务。

1. <b>自适应调度</b>：
    - Golang 的 GMP 调度器能够根据系统负载和协程执行情况，动态调整调度策略。这种自适应性使得 Golang 可以在不同的运行环境和负载下，始终保持较高的性能和资源利用率。

1. <b>避免死锁和资源竞争</b>：
    - 通过对全局资源的合理分配和调度，GMP 模型可以有效避免传统多线程编程中常见的死锁和资源竞争问题。每个协程都由调度器控制，不会因资源争夺而导致系统的不可预期行为。

1. <b>可扩展性和可维护性</b>：
    - GMP 模型设计简洁，扩展性强，开发者可以方便地理解和使用。同时，Golang 的调度器实现了自动调优和负载均衡，使得程序的可维护性大大提高。

综上所述，Golang 的 GMP 调度模型通过高效的协程管理、灵活的任务分配和自适应的调度策略，实现了高性能并发编程，同时保持了系统的可扩展性和易维护性。这些优点使得 Golang 在构建高并发、高性能的应用程序时，具有明显的优势。

---

> 为什么Goroutine占用比一般线程小？

Goroutine 相比于一般线程占用更小的原因可以归结为以下几个方面：

1. <b>栈内存占用更小</b>：
    - <b>初始栈空间</b>：Goroutine 的初始栈大小仅为几 KB（通常是 2 KB），而传统线程的初始栈大小通常为几 MB。Goroutine 的栈是动态增长的，只有在需要时才会分配更多的栈空间。
    - <b>动态增长</b>：Goroutine 的栈是动态扩展的，只有在栈空间不够用时才会增加，这与传统线程预先分配固定大块内存的做法不同。这样可以有效地减少内存占用。

1. <b>用户态实现</b>：
    - Goroutine 的调度是在用户态完成的，不需要频繁的内核态切换。传统线程的调度由操作系统内核负责，需要进行用户态和内核态的切换，这些切换操作不仅增加了开销，还需要额外的内核数据结构支持（如线程控制块），从而增加了内存占用。

1. <b>轻量级上下文切换</b>：
    - Goroutine 的上下文切换由 Go 运行时负责，所需保存和恢复的上下文信息非常少（如程序计数器和少量寄存器）。相比之下，传统线程的上下文切换需要保存更多的状态信息（如 CPU 寄存器、栈指针等），这不仅增加了切换开销，还需要更多的内存空间。

1. <b>运行时调度器优化</b>：
    - Go 语言的调度器对 Goroutine 进行了优化，可以高效地管理成千上万的 Goroutine。由于 Goroutine 是由 Go 运行时调度而不是操作系统内核调度，Go 运行时可以使用更轻量的调度算法和数据结构来管理 Goroutine，从而减少内存和 CPU 的占用。

1. <b>避免不必要的内存分配</b>：
    - 传统线程通常会为每个线程分配独立的线程局部存储（TLS），而 Goroutine 不需要这种独立的存储结构。Go 运行时通过智能的内存管理策略，避免了许多不必要的内存分配，从而进一步降低了 Goroutine 的内存占用。

总的来说，Goroutine 相比于传统线程占用更小的原因在于其初始栈空间小、栈内存动态增长、用户态实现的高效调度机制、轻量级的上下文切换以及优化的运行时调度器设计。这些特点使得 Goroutine 能够高效地支持大量并发任务，而不会带来传统线程所需的高额内存和系统开销。

# Goroutine的调度模型

## 关键概念

在Golang程序的调度中，有如下三个关键结构

- M：Method，系统线程
- P：Processor / Context，Goroutine运行上下文
    - 一个 P 对应一个“激活”的 Goroutine
    - 可以通过 `runtime.GOMAXPROCS(int)` 设定P的数量；数量默认为CPU核数

- G：每个Goroutine协程

---

此外，还有如下专用词汇

- spinning：自旋态；没有在执行任何任务的 M 称为 spinning
- park：睡眠；让一个M进入等待状态
- unpark：唤醒；让一个M从等待中恢复运行
- steal work：工作窃取；在M的空闲时，从其他M迁移一部分G到自己手里运行
- blocked：阻塞；线程因为等待系统调用而暂停运行

## GM模型和GPM模型

![](/assets/DhOTbZievoPOmLxG8TTcfNtVnib.png)

## GPM模型

一个M可以包含多个P，每个P包含多个G，其中一个激活运行，其他就绪等待

## 工作窃取算法概述

![](/assets/KtqAb5HVYoAEz4xsMqJce4Qun9i.png)

## Spinning算法概述

每当新任务被创建 或者 m被阻塞 或者 m从spinning状态退出时，如果有空闲的P，则确保至少还有一个spinning状态的m。因为只有在没有spinning的m时才唤醒m来spinning，而不是创建了新任务就唤醒m，这样就可以尽量减少park/unpark操作，同时这个spinning的m会去偷取那些忙于工作中的m的g和或者阻塞中的m的p来运行，确保上面提到的两种情况及时被处理。

## Golang内存模型

![](/assets/XenWbjoEIoOeNnxINuSc9Mlanhh.png)

![](/assets/Y4yebbyrRoCZzlxdsADcjumenKf.png)

# 读代码！

- 实现代码在 `$GOROOT/src/runtime/proc.go`
    - 以`go==1.19 Installed By MacOS homebrew`为例

- 为了简要说明运行流程，代码有删改

## 创建Goroutine

```go
// LINE 4086

// Create a new g running fn.
// Put it on the queue of g's waiting to run.
// `go func()` => `runtime.newproc(func)`
func newproc(fn *funcval) {
    systemstack(func() {
        newg := newproc1(fn, current_G, caller_PC)

        // runqput tries to put g on the local runnable queue.
        // If next is false, runqput adds g to the tail of the runnable queue.
        // If next is true, runqput puts g in the _p_.runnext slot.
        // If the run queue is full, runnext puts g on the global queue.
        // Executed only by the owner P.
        runqput(current_P, newg, runnext=true)

        if mainStarted {
            // Tries to add one more P to execute G's.
            // @see "## Spinning算法概述"
            wakep()
        }
    })
}

// Create a new g in state _Grunnable, starting at fn. callerpc is the
// address of the go statement that created this. The caller is responsible
// for adding the new g to the scheduler.
func newproc1(fn *funcval, callergp *g, callerpc uintptr) *g {
    _g_ := getg()

    // add semaphone on `m` to disable preemption
    acquirem() 

    _p_ := getg()

    // Get unused *g mem block from gfree list.
    // If local list is empty, grab a batch from global list.
    // returns nullptr if not found
    newg := gfget(_p_)

    if newg == nil {
        newg = allocg(_StackMin)
        newg.status = _Gdead
        allgs.add(newg) // publishes with a g->status of Gdead so GC scanner doesn't look at uninitialized stack.
    }

    // extra space in case of reads slightly beyond frame
    // ??? why ???
    totalSize := 4*goarch.PtrSize + sys.MinFrameSize
    sp := newg.stack.hi - totalSize

    initg(newg, with={sp, callerpc, callergp, fn})
    init_profiling_if_needed(newg)
    init_tracking_if_needed(newg) // set: whether we're tracking this G for sched latency statistics
    newg.status = _Grunnable
    init_gc(_p_, totalSize)
    newg.goid = next_goid(_p_)
    
    releasem(_g_.m)

    return newg
}
```

## 阻塞Goroutine

```go
// LINE 346
// Puts the current goroutine into a waiting state and calls unlockf on the
// system stack.
// If unlockf returns `false`, the goroutine is resumed; `true` for another schedule().
// Reason explains why the goroutine has been parked. 
func gopark(unlockf func(*g, unsafe.Pointer) bool, lock unsafe.Pointer, reason waitReason) {
        mp := acquirem()
        gp := mp.curg
        mp.waitlock = lock
        mp.waitunlockf = unlockf
        gp.waitreason = reason
        releasem(mp)

        // func mcall(fn func(*g))
        // mcall switches from the g to the g0 stack and invokes fn(g)
        // written by native asm
        mcall(park_m)
}


// LINE 3333
// park continuation on g0.
func park_m(gp *g) {
        _g_ := getg()

        gp.status = _Gwaiting

        // drop connection bwtween g and m
        dropg()

        if fn := _g_.m.waitunlockf; fn != nil {
                ok := fn(gp, _g_.m.waitlock)
                _g_.m.waitunlockf = nil
                _g_.m.waitlock = nil
                if !ok {
                        gp.status = _Grunnable
                        // Schedules gp to run on the current M.
                        execute(gp, true) // Schedule it back, never returns.
                }
        }
        schedule()
}

// dropg removes the association between m and the current goroutine m->curg (gp for short).
// Typically a caller sets gp's status away from Grunning and then
// immediately calls dropg to finish the job. The caller is also responsible
// for arranging that gp will be restarted using ready at an
// appropriate time. After calling dropg and arranging for gp to be
// readied later, the caller can do other work but eventually should
// call schedule to restart the scheduling of goroutines on this m.
func dropg() {
        _g_ := getg()

        setMNoWB(&_g_.m.curg.m, nil)
        setGNoWB(&_g_.m.curg, nil)
}
```

## 唤醒Goroutine

```go
// LINE 372
func goready(gp *g, traceskip int) {
        systemstack(func() {
                ready(gp, traceskip, true)
        })
}

// LINE 843
// Mark gp ready to run.
func ready(gp *g, traceskip int, next bool) {
        status := readgstatus(gp)

        // Mark runnable.
        _g_ := getg()
        mp := acquirem() // disable preemption because it can be holding p in a local var
        gp.status = _Grunnable
        runqput(_g_.m.p.ptr(), gp, next)
        wakep() // try to run a new P 
        releasem(mp)
}
```

## 调度器

## Overall

【调度器策略】

- workd stealing 机制：当前 M 没有 G，尝试去其他 M 绑定 P 中偷取 G
- hand off 机制：当前 M 因 G 进行系统调用阻塞时，M 释放 P，把去转移到其他空闲线程执行
- 抢占机制：在coroutine中要等待一个协程主动让出CPU才执行下一个协程，在Go中，一个goroutine最多占用CPU10ms，防止其他goroutine被饿死
- 全局runq：M 可以从全局 G 队列获 G

### 主动调度


```go
// LINE 316
// To abandon RUNNING status of current G
func Gosched() {
        checkTimeouts()
        mcall(goschedImpl)
}

// LINE 3358
// gp is the caller Goroutine
func goschedImpl(gp *g) {
        status := readgstatus(gp)

        gp.status = _Grunnable
        dropg()
        lock(&sched.lock)
        globrunqput(gp)
        unlock(&sched.lock)

        schedule()
}


// LINE 3177
// One round of scheduler: find a runnable goroutine and execute it.
// Never returns.
func schedule() {
        _g_ := getg()

        // TODO: understand locked g on m
        if _g_.m.lockedg != 0 {
                stoplockedm()
                execute(_g_.m.lockedg.ptr(), false) // Never returns.
        }

retry:
        pp := _g_.m.p.ptr()
        pp.preempt = false

        gp, inheritTime, tryWakeP := findRunnable() // blocks until work is available

        // This thread is going to run a goroutine and is not spinning anymore,
        // so if it was marked as spinning we need to reset it now and potentially
        // start a new spinning M.
        if _g_.m.spinning {
                resetspinning()
        }

        // TODO: understand sched.disable
        if sched.disable.user && !schedEnabled(gp) {
                // Scheduling of this goroutine is disabled. Put it on
                // the list of pending runnable goroutines for when we
                // re-enable user scheduling and look again.
                lock(&sched.lock)
                if schedEnabled(gp) {
                        // Something re-enabled scheduling while we
                        // were acquiring the lock.
                        unlock(&sched.lock)
                } else {
                        sched.disable.runnable.pushBack(gp)
                        sched.disable.n++
                        unlock(&sched.lock)
                        goto retry
                }
        }

        // If about to schedule a not-normal goroutine (a GCworker or tracereader),
        // wake a P if there is one.
        if tryWakeP {
                wakep()
        }
        if gp.lockedm != 0 {
                // Hands off own p to the locked m,
                // then blocks waiting for a new p.
                startlockedm(gp)
                goto retry
        }

        // Schedules gp to run on the current M.
        execute(gp, inheritTime)
}
```

### P Find G

```go
// LINE 2553
// Finds a runnable goroutine to execute.
// Tries to steal from other P's, get g from local or global queue, poll network.
// if no any work found the m stops to wait forever
func findRunnable() (gp *g, inheritTime, tryWakeP bool) {

        _g_ := getg()

        // The conditions here and in handoffp must agree: if
        // findrunnable would return a G to run, handoffp must start
        // an M.

retry:
        _p_ := _g_.m.p.ptr()

        // special cases for GC
        { ... }

        // now and pollUntil are saved for work stealing later,
        // which may steal timers. It's important that between now
        // and then, nothing blocks, so these numbers remain mostly
        // relevant.
        now, pollUntil, _ := checkTimers(_p_, 0)

        // Try to schedule a GC worker.
        { ... }

        // Check the global runnable queue once in a while to ensure fairness.
        // Otherwise two goroutines can completely occupy the local runqueue
        // by constantly respawning each other.
        if _p_.schedtick%61 == 0 && sched.runqsize > 0 {
                return some_g_from_global_runq()
        }

        // Wake up the finalizer G.
        { ... }

        // find in local runq
        if gp, inheritTime := runqget(_p_); gp != nil {
                return gp, inheritTime, false
        }

        // find in global runq
        if sched.runqsize != 0 {
                return some_g_from_global_runq()
        }

        // If some netpoll IO is ready,
        // schedule to run that g
        { ... }

        // Spinning Ms: steal work from other Ps.
        //
        // Limit the number of spinning Ms to half the number of busy Ps.
        // This is necessary to prevent excessive CPU consumption when
        // GOMAXPROCS>>1 but the program parallelism is low.
        procs := uint32(gomaxprocs)
        if _g_.m.spinning || 2*atomic.Load(&sched.nmspinning) < procs-atomic.Load(&sched.npidle) {
                if !_g_.m.spinning {
                        _g_.m.spinning = true
                        sched.nmspinning++
                }

                gp, inheritTime, tnow, w, newWork := stealWork(now) // IMPORTANT!
                now = tnow
                if gp != nil {
                        // Successfully stole.
                        return gp, inheritTime, false
                }
        }

        // We have nothing to do.
        //
        // If we're in the GC mark phase, can safely scan and blacken objects,
        // and have work to do, run idle-time marking rather than give up the P.
        if gcBlackenEnabled != 0 && gcMarkWorkAvailable(_p_) && gcController.addIdleMarkWorker() {
                if !gcBgMarkWorkerPool.empty() {
                        // return the gc mark worker
                        return ...
                }
        }

        // current P has no any work to dy
        // so add it to idle-P-list
        now = pidleput(_p_, now)
        unlock(&sched.lock)

        // Delicate dance: thread transitions from spinning to non-spinning
        // state, potentially concurrently with submission of new work. We must
        // drop nmspinning first and then check all sources again (with
        // #StoreLoad memory barrier in between). If we do it the other way
        // around, another thread can submit work after we've checked all
        // sources but before we drop nmspinning; as a result nobody will
        // unpark a thread to run the work.
        //
        // This applies to the following sources of work:
        //
        // * Goroutines added to a per-P run queue.
        // * New/modified-earlier timers on a per-P timer heap.
        // * Idle-priority GC work (barring golang.org/issue/19112).
        //
        // If we discover new work below, we need to restore m.spinning as a signal
        // for resetspinning to unpark a new worker thread (because there can be more
        // than one starving goroutine). However, if after discovering new work
        // we also observe no idle Ps it is OK to skip unparking a new worker
        // thread: the system is fully loaded so no spinning threads are required.
        // Also see "Worker thread parking/unparking" comment at the top of the file.
        wasSpinning := _g_.m.spinning
        if _g_.m.spinning {
                _g_.m.spinning = false

                // Note the for correctness, only the last M transitioning from
                // spinning to non-spinning must perform these rechecks to
                // ensure no missed work. We are performing it on every M that
                // transitions as a conservative change to monitor effects on
                // latency. See golang.org/issue/43997.

                // Check all runqueues once again.
                { ... }

                // Check for idle-priority GC work again.
                { ... }

                // Finally, check for timer creation or expiry concurrently with
                // transitioning from spinning to non-spinning.
                //
                // Note that we cannot use checkTimers here because it calls
                // adjusttimers which may need to allocate memory, and that isn't
                // allowed when we don't have an active P.
                pollUntil = checkTimersNoP(allpSnapshot, timerpMaskSnapshot, pollUntil)
        }

        // Poll network until next timer.
        // If some netpoll IO is ready,
        // dispatch them
        { ... }

        stopm() // till awaken
        goto retry
}

// netpoll checks for ready network connections.
// Returns list of goroutines that become runnable.
// delay < 0: blocks indefinitely
// delay == 0: does not block, just polls
// delay > 0: block for up to that many nanoseconds
func netpoll(delay int64) gList

// injectglist adds each runnable G on the list to some run queue,
// and clears glist. If there is no current P, they are added to the
// global queue, and up to npidle M's are started to run them.
// Otherwise, for each idle P, this adds a G to the global queue
// and starts an M. Any remaining G's are added to the current P's
// local run queue.
// This may temporarily acquire sched.lock.
// Can run concurrently with GC.
func injectglist(glist *gList)

// Stops execution of the current m until new work is available.
// Returns with acquired P.
func stopm()
```

### Steal Work

按随机的顺序，从各个P中搜索，如果有可用的G，就拿一半过来执行

```go
// LINE 2897
// stealWork attempts to steal a runnable goroutine or timer from any P.
//
// If newWork is true, new work may have been readied.
//
// If now is not 0 it is the current time. stealWork returns the passed time or
// the current time if now was passed as 0.
func stealWork(now int64) (gp *g, inheritTime bool, rnow, pollUntil int64, newWork bool) {
        pp := getg().m.p.ptr()

        ranTimer := false

        const stealTries = 4
        for i := 0; i < stealTries; i++ {
                stealTimersOrRunNextG := i == stealTries-1

                for _, p2 := range shuffled(allp) {
                        pos := indexof(p2, allp)

                        // steal timers before steal runnext
                        // why branch for last round ???
                        if stealTimersOrRunNextG  {
                                tnow, w, ran := checkTimers(p2, now)
                                { ... }
                        }

                        // try to steal from p2
                        if gp := runqsteal(pp, p2, stealTimersOrRunNextG); gp != nil {
                                return gp, false, now, pollUntil, ranTimer
                        }
                }
        }

        // No goroutines found to steal. Regardless, running a timer may have
        // made some goroutine ready that we missed. Indicate the next timer to
        // wait for.
        return nil, false, now, pollUntil, ranTimer
}

// LINE 6010
// Steal half of elements from local runnable queue of p2
// and put onto local runnable queue of p.
// Returns one of the stolen elements (or nil if failed).
func runqsteal(_p_, p2 *p, stealRunNextG bool) *g {
        t := _p_.runqtail
        n := runqgrab(p2, &_p_.runq, t, stealRunNextG)
        if n == 0 {
                return nil
        }
        n--
        gp := _p_.runq[(t+n)%uint32(len(_p_.runq))].ptr()
        if n == 0 {
                return gp
        }
        h := atomic.LoadAcq(&_p_.runqhead) // load-acquire, synchronize with consumers
        
        atomic.StoreRel(&_p_.runqtail, t+n) // store-release, makes the item available for consumption
        return gp
}
```

### Handoff

当前 M 因 G 进行系统调用而阻塞时，M 释放 P，把 P 转移到其他空闲 M 执行

```go
// LINE 3704
func entersyscallblock() {
        ...
        systemstack(entersyscallblock_handoff)
}

func entersyscallblock_handoff() {
        pp := releasep() // Disassociate p and the current m.
        handoffp(pp)
}

// LINE 2346
// Hands off P from syscall or locked M.
func handoffp(_p_ *p) {
        // handoffp must start an M in any situation where
        // findrunnable would return a G to run on _p_.

        // if it has local work, start it straight away
        if !runqempty(_p_) || sched.runqsize != 0 {
                startm(_p_, false)
                return
        }
        
        // if it has GC work, start it straight away
        if gcBlackenEnabled != 0 && gcMarkWorkAvailable(_p_) {
                startm(_p_, false)
                return
        }

        // no local work, check that there are no spinning/idle M's,
        // otherwise our help is not required
        if atomic.Load(&sched.nmspinning)+atomic.Load(&sched.npidle) == 0 && atomic.Cas(&sched.nmspinning, 0, 1) {
                startm(_p_, true)
                return
        }

        lock(&sched.lock)
        
        // deal with gc
        { ... }

        if sched.runqsize != 0 {
                unlock(&sched.lock)
                startm(_p_, false)
                return
        }

        // If this is the last running P and nobody is polling network,
        // need to wakeup another M to poll network.
        if sched.npidle == uint32(gomaxprocs-1) && atomic.Load64(&sched.lastpoll) != 0 {
                unlock(&sched.lock)
                startm(_p_, false)
                return
        }

        // The scheduler lock cannot be held when calling wakeNetPoller below
        // because wakeNetPoller may call wakep which may call startm.
        pidleput(_p_, 0)
        unlock(&sched.lock)
}

// LINE 2261
// Schedules some M to run the p (creates an M if necessary).
// If p==nil, tries to get an idle P, if no idle P's does nothing.
// If spinning is set, the caller has incremented nmspinning and startm will
// either decrement nmspinning or set m.spinning in the newly started M.
func startm(_p_ *p, spinning bool)
```

### 抢占机制

在Golang中，存在一个全局监控线程`sysmon`

这个线程是一个死循环，并且会定时调用`retake()`来触发Goroutine抢占

```go
// LINE 5126
func sysmon() {
    for {
        usleep(delay)
        ...
        retake(now)
        ...
    }
}
```

进一步来看retake的抢占实现

```go
// LINE 5283
// returns: chandoffed Ps in _Psyscall
// lock operations omitted
func retake(now int64) uint32 {
    n := 0
    
    for i := 0; i < len(allp); i++ {
        _p_ := allp[i]

        pd := &_p_.sysmontick
        s := _p_.status

        if s == _Prunning || s == _Psyscall {
            // Preempt G if it's running for too long.
            if pd.schedwhen+forcePreemptNS <= now {
                
                // NOTE: 
                // this function sets a flag to G and
                // 'try' to send signal to thread to break
                // G is not instantly switched if OS doesn't support signal
                // or thread is too busy to proceed signal
                preemptone(_p_)
            }
        }
        if s == _Psyscall {
            // Retake P from syscall if it's there for more than 1 sysmon tick (at least 20us).
    
            // TODO: when and why to skip handoff ??

            // On the one hand we don't want to retake Ps if there is no other work to do,
            // but on the other hand we want to retake them eventually
            // because they can prevent the sysmon thread from deep sleep.
            if runqempty(_p_) && atomic.Load(&sched.nmspinning)+atomic.Load(&sched.npidle) > 0 && pd.syscallwhen+10*1000*1000 > now {
                    continue
            }

            _p_.status = _Pidle
            n++
            _p_.syscalltick++
            handoffp(_p_)
        }
    }
    
    unlock(&allpLock)
    return uint32(n)
}
```

---

关于异步抢占，可以看看这个

Q：这么说，不支持异步抢占的操作系统中，岂不是死循环就永远卡死掉了

——好像也有道理，毕竟golang没有虚拟机

——吗？

