---
title: api文档工具 swaggo
slug: api文档工具 swaggo
sidebar_position: 4
---


# api文档工具 swaggo

<b>代码即文档的终极实践</b>
Swaggo通过代码注释自动生成OpenAPI规范：

```
// @Summary 获取用户详情
// @Description 通过ID获取完整用户信息
// @Tags users
// @Accept  json
// @Produce  json
// @Param   id     path    int     true        "用户ID"
// @Success 200 {object} User
// @Router /users/{id} [get]
func GetUser(c *gin.Context) {
// 处理逻辑
}
```

生成文档的同时提供：

- <b>交互式测试</b>：内置Swagger UI，支持在线API调试
- <b>版本对比</b>：自动生成不同commit间的API变更报告
- <b>规范检查</b>：检测不符合RESTful标准的端点

