---
title: github开源工具
slug: github开源工具
sidebar_position: 6
---


# github开源工具

Author:蔡骏武

## 项目地址

https://github.com/sashabaranov/go-openai

## 为什么

我们知道python和nodejs是有官方的库的，那么go也有别人开源的。

运用次库可以实现类似的功能，可以更加方便的调用openai的api接口。

## 作用

1. 实现 流式/非流式 的gpt3.5 gpt4等模型的响应。
2. 实现图片api接口（不推荐，图质量不高）。
3. 实现复用了net/http的增加proxy的功能，可以方便设置代理。
4. Speech to text等api就不列举了。

## Tip

1. 所谓流式输出就是想官方一样的打字机效果，非流式输出就是一次性输出所有消息。所以流式效率高。
2. 在后端使用nginx作为服务器时，需要把`proxy_buffering` 设为false，不然没有打字机效果，原因是nginx默认会缓存数据，然后一起发给前端，但你需要实现一个长轮询（链接），那种实时的效果。

## 实现样例

### 官方案例

以下是官方的实现样例。

实现了Hello的请求，使用gpt3.5的模型，非流式输出。

然后再细讲一下role和content。

- 根据openai的官方文档，role是给设定的角色，content是内容，由于需要储存上下文，需要把上下文的所有消息存储进去，一起合并发送给openai
- Role 有 system(给gpt3.5的设定，通常放在开头)，user(用户的输入)，assistant(gpt的输出)
- 
```go
package main

import (
        "context"
        "fmt"
        openai "github.com/sashabaranov/go-openai"
)

func main() {
        // 这里输入你的api key
        client := openai.NewClient("your token")
        resp, err := client.CreateChatCompletion(
                context.Background(),
                openai.ChatCompletionRequest{
                        Model: openai.GPT3Dot5Turbo,
                        Messages: []openai.ChatCompletionMessage{
                                {
                                        Role:    openai.ChatMessageRoleUser,
                                        Content: "Hello!",
                                },
                        },
                },
        )

        if err != nil {
                fmt.Printf("ChatCompletion error: %v\n", err)
                return
        }

        fmt.Println(resp.Choices[0].Message.Content)
}
```

### 个人案例

以下是我自己项目中实现流式响应的部分代码。（gin）

使用`c.stream()` 持续向前端返回数据

注：前面要套for，因为gin默认stream为false就停止了

![](/assets/Me6EbPdpxokEXXxcXA1c8AFGnsf.png)

