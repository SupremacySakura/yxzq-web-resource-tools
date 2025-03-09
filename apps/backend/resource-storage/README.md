
# 静态资源部署服务器

## 目录

- [介绍](#介绍)
- [使用](#使用)
  - [下载](#下载)
  - [安装依赖](#安装依赖)
  - [启动](#启动)
- [使用说明](#使用说明)
- [参数说明](#参数说明)

## 介绍

这是一个简单的静态工具，将它部署到你的服务器，配合另一个工具，可以实现基础的静态资源上传功能。

## 使用

### 下载

```bash
git clone https://github.com/SupremacySakura/resource-storage.git
```

### 安装依赖

```bash
npm install
```

### 启动

```bash
node app.js
```

## 使用说明

将它下载到本地，并上传至你的服务器，配合另一个工具即可实现。地址为 [yxzq-utils-node](https://www.npmjs.com/package/yxzq-utils-node)。你也可以不使用作者提供的工具，只需要向该服务器发送 POST 请求并提供相关参数即可。

如果你想在前端中使用，请使用另一个工具，地址为 [yxzq-utils-browser](https://www.npmjs.com/package/yxzq-utils-browser)。

## 参数说明

### 请求地址(上传文件)

```
<你的服务器域名>:<端口>/upload
```

### 请求头

```javascript
FormData.getHeaders()
```

### 请求体格式

- **form-data**
- 包括的参数：

```javascript
{
    file,        // 文件
    fileName,    // 文件名, 默认值: 'default'
    folderName,  // 储存的文件夹, 默认值: 'default_name'
    useDate,     // 是否使用时间戳命名, 默认值: 'yes', 可选值: 'no'
    ext,         // 文件后缀, 默认值: 'jpg'
}
```

### 返回值

返回一个 Promise 对象：

```javascript
{
    message: 'File uploaded successfully!' |
             'File uploaded unsuccessfully!' |
             'File does not exist!',
    filePath: url | null,
    code: 200 | 500,
    error?: error.message
}
```

### 请求地址(获取上传文件路径)

```
<你的服务器域名>:<端口>/filePath
```

### 请求头

```javascript
// application/json
```

### 请求体格式

- **application/json**
- 包括的参数：

```javascript
{
    extNameConfig:'all'   // 查询文件后缀名参数,默认值为'all',可选值'photo',也可传入后缀名数组,如['.html','.jpg']
}
```

### 返回值

返回一个 Promise 对象：

```javascript
{
    message: 'Query successful!',
    files: Array<string> | [], // 文件路径
    code: 200,      // HTTP 状态码
}
```
