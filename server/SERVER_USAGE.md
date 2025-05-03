# 播客平台服务端使用文档

## 环境要求

- Node.js >= 14.x
- MySQL >= 5.7

## 安装与启动

### 1. 安装依赖

```bash
cd server
npm install
```

### 2. 配置环境变量

在项目根目录下创建 `.env.development` 文件，配置以下环境变量：

```
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_DATABASE=pozoko
DATABASE_SYNCHRONIZE=true
```

注意：在生产环境中，`DATABASE_SYNCHRONIZE` 应设置为 `false`，以防止自动更新数据库结构。

### 3. 启动服务

开发环境：

```bash
npm run start:dev
```

生产环境：

```bash
npm run build
npm run start:prod
```

服务器默认将在 `http://localhost:3000` 启动。

## API 接口文档

### 1. 播客搜索

根据合约地址、NFT名称或频道名称搜索播客。

- **URL**: `/podcast/search`
- **方法**: `GET`
- **查询参数**: 
  - `query`: 搜索关键词（合约地址、NFT名称或频道名称）
- **响应示例**:

成功：
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "区块链播客",
      "description": "探讨区块链技术与应用",
      "avatar": "https://example.com/avatar.png",
      "public_key": "5bGPVwANvG8BLCaYkZRwHJ7KwNJ6CA93bVtw1y7t53jV",
      "create_at": 1630000000000,
      "nft_symbol": "BLOCKCHAIN",
      "nft_mint_account": "3v7VqUNcvoWszUFJmyXg1AFFiF2bK8JdvJ4JM4r4Htbp",
      "nft_mint_price": 1.5,
      "nft_mint_amount": 1000,
      "creator": {
        "id": 1,
        "public_key": "8Lg5Ed3nwCzSTSzK6un6gbPQm3bGzUDQ5Z2GB7EQb3Rp",
        "name": "区块链爱好者",
        "description": "区块链技术研究与应用",
        "avatar": "https://example.com/user-avatar.png"
      },
      "episodes": [
        {
          "id": 1,
          "name": "区块链入门",
          "symbol": "EP01",
          "metadata_cid": "QmXw7Ek96Z1KDuXZizZNxuWP2vBkAuEY1ZwoEc9VfQHQdz",
          "create_at": 1630100000000,
          "tip": 0,
          "is_published": true
        }
      ]
    }
  ]
}
```

失败：
```json
{
  "success": false,
  "message": "搜索参数不能为空",
  "data": []
}
```

### 2. 获取频道信息

根据合约地址获取频道详细信息和所有剧集。

- **URL**: `/podcast/channel`
- **方法**: `GET`
- **查询参数**: 
  - `contractAddress`: 合约地址
- **响应示例**:

成功：
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "区块链播客",
    "description": "探讨区块链技术与应用",
    "avatar": "https://example.com/avatar.png",
    "public_key": "5bGPVwANvG8BLCaYkZRwHJ7KwNJ6CA93bVtw1y7t53jV",
    "create_at": 1630000000000,
    "nft_symbol": "BLOCKCHAIN",
    "nft_mint_account": "3v7VqUNcvoWszUFJmyXg1AFFiF2bK8JdvJ4JM4r4Htbp",
    "nft_mint_price": 1.5,
    "nft_mint_amount": 1000,
    "creator": {
      "id": 1,
      "public_key": "8Lg5Ed3nwCzSTSzK6un6gbPQm3bGzUDQ5Z2GB7EQb3Rp",
      "name": "区块链爱好者",
      "description": "区块链技术研究与应用",
      "avatar": "https://example.com/user-avatar.png"
    },
    "episodes": [
      {
        "id": 1,
        "name": "区块链入门",
        "symbol": "EP01",
        "metadata_cid": "QmXw7Ek96Z1KDuXZizZNxuWP2vBkAuEY1ZwoEc9VfQHQdz",
        "create_at": 1630100000000,
        "tip": 0,
        "is_published": true
      }
    ],
    "likers": [
      {
        "id": 2,
        "public_key": "9A7Ed3nwCzSTSzK6un6gbPQm3bGzUDQ5Z2GB7EQb3Dp",
        "name": "加密货币爱好者",
        "avatar": "https://example.com/user2-avatar.png"
      }
    ],
    "subscribers": [
      {
        "id": 3,
        "public_key": "3FgKdqrSTSzK6un6gbPQm3bGzUDQ5Z2GB7EQb9Ew",
        "name": "NFT收藏者",
        "avatar": "https://example.com/user3-avatar.png"
      }
    ]
  }
}
```

