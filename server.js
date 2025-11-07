const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 用于缓存TextBody的变量
let cachedTextBody = null;

// 解析JSON格式的请求体
app.use(express.json());

// POST接口：接收邮件内容
app.post('/api/email/receive', (req, res) => {
  try {
    const { TextBody } = req.body;
    
    // 检查TextBody是否存在
    if (TextBody === undefined || TextBody === null) {
      return res.status(400).json({
        success: false,
        message: 'TextBody字段缺失'
      });
    }
    
    // 缓存TextBody（自动覆盖之前的）
    cachedTextBody = TextBody;
    
    console.log(`收到新的TextBody，已缓存。长度: ${TextBody.length} 字符`);
    
    res.json({
      success: true,
      message: 'TextBody已成功缓存',
      receivedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('处理请求时出错:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message
    });
  }
});

// GET接口：获取缓存的TextBody
app.get('/api/email/cached', (req, res) => {
  if (cachedTextBody === null) {
    return res.status(404).json({
      success: false,
      message: '暂无缓存的TextBody'
    });
  }
  
  res.json({
    success: true,
    textBody: cachedTextBody
  });
});

// Ping接口：用于测试服务是否正常运行
app.get('/ping', (req, res) => {
  res.json({
    pong: true,
    message: '服务运行正常',
    timestamp: new Date().toISOString()
  });
});

// 健康检查接口
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`邮件接收服务已启动，监听端口: ${PORT}`);
  console.log(`Ping接口: http://localhost:${PORT}/ping`);
  console.log(`POST接口: http://localhost:${PORT}/api/email/receive`);
  console.log(`GET接口: http://localhost:${PORT}/api/email/cached`);
});

