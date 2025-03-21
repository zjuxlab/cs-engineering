---
title: channel
slug: channel
sidebar_position: 1
---


# channel

Author:NA

# 优点概述

> 请你介绍go Channel相比其他同步模型的优势

Go 的 Channel 相比其他同步模型（如锁机制、信号量、消息队列等）具有以下几个优势：

### 1. <b>内置语言特性</b>

Channel 是 Go 语言的内置特性，专门用于协程之间的通信和同步。这意味着它与 Go 语言的并发模型高度集成，使用起来更加自然和简洁。开发者无需引入第三方库或额外的同步工具，减少了代码的复杂性。

### 2. <b>更高层次的抽象</b>

Channel 提供了一个更高层次的抽象，使得并发编程更加直观。开发者可以通过 Channel 直接传递数据，而不是通过共享内存和锁来保护数据。这种消息传递模型简化了并发编程，降低了死锁和竞争条件的风险。

### 3. <b>自动阻塞和同步</b>

Channel 本身就具备阻塞和同步的功能：

- <b>发送阻塞</b>：当向一个满的 Channel 发送数据时，发送操作会阻塞，直到有空位。
- <b>接收阻塞</b>：当从一个空的 Channel 接收数据时，接收操作会阻塞，直到有数据可读。

这种特性自动实现了协程之间的同步，无需开发者显式地管理锁和条件变量。

### 4. <b>类型安全</b>

Channel 是类型安全的，意味着它只能传递特定类型的数据。这种类型安全性可以在编译时捕获错误，减少运行时错误的可能性。开发者可以明确知道 Channel 中传递的数据类型，提高代码的可读性和可维护性。

### 5. <b>简单明了的并发模式</b>

使用 Channel，可以实现简单明了的并发模式。例如，生产者-消费者模式、工作池模式、扇入扇出模式等，并发模式在 Channel 的支持下可以轻松实现。代码逻辑更为直观，减少了并发编程的复杂度。

### 6. <b>避免锁和共享状态</b>

Channel 避免了使用锁和共享状态，通过消息传递进行协程间通信。这种方式可以减少锁竞争，提高程序的并发性能。同时，也减少了由于锁管理不当而导致的死锁和其他同步问题。

### 7. <b>选择结构（select）</b>

Go 提供了 `select` 结构，可以同时等待多个 Channel 操作。`select` 结构让开发者可以优雅地处理多个 Channel 的并发通信，提高了程序的灵活性和响应能力。它类似于网络编程中的 `select` 或 `poll`，但使用起来更加简洁和强大。

```go
select {
case msg1 := <-chan1:
    fmt.Println("Received", msg1)
case msg2 := <-chan2:
    fmt.Println("Received", msg2)
case chan3 <- "message":
    fmt.Println("Sent message to chan3")
default:
    fmt.Println("No communication")
}
```

### 8. <b>内存效率</b>

Channel 的实现是高度优化的，它们的内存和 CPU 开销很小。Go 运行时通过高效的内存管理和调度机制，使得 Channel 的性能非常好，适合大规模并发场景。

### 9. <b>内置的垃圾回收支持</b>

Go 的垃圾回收机制可以自动回收不再使用的 Channel 和关联的资源。开发者无需手动管理 Channel 的生命周期，减少了内存泄漏的风险。

### 10. <b>易于调试</b>

由于 Channel 提供了明确的数据流方向和阻塞点，调试并发问题变得相对简单。开发者可以清楚地看到数据的传递路径和阻塞点，快速定位问题。

综上所述，Go 的 Channel 提供了一种高效、安全、简洁的协程间通信和同步方式。相比其他同步模型，Channel 的高层次抽象、内置阻塞和同步特性、类型安全、避免锁和共享状态、以及选择结构的支持，使得并发编程更加容易和可靠。

---

- 实现代码在 `$GOROOT/src/runtime/chan.go`
    - 以`go==1.19 Installed By MacOS homebrew`为例

- 为了简要说明运行流程，代码有删改

# 用法示例

## 初始化

```go
some_chan = make(chan Type, buf_size) // buf_size defaults = 0
```

## 阻塞态

```go
some_chan <- data_to_write;
// block till done
some_chan -> data_to_read;
// block till done
```

## 非阻塞态

```go
select {
case some_chan <- data_to_write:
    // can write now
    todo_when_written;
case some_chan -> data_to_read:
    // can read now
    todo_when_read;
default:
    todo_when_blocked;
}
```

# 数据结构定义

