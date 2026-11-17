// 页面右侧的悬浮设置入口。
// 目的是给没有扩展工具栏的浏览器（例如 Steam 内嵌的 CEF 浏览器）留一个进设置页的地方，
// 这里只做「打开设置」一件事，不参与翻译流程，可独立注入。
(() => {
  if (globalThis.__LT_SETTINGS_BUTTON__) return;
  globalThis.__LT_SETTINGS_BUTTON__ = true;

  const HOST_ID = 'lt-settings-fab';
  let mounted = null;

  const ICON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';

  const STYLE = `
    :host { all: initial; }
    .fab {
      all: initial;
      display: flex; align-items: center; justify-content: center;
      box-sizing: border-box; width: 40px; height: 40px; padding: 0;
      border: 0; border-radius: 50%;
      background: #1a73e8; color: #fff;
      box-shadow: 0 2px 8px rgba(0,0,0,.28);
      cursor: pointer; opacity: .8;
      transition: opacity .15s ease, transform .15s ease;
    }
    .fab:hover, .fab:focus-visible { opacity: 1; transform: scale(1.06); }
    .fab:focus-visible { outline: 2px solid #1a73e8; outline-offset: 3px; }
    .fab:active { transform: scale(.96); }
    @media (prefers-color-scheme: dark) {
      .fab { background: #3b82f6; box-shadow: 0 2px 10px rgba(0,0,0,.55); }
    }
    @media (prefers-reduced-motion: reduce) { .fab { transition: none; } }
    @media print { :host { display: none !important; } }
  `;

  function openSettings() {
    if (!chrome?.runtime?.id) return;
    try {
      // 必须走后台：内容脚本没有 openOptionsPage。
      chrome.runtime.sendMessage({ type: 'OPEN_SETTINGS' }, () => void chrome.runtime.lastError);
    } catch (_) {}
  }

  function build() {
    const host = document.createElement('div');
    host.id = HOST_ID;
    host.setAttribute('translate', 'no');
    host.setAttribute('data-lt-skip', '');
    // 关键样式走内联，避免被站点 CSS 的 :host 低特异性覆盖。
    // 离右边留 12px，避开浏览器滚动条，避免挡住拖动。
    host.style.cssText = 'position:fixed;top:46%;right:12px;z-index:2147483644;display:block;margin:0;padding:0;border:0;';
    const root = host.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = STYLE;
    const button = document.createElement('button');
    button.className = 'fab';
    button.type = 'button';
    button.title = '久远的翻译工具 · 设置';
    button.setAttribute('aria-label', '打开扩展设置');
    button.innerHTML = ICON;
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      openSettings();
    });
    root.append(style, button);
    return host;
  }

  function mount(attempt = 0) {
    if (mounted?.isConnected) return mounted;
    const target = document.body || document.documentElement;
    if (!target) {
      if (attempt < 10) setTimeout(() => mount(attempt + 1), 200);
      return null;
    }
    mounted = build();
    target.appendChild(mounted);
    return mounted;
  }

  function unmount() {
    mounted?.remove();
    document.getElementById(HOST_ID)?.remove();
    mounted = null;
  }

  async function start() {
    let enabled = true;
    try {
      const response = await chrome.runtime.sendMessage({ type: 'GET_PAGE_SETTINGS' });
      enabled = response?.settings?.floatingButton !== false;
    } catch (_) {
      // 后台暂时失联时按默认值显示，比什么都不显示更可用。
    }
    if (enabled) mount();
    else unmount();
  }

  chrome.runtime.onMessage.addListener(msg => {
    if (msg?.type !== 'SETTINGS_UPDATED') return;
    // 不调用 sendResponse：同页的 content.js 才是这条广播的应答方。
    if (msg.settings?.floatingButton === false) unmount();
    else mount();
  });

  start();
})();
