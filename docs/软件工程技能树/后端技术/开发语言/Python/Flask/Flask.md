---
title: Flask
slug: Flask
sidebar_position: 1
---


# Flask

## 背景引入

Flask 是一个使用 Python 编写的轻量级 Web 应用框架，最初由 Armin Ronacher 在 2010 年发布。它诞生于 Werkzeug（一个底层 WSGI 工具库）和 Jinja2（模板引擎）之上，原本只是一个“愚人节项目”，但却迅速发展成为全球最受欢迎的 Python Web 框架之一。

在 Web 开发的历史演变中，Python 一直以清晰、简洁而著称。早期 Python Web 开发使用 CGI 或 WSGI 接口，手动处理请求与响应。随后出现了如 Django、Pylons、Tornado 等重量级框架，它们提供了“全家桶”式的解决方案。而 Flask 选择了“微框架”路线——它本身只处理核心请求路由和模板渲染，其余功能由开发者按需组合第三方扩展，这种“松耦合、强自由”的哲学极大地满足了现代 Web 工程的灵活性和可扩展性需求。

从横向上对比，Flask 与 Django 是 Python Web 开发的两大主流选项。Django 强调“一站式解决”，提供 ORM、Admin、Auth、Form、Middleware 等内建模块，适合开发大型、标准化项目。而 Flask 则更适用于小到中型项目、RESTful API 后端、微服务架构，以及学习与实验性开发。换句话说，Django 像是一辆配备全套功能的 SUV，而 Flask 则像是一辆骨架精简的跑车——你可以根据自己的喜好去加装引擎、音响或座椅。

从纵向技术演变上看，Web 开发经历了从服务器渲染 HTML（例如 PHP、JSP）到前后端分离（Vue、React + API）的转变。Flask 完美适配了这一趋势，它既可以用来做传统 Web 页面渲染，也可以用作 RESTful API 服务端，甚至与前端框架配合作为微服务中的一环。在云原生、容器化部署（如 Docker/Kubernetes）、以及 Serverless 等现代架构下，Flask 的启动快速、结构灵活的特性都非常受欢迎。

如今，无论是在数据科学团队快速构建数据可视化工具，还是在初创公司搭建 MVP（最小可行产品）验证商业模式，亦或是在大型企业构建高并发 API 服务，Flask 都已经成为了不可或缺的开发利器。它不仅是一种工具，更是一种追求极致简洁与自由的开发哲学的体现。

## 学习链接索引

[官方文档](https://flask.palletsprojects.com/) 权威指南，涵盖 Flask 的使用方法与最佳实践

[中文版官方文档](https://dormousehole.readthedocs.io/en/latest/)

[Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world) 最经典的 Flask 教程，从入门到部署

[realpython](https://realpython.com/tutorials/flask/) 丰富的实战项目和教学文章，适合进阶学习

[flask工具集](https://github.com/humiaozuzu/awesome-flask) 社区整理的 Flask 工具、扩展、项目集合资源库