```go
// LINE 33

// assume: hchan<typename T>
type hchan struct {
 qcount   uint           // total data in the queue
 dataqsiz uint           // size of the circular queue ( = buf_size)
 buf      unsafe.Pointer // points to an array of dataqsiz elements
 elemsize uint16 // sizeof(T)
 elemtype *_type // type(T)
 closed   uint32 // actually boolean
 sendx    uint   // send index
 recvx    uint   // receive index
 recvq    waitq  // list of recv waiters
 sendq    waitq  // list of send waiters

 // lock protects all fields in hchan, as well as several
 // fields in sudogs blocked on this channel.
 lock mutex
}
```

# 写流程

```go
// LINE 160

// @param ep: element to save
func chansend(c *hchan, ep unsafe.Pointer, block bool, callerpc uintptr) bool {
    if c == nil { ... } // special case

    lock(&c.lock)

    if c.closed != 0 {
        unlock(&c.lock)
        panic(plainError("send on closed channel"))
    }

    if sg := c.recvq.dequeue(); sg != nil {
        // Found a waiting receiver. We pass the value we want to send
        // directly to the receiver, bypassing the channel buffer (if any).
        if sg.elem != nil {
            sendDirect(c.elemtype, sg, ep)
            sg.elem = nil
        }
        unlock(&c.lock)
        goready(gp, skip+1)
        return true
    }

    if c.qcount < c.dataqsiz {
        // Space is available in the channel buffer. Enqueue the element to send.
        // editing {c.sendx, c.qcount, c.buf}
        unlock(&c.lock)
        return true
    }

    if !block {
        unlock(&c.lock)
        return false
    }

    // Block on the channel. Some receiver will complete our operation for us.
    gp := currentGoroutine()
    mysg := init_sudog_with_gp(gp) // actually type is `sudog`, meaning psudo-goroutine for waiting
    c.sendq.enqueue(mysg)

    // gopark() blocks the goroutine till a goready() to awake
    gopark(chanparkcommit, unsafe.Pointer(&c.lock), waitReasonChanSend, traceEvGoBlockSend, 2)
    
    // someone woke us up.
    restore_goroutine(gp)

    release_sudog(mysg)
        
    return true
}
```

# 读流程

```go
// LINE 457

// @param ep: element mem to read
func chanrecv(c *hchan, ep unsafe.Pointer, block bool) (selected, received bool) {
    if c == nil { ... } // special case


    
    if !block && empty(c) {
        if c.closed == 0 {
            return // read failed
        }
        // The channel is irreversibly closed. Re-check whether the channel has any pending data
        // to receive, which could have arrived between the empty and closed checks above.
        if empty(c) {
            // The channel is irreversibly closed and empty.
            if ep != nil {
                typedmemclr(c.elemtype, ep)
            }
            return true, false
        }
    }

    lock(&c.lock)

    if c.closed != 0 {
        if c.qcount == 0 {
            unlock(&c.lock)
            if ep != nil {
                typedmemclr(c.elemtype, ep)
            }
            return true, false
        }
        // The channel has been closed, but the channel's buffer have data.
    } else {
        // Just found waiting sender with not closed.
        if sg := c.sendq.dequeue(); sg != nil {
            // Found a waiting sender. If buffer is size 0, receive value
            // directly from sender. Otherwise, receive from head of queue
            // and add sender's value to the tail of the queue (both map to
            // the same buffer slot because the queue is full).
                
            if c.dataqsiz == 0 {
                if ep != nil {
                    // copy data from sender
                    recvDirect(c.elemtype, sg, ep)
                }
            } else {
                // Queue is full. Take the item at the
                // head of the queue. Make the sender enqueue
                // its item at the tail of the queue. Since the
                // queue is full, those are both the same slot.
                qp := chanbuf(c, c.recvx)
                
                    // copy data from queue to receiver
                if ep != nil {
                    typedmemmove(c.elemtype, ep, qp)
                }
                // copy data from sender to queue
                enque(sg.elem)
            }
            
            goready(gp, skip+1)

            return true, true
        }
    }

    if c.qcount > 0 {
        // Dequeue the element sended.
        // editing {c.sendx, c.qcount, c.buf}
        deque(ep)
        unlock(&c.lock)
        return true, true
    }

    if !block {
        unlock(&c.lock)
        return false, false
    }

    // no sender available: block on this channel.
    gp := currentGoroutine()
    mysg := init_sudog_with_gp(gp) // actually type is `sudog`, meaning psudo-goroutine for waiting
    c.recvq.enqueue(mysg)

    // gopark() blocks the goroutine till a goready() to awake
    gopark(chanparkcommit, unsafe.Pointer(&c.lock), waitReasonChanReceive, traceEvGoBlockRecv, 2)

    // someone woke us up
    restore_goroutine(gp)

    release_sudog(mysg)

    return true, success
}
```

