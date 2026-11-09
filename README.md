<div align="center">

<img src="src/images/1.png" width="96" height="96" alt="久远的翻译工具图标" style="border-radius:20px" />

# 久远的翻译工具

**轻量、按需、尊重隐私的 Chrome 双语翻译扩展**

按一下快捷键，网页变成原文 + 译文对照；滚动到哪里，翻译到哪里。<br/>
支持 Google 翻译和任意 OpenAI 兼容的 AI 接口（通义千问 / OpenAI / 本机 vLLM），API Key 只留在你自己的浏览器里。

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-安装-4285F4?logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/dkjbikoamkfpmmfaodleccdefonkjebb)
![Version](https://img.shields.io/badge/version-1.1.1-blue)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-34A853)
![Chrome 120+](https://img.shields.io/badge/Chrome-120%2B-FBBC04)
![Runtime deps](https://img.shields.io/badge/runtime%20deps-0-lightgrey)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

<img src="images/demo-bilingual.png" width="900" alt="双语对照翻译效果：英文原文下方逐段显示中文译文，保留原有排版" />

</div>

---

## ✨ 为什么选它

| | |
|---|---|
| 🪶 **真正轻量** | 零运行时依赖，无打包器、无框架。安装后不申请任何网站的常驻权限，只在你点击翻译时按需注入。 |
| 📖 **双语对照，不破坏排版** | 译文以独立段落插入原文下方，原始 DOM 节点不被包裹、移动或克隆。一键“恢复原文”即可完整还原。 |
| 🖱️ **按需翻译，滚动续译** | 默认只翻译视口附近的内容，滚动后继续；动态加载的内容优先扫描局部区域，不会一次性发出几百个请求。 |
| 🤖 **自带模型（BYOK）** | Google 免费通道开箱即用；也可以填入自己的 API Key，接入通义千问、OpenAI 或任何 `/chat/completions` 兼容接口，包括本机 vLLM。 |
| 🔐 **密钥留在本机** | API Key 保存在本机扩展存储，重启浏览器无需重输，不走 Chrome 同步，网页脚本读不到。追求更高安全性时可改为密码 AES‑GCM 加密保存，密码本身不落盘。 |
| 🎨 **三种译文样式** | 底线 / 左边框 / 高亮背景，颜色可跟随原文或自定义，支持深色模式。 |
| 🛡️ **默认保护敏感区域** | 输入框、编辑器、代码块、隐藏元素和 `translate="no"` 标记默认不翻译；菜单/按钮翻译按需开启。 |
| ♻️ **可中断、可重试、可缓存** | 停止会取消排队和在途请求；部分失败可只重试未完成段落；已完成译文按服务 / 模型 / 语言缓存，回退页面零成本。 |

---

## 🖼️ 界面预览

<table>
<tr>
<td align="center" width="34%"><b>弹窗：一键翻译 / 站点规则</b></td>
<td align="center" width="66%"><b>设置页：选择服务、填写 Key、测试连接</b></td>
</tr>
<tr>
<td align="center" valign="top"><img src="images/popup.png" width="280" alt="扩展弹窗：显示翻译进度、目标语言、站点规则和数据接收方" /></td>
<td align="center" valign="top"><img src="images/settings.png" width="560" alt="设置页：翻译服务选择、服务提供方预设、API Key、模型与思考模式" /></td>
</tr>
</table>

### 三种译文样式

<table>
<tr>
<td align="center"><b>底线（默认）</b></td>
<td align="center"><b>左边框</b></td>
<td align="center"><b>高亮背景</b></td>
</tr>
<tr>
<td><img src="images/demo-theme-underline.png" alt="底线样式" /></td>
<td><img src="images/demo-theme-block.png" alt="左边框样式" /></td>
<td><img src="images/demo-theme-highlight.png" alt="高亮背景样式" /></td>
</tr>
</table>

<sub>以上样式示例开启了“自定义颜色”；默认为跟随原文颜色。</sub>

<details>
<summary>🌙 深色模式下的设置页</summary>
<br/>
<p align="center"><img src="images/settings-dark.png" width="560" alt="深色模式设置页" /></p>
</details>

---

## 🚀 快速开始

### 安装

- **应用商店（推荐）**：[久远的翻译工具 – Chrome Web Store](https://chromewebstore.google.com/detail/dkjbikoamkfpmmfaodleccdefonkjebb)
- **源码加载**：Chrome 120+，打开 `chrome://extensions` → 开启“开发者模式” → “加载已解压的扩展程序” → 选择仓库中的 `src` 目录。

### 三步开始翻译

1. 点击工具栏图标，确认待译文字的接收方（Google 或你配置的 AI 服务），首次使用时授权访问该服务。
2. 点击 **“翻译此页面”**，或直接按 <kbd>Alt</kbd> + <kbd>T</kbd>。
3. 滚动页面，附近内容自动续译。随时可以 **暂停**（保留已有译文）、**重试未完成内容**，或 **恢复原文**。

弹窗中的“此网站”可设为 **仅本次翻译 / 此网站始终翻译 / 此网站不自动翻译**。“始终翻译”只在你明确授权过的网站生效，撤销权限后立即停止。

### 接入自己的 AI 模型

1. 打开设置页 → 翻译服务选择 **AI 模型翻译**。
2. 选择服务提供方预设（会自动填好接口地址和模型），粘贴 API Key。
3. 点击 **“保存并测试连接”**。测试会发送一段固定示例文本，可能产生少量服务商费用。

| 预设 | 接口地址 | 默认模型 | 说明 |
|---|---|---|---|
| 通义千问 · 阿里云中国内地 | `https://dashscope.aliyuncs.com/compatible-mode/v1` | `qwen3.8-flash` | 其他地域 / 工作空间专属地址可手动修改 |
| OpenAI 官方 | `https://api.openai.com/v1` | `gpt-5.4-nano` | — |
| 其他兼容接口 | 自填 | 自填 | 任何 OpenAI Chat Completions 兼容网关 |
| 本机 vLLM 服务 | `http://localhost:8000/v1` | `Qwen/Qwen3.8-Flash` | 仅允许 `localhost` / `127.0.0.1` / `::1` 使用 HTTP |

模型快捷按钮（GPT‑5.4 nano / Qwen3.8 Flash）只切换模型名；选择服务提供方预设才会同时填写地址与模型。

> **关于思考模式**：默认关闭，翻译通常不需要深度推理。扩展会根据模型家族和接口自动选择参数——本机 vLLM 的 Qwen 使用 `chat_template_kwargs`，远程 Qwen 使用顶层开关；是否真正关闭取决于模型与服务端支持。
>
> **关于地址**：远程接口要求 HTTPS；可以填 API Base，也可以填完整的 `/chat/completions` 路径，扩展会自动规范化。

---

## 🔒 隐私与安全设计

- **无常驻网站权限**：Manifest 不含 `host_permissions` 和静态 `content_scripts`。手动翻译使用 `activeTab` 按需注入；服务访问和“始终翻译”站点在你操作时才请求授权。
- **密钥隔离**：API Key 默认保存在 `chrome.storage.local`（访问级别限定为扩展自身页面，不同步），重启浏览器后直接可用。勾选“用密码加密保存”则不再保留明文，以 AES‑GCM 加密存放，每次启动浏览器后需输入密码解锁，密码本身不保存。内容脚本无法读取密钥存储，请求由后台读取受信任配置发出。
- **不走同步**：所有设置、站点偏好、缓存都留在本机，不写入 `chrome.storage.sync`。
- **透明的接收方**：弹窗和设置页都会明确显示“待译文字发送至 …”，并需要你勾选同意。
- 详见 [隐私说明](privacy.html)。

---

## ⚠️ 已知边界

- 支持普通 HTTP(S) 网页；Chrome 内部页面、应用商店、内置 PDF 查看器、跨域 iframe 和 Shadow DOM 目前不在完整支持范围内。
- Google 通道有网络与频率限制，扩展不承诺无限免费或服务可用性；AI 接口费用由所选服务商收取。
- Linear / LiteLLM 控制台有内置词典适配以保留布局；自定义 LiteLLM 地址在“高级设置”中填写。
- 1.1.0 采用新的配置结构，不迁移旧版设置。1.1.1 起 API Key 默认持久保存；从 1.1.0 升级的用户需再输入一次密钥，之后不再提示。

---

## 🛠️ 开发

运行时零 npm 依赖。开发与测试需要 **Node.js 20+** 和 **Python 3.9+**：

```sh
npm ci                          # 安装 Playwright
npx playwright install chromium # 下载测试用 Chromium
npm test                        # 单元测试 + 浏览器测试
npm run package                 # 生成 dist/transLite-1.1.1.zip
```

### 测试覆盖

| 类型 | 内容 |
|---|---|
| 单元测试 (`tests/*.mjs`) | 请求与权限边界、模型参数策略、密钥 AES‑GCM 加密与解锁、URL 校验、取消 / 重试、DOM 分段与恢复、Linear / LiteLLM 适配器 |
| 浏览器测试 (`tests/browser/*.mjs`) | 真实 DOM 与动态网页的增量翻译、弹窗停止 / 部分失败状态、**安装后的 MV3 扩展全流程**（真实 service worker、扩展存储、连接测试、站点自动注册 / 移除、后台强制终止后唤醒、重启后解锁） |

网络测试只连接本机模拟服务，不使用真实 API Key，不消耗付费额度。安装测试仅在临时 Manifest 中预授权 `http://127.0.0.1/*` 以绕过无头模式无法操作的原生权限弹窗；正式 Manifest 保持按需授权，打包脚本会校验这一点。原生授权弹窗和真实服务的人工验收项见 [发布说明](docs/release-1.1.1.md)。

### 打包

`scripts/package.py` 使用明确的文件清单，校验 Manifest、页面脚本和样式引用，排除同步冲突副本、测试及开发文件，并检查根目录与 `src/` 两份 `privacy.html` 一致。源码重载后请刷新原网页。

---

## 📁 仓库结构

```
transLite/
├─ src/                 扩展源码（加载此目录即可运行）
│  ├─ background.js     授权、站点脚本注册、受信任设置操作与任务生命周期
│  ├─ content.js        页面内调度：分段、视口附近翻译、局部变更扫描
│  ├─ dom.js            只读分段、译文插入与恢复原文
│  ├─ translation.js    分批、限流、重试与内存缓存
│  ├─ config.js         设置验证、服务预设与公开页面偏好
│  ├─ model-policy.js   按模型家族 / 接口决定思考与温度参数
│  ├─ vault.js          密码派生与本机加密密钥
│  ├─ adapters/         Linear、LiteLLM 内置词典适配
│  ├─ popup/  options/  弹窗与设置页
│  └─ privacy.html      扩展内隐私说明
├─ tests/               单元测试与 Playwright 浏览器测试（凭证与域名均为夹具）
├─ scripts/package.py   发布包构建与校验
├─ docs/                版本说明与人工验收步骤
├─ images/              README 截图
└─ privacy.html         公开部署用隐私页面（与 src/privacy.html 保持一致）
```

依赖目录、ZIP、测试截图、报告、环境变量文件和同步冲突副本由 `.gitignore` 排除；本地历史资料可放在 `.local/`，不提交。发布包由打包命令生成，仓库不保存二进制 ZIP。

---

## 🧩 实现要点

- **并发与重试**：最多 3 个 HTTP 请求并行，单请求超时 25 秒；临时 429 / 5xx 最多重试两次并遵守 `Retry-After`。
- **缓存键**：按服务、接口、模型、目标语言、提示词和思考策略区分；在途去重仅限同一任务，因此不同标签页可独立取消。
- **分段策略**：初次识别遍历普通页面 DOM，动态更新优先扫描局部；正文显示双语对照，紧凑控件（按钮、表格单元、单行截断文本等，需开启“翻译菜单和按钮”）原位替换文字，移除翻译时全部恢复。

---

## 📄 许可

[MIT](LICENSE) © 2026 kuon
