# 邮件接收服务

一个简单的Node.js服务，用于接收和缓存邮件内容。

## 功能

- 接收POST请求，提取并缓存`TextBody`字段
- 新数据自动覆盖旧数据
- 提供GET接口查看缓存的文本内容

## 安装

```bash
npm install
```

## 运行

```bash
npm start
```

服务将在 `http://localhost:3000` 启动

## API接口

### 1. 接收邮件内容 (POST)

**接口地址**: `/api/email/receive`

**请求体**:
```json
{
  "TextBody": "邮件文本内容"
}
```

**响应示例**:
```json
{
  "success": true,
  "message": "TextBody已成功缓存",
  "receivedAt": "2024-01-01T12:00:00.000Z"
}
```

### 2. 获取缓存的文本内容 (GET)

**接口地址**: `/api/email/cached`

**响应示例**:
```json
{
  "success": true,
  "textBody": "邮件文本内容"
}
```

### 3. 健康检查 (GET)

**接口地址**: `/health`

## 使用示例

```bash
# 发送POST请求
curl -X POST http://localhost:3000/api/email/receive \
  -H "Content-Type: application/json" \
  -d '{"TextBody": "这是一封测试邮件"}'

# 获取缓存的文本
curl http://localhost:3000/api/email/cached
```
