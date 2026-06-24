# 工厂参观邀请系统

## 功能

- 客户填写参观申请表单
- 自动生成精美邀请函（可下载图片）
- 邮件通知管理员
- 可选：发送确认邮件给客户

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Nodemailer (阿里邮箱 SMTP)

## 本地开发

1. 安装依赖：

```bash
npm install
```

2. 复制环境变量：

```bash
cp .env.example .env.local
```

3. 配置 `.env.local`：

```
SMTP_HOST=smtp.qiye.aliyun.com
SMTP_PORT=465
SMTP_USER=your-email@your-domain.com
SMTP_PASS=your-email-password
ADMIN_EMAIL=admin@your-domain.com
SEND_CUSTOMER_CONFIRMATION=true
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. 启动开发服务器：

```bash
npm run dev
```

5. 访问 http://localhost:3000

## 部署到 Vercel

1. 推送代码到 GitHub

2. 在 Vercel 导入项目：https://vercel.com/new

3. 配置环境变量（在 Vercel 项目设置中）：

   - `SMTP_HOST` = `smtp.qiye.aliyun.com`
   - `SMTP_PORT` = `465`
   - `SMTP_USER` = 你的阿里邮箱地址
   - `SMTP_PASS` = 你的邮箱密码
   - `ADMIN_EMAIL` = 接收通知的邮箱
   - `SEND_CUSTOMER_CONFIRMATION` = `true`
   - `NEXT_PUBLIC_BASE_URL` = 你的 Vercel 域名（如 `https://your-app.vercel.app`）

4. 部署完成后即可使用

## 使用流程

1. 你发送链接给客户：`https://your-domain.vercel.app`
2. 客户打开链接，填写表单
3. 提交后：
   - 你收到邮件通知（包含客户信息）
   - 客户看到邀请函页面（可下载图片）
   - 可选：客户也收到确认邮件

## 邮箱配置说明（阿里企业邮箱）

1. 登录阿里邮箱管理后台
2. 开启 SMTP 服务
3. 获取授权码（不是邮箱密码）
4. 将授权码填入 `SMTP_PASS`

## 自定义

- 修改品牌色：编辑 `tailwind.config.ts` 中的颜色配置
- 修改邀请函样式：编辑 `components/InviteCard.tsx`
- 修改表单字段：编辑 `components/Form.tsx`