失败：
```json
{
  "success": false,
  "message": "频道不存在",
  "data": null
}
```

### 3. 频道点赞

对频道进行点赞或取消点赞操作。

- **URL**: `/podcast/like-channel`
- **方法**: `POST`
- **请求体**: 
  ```json
  {
    "userId": 1,
    "channelId": 1
  }
  ```
- **响应示例**:

成功：
```json
{
  "success": true,
  "liked": true,
  "likeCount": 5
}
```

失败：
```json
{
  "success": false,
  "message": "用户或频道不存在"
}
```

### 4. 频道订阅

订阅或取消订阅频道。

- **URL**: `/podcast/subscribe-channel`
- **方法**: `POST`
- **请求体**: 
  ```json
  {
    "userId": 1,
    "channelId": 1
  }
  ```
- **响应示例**:

成功：
```json
{
  "success": true,
  "subscribed": true,
  "subscriberCount": 10
}
```

失败：
```json
{
  "success": false,
  "message": "用户或频道不存在"
}
```

### 5. 剧集点赞

对剧集进行点赞或取消点赞操作。

- **URL**: `/podcast/like-episode`
- **方法**: `POST`
- **请求体**: 
  ```json
  {
    "userId": 1,
    "episodeId": 1
  }
  ```
- **响应示例**:

成功：
```json
{
  "success": true,
  "liked": true,
  "likeCount": 3
}
```

失败：
```json
{
  "success": false,
  "message": "用户或剧集不存在"
}
```

### 6. 剧集订阅

订阅或取消订阅剧集。

- **URL**: `/podcast/subscribe-episode`
- **方法**: `POST`
- **请求体**: 
  ```json
  {
    "userId": 1,
    "episodeId": 1
  }
  ```
- **响应示例**:

成功：
```json
{
  "success": true,
  "subscribed": true,
  "subscriberCount": 7
}
```

失败：
```json
{
  "success": false,
  "message": "用户或剧集不存在"
}
```

## 数据模型

### 1. 用户 (UserInfo)

- id: 用户ID
- public_key: 用户公钥
- name: 用户名
- description: 用户描述
- avatar: 用户头像URL

### 2. 频道 (ChannelInfo)

- id: 频道ID
- name: 频道名称
- description: 频道描述
- avatar: 频道头像URL
- public_key: 频道合约地址
- create_at: 创建时间
- nft_symbol: NFT符号
- nft_mint_account: NFT铸造账号
- nft_mint_price: NFT铸造价格
- nft_mint_amount: NFT铸造数量
- creator: 创建者(关联UserInfo)
- episodes: 剧集列表(关联EpisodeInfo)
- likers: 点赞用户列表(关联UserInfo)
- subscribers: 订阅用户列表(关联UserInfo)

### 3. 剧集 (EpisodeInfo)

- id: 剧集ID
- name: 剧集名称
- symbol: 剧集符号
- metadata_cid: 元数据CID
- create_at: 创建时间
- channel: 所属频道(关联ChannelInfo)
- tip: 打赏金额
- is_published: 是否已发布
- creator: 创建者(关联UserInfo)
- likers: 点赞用户列表(关联UserInfo)
- subscribers: 订阅用户列表(关联UserInfo) 