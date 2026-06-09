import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";
import { feedbackConfig, isFeedbackConfigured } from "./feedback-config.js";

const FIREBASE_VERSION = "11.6.0";
const LEGACY_STORAGE_KEY = "note-desk-notes";
const DISPLAY_SETTINGS_KEY = "note-desk-display-settings";
const SORT_SETTING_KEY = "note-desk-sort-setting";
const LOCAL_MODE_KEY = "note-desk-local-mode";
const LOCAL_ENTRY_KEY = "note-desk-local-entry";
const LOCAL_MEMOS_KEY = "note-desk-local-notes";
const LOCAL_DISPLAY_NAME_KEY = "note-desk-local-display-name";
const DRAFT_KEY = "note-desk-draft";
const CUSTOM_COLORS_KEY = "note-desk-custom-colors";
const LAYOUT_SETTING_KEY = "note-desk-layout-setting";
const LAST_OPEN_MEMO_KEY = "note-desk-last-open-note";
const OUTLOOK_REMINDER_SETTING_KEY = "note-desk-outlook-reminder-minutes";
const AUTOSAVE_SETTING_KEY = "note-desk-autosave";

const loginScreen = document.querySelector("#loginScreen");
const appScreen = document.querySelector("#appScreen");
const appLoading = document.querySelector("#appLoading");
const googleLoginButton = document.querySelector("#googleLoginButton");
const emailAuthForm = document.querySelector("#emailAuthForm");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const emailSubmitButton = document.querySelector("#emailSubmitButton");
const emailSignInTab = document.querySelector("#emailSignInTab");
const emailSignUpTab = document.querySelector("#emailSignUpTab");
const localModeButton = document.querySelector("#localModeButton");
const loginHint = document.querySelector("#loginHint");
const loginError = document.querySelector("#loginError");
const userGreeting = document.querySelector("#userGreeting");
const usernameForm = document.querySelector("#usernameForm");
const usernameInput = document.querySelector("#usernameInput");
const usernameSaveButton = document.querySelector("#usernameSaveButton");
const feedbackButton = document.querySelector("#feedbackButton");
const logoutButton = document.querySelector("#logoutButton");

const form = document.querySelector("#memoForm");
const titleInput = document.querySelector("#memoTitle");
const bodyInput = document.querySelector("#memoBody");
const tagsInput = document.querySelector("#memoTags");
const tagSuggestList = document.querySelector("#tagSuggestList");
const noteNotebookSelect = document.querySelector("#noteNotebook");
const customNotebookInput = document.querySelector("#customNotebookInput");
const noteTemplateSelect = document.querySelector("#noteTemplateSelect");
const noteTypeSelect = document.querySelector("#noteTypeSelect");
const attachmentInput = document.querySelector("#noteAttachmentInput");
const attachmentList = document.querySelector("#attachmentList");
const reminderInput = document.querySelector("#memoReminder");
const autoTagButton = document.querySelector("#autoTagButton");
const autoTagStatus = document.querySelector("#autoTagStatus");
const browserAiPanel = document.querySelector(".browser-ai-panel");
const browserAiStatus = document.querySelector("#browserAiStatus");
const browserAiCheckButton = document.querySelector("#browserAiCheckButton");
const browserAiActionButtons = document.querySelectorAll("[data-ai-action]");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const notebookFilterSelect = document.querySelector("#notebookFilterSelect");
const dateViewSelect = document.querySelector("#dateViewSelect");
const memoList = document.querySelector("#memoList");
const memoCount = document.querySelector("#memoCount");
const tagFilterButton = document.querySelector("#tagFilterButton");
const tagFilterDialog = document.querySelector("#tagFilterDialog");
const tagFilterDialogCloseButton = document.querySelector("#tagFilterDialogCloseButton");
const tagFilterStatus = document.querySelector("#tagFilterStatus");
const tagFilter = document.querySelector("#tagFilter");
const pagination = document.querySelector("#pagination");
const favoriteFilterButton = document.querySelector("#favoriteFilterButton");
const darkModeToggle = document.querySelector("#darkModeToggle");
const brightnessInput = document.querySelector("#brightnessInput");
const brightnessValue = document.querySelector("#brightnessValue");
const clearButton = document.querySelector("#clearButton");
const saveButton = document.querySelector("#saveButton");
const formError = document.querySelector("#formError");
const template = document.querySelector("#memoTemplate");
const memoDialog = document.querySelector("#memoDialog");
const memoDialogTitle = document.querySelector("#memoDialogTitle");
const memoDialogTime = document.querySelector("#memoDialogTime");
const memoDialogBody = document.querySelector("#memoDialogBody");
const memoDialogSearch = document.querySelector("#memoDialogSearch");
const memoDialogSearchStatus = document.querySelector("#memoDialogSearchStatus");
const memoDialogToc = document.querySelector("#memoDialogToc");
const memoDialogSchedule = document.querySelector("#memoDialogSchedule");
const memoDialogTags = document.querySelector("#memoDialogTags");
const memoDialogAttachments = document.querySelector("#memoDialogAttachments");
const memoDialogReminder = document.querySelector("#memoDialogReminder");
const calendarDownloadStatus = document.querySelector("#calendarDownloadStatus");
const memoDialogCloseButton = document.querySelector("#memoDialogCloseButton");
const memoDialogPinButton = document.querySelector("#memoDialogPinButton");
const memoDialogFavoriteButton = document.querySelector("#memoDialogFavoriteButton");
const memoDialogDuplicateButton = document.querySelector("#memoDialogDuplicateButton");
const memoDialogExportMdButton = document.querySelector("#memoDialogExportMdButton");
const memoDialogExportTxtButton = document.querySelector("#memoDialogExportTxtButton");
const memoDialogEditButton = document.querySelector("#memoDialogEditButton");
const memoDialogArchiveButton = document.querySelector("#memoDialogArchiveButton");
const memoDialogDeleteButton = document.querySelector("#memoDialogDeleteButton");
const memoDialogOutlookButton = document.querySelector("#memoDialogOutlookButton");
const settingsButton = document.querySelector("#settingsButton");
const settingsDialog = document.querySelector("#settingsDialog");
const settingsDialogCloseButton = document.querySelector("#settingsDialogCloseButton");
const outlookReminderSelect = document.querySelector("#outlookReminderSelect");
const autoSaveToggle = document.querySelector("#autoSaveToggle");
const settingsClearLocalButton = document.querySelector("#settingsClearLocalButton");
const brightnessResetButton = document.querySelector("#brightnessResetButton");
const accentColorInput = document.querySelector("#accentColorInput");
const bgColorInput = document.querySelector("#bgColorInput");
const textColorInput = document.querySelector("#textColorInput");
const cardBgColorInput = document.querySelector("#cardBgColorInput");
const colorResetButton = document.querySelector("#colorResetButton");
const layoutGridRadio = document.querySelector("#layoutGridRadio");
const layoutListRadio = document.querySelector("#layoutListRadio");
const helpButton = document.querySelector("#helpButton");
const helpDialog = document.querySelector("#helpDialog");
const helpDialogCloseButton = document.querySelector("#helpDialogCloseButton");
const newMemoButton = document.querySelector("#newMemoButton");
const confirmDialog = document.querySelector("#confirmDialog");
const confirmCancel = document.querySelector("#confirmCancel");
const confirmOk = document.querySelector("#confirmOk");
const confirmDialogMessage = document.querySelector('#confirmDialogMessage');

const isLoginPage = Boolean(loginScreen);
const isMemoPage = Boolean(appScreen);
const MEMOS_PER_PAGE = 8;
const TITLE_MAX_LENGTH = 120;
const BODY_MAX_LENGTH = 10000;
const TAG_MAX_COUNT = 10;
const TAG_MAX_LENGTH = 24;
const NOTEBOOK_MAX_LENGTH = 32;
const DEFAULT_NOTEBOOK = "未分類";
const DEFAULT_NOTEBOOKS = ["未分類", "仕事", "学習", "個人", "議事録", "アイデア", "タスク"];
const NOTE_TYPES = new Set(["text", "checklist"]);
const AUTO_TAG_LIMIT = 5;
const ATTACHMENT_LIMIT = 3;
const ATTACHMENT_MAX_BYTES = 220 * 1024;
const OUTLOOK_EVENT_DURATION_MINUTES = 30;
const OUTLOOK_EVENT_START_HOUR = 8;
const DEFAULT_OUTLOOK_REMINDER_MINUTES = 15;
const OUTLOOK_REMINDER_OPTIONS = new Set([0, 5, 15, 30, 60, 1440]);
const ICS_LINE_BYTE_LIMIT = 72;
const BROWSER_AI_CONTEXT_LIMIT = 5200;
const BROWSER_AI_SESSION_OPTIONS = {
  expectedInputs: [{ type: "text", languages: ["ja", "en"] }],
  expectedOutputs: [{ type: "text", languages: ["ja"] }],
};
const LOCAL_AI_TASK_WORDS = [
  "確認",
  "対応",
  "作成",
  "共有",
  "連絡",
  "準備",
  "整理",
  "決める",
  "登録",
  "更新",
  "提出",
  "依頼",
  "検討",
  "チェック",
  "修正",
  "実装",
  "保存",
  "送信",
  "予約",
  "購入",
  "調査",
  "まとめる",
];
const DEFAULT_SORT_MODE = "updatedDesc";
const SORT_MODES = new Set(["updatedDesc", "updatedAsc", "titleAsc", "titleDesc"]);
const DEFAULT_DATE_VIEW = "active";
const DATE_VIEW_MODES = new Set(["active", "all", "today", "week", "month", "reminder", "archive"]);
const NOTE_TEMPLATES = {
  meeting: {
    title: "議事録",
    notebook: "議事録",
    type: "text",
    tags: ["会議", "議事録"],
    body: "# 会議概要\n- 日時:\n- 参加者:\n- 目的:\n\n## 決定事項\n- \n\n## ToDo\n- [ ] \n\n## 補足ノート\n",
  },
  daily: {
    title: "日報",
    notebook: "仕事",
    type: "text",
    tags: ["日報", "仕事"],
    body: "# 今日やったこと\n- \n\n## 気づき\n- \n\n## 明日やること\n- [ ] \n",
  },
  todo: {
    title: "ToDo",
    notebook: "タスク",
    type: "checklist",
    tags: ["タスク"],
    body: "# ToDo\n- [ ] \n- [ ] \n- [ ] \n",
  },
  idea: {
    title: "アイデア",
    notebook: "アイデア",
    type: "text",
    tags: ["アイデア"],
    body: "# アイデア\n\n## きっかけ\n\n## 試したいこと\n- \n\n## 次の一手\n- [ ] \n",
  },
  study: {
    title: "学習ノート",
    notebook: "学習",
    type: "text",
    tags: ["学習"],
    body: "# 学習ノート\n\n## 要点\n- \n\n## 疑問\n- \n\n## 復習チェック\n- [ ] \n",
  },
};
const DEFAULT_LIGHT_COLORS = {
  accent: "#7c3aed",
  bg: "#faf7ff",
  text: "#202124",
  cardBg: "#fffaff",
};
const DEFAULT_DARK_COLORS = {
  accent: "#c4b5fd",
  bg: "#15101f",
  text: "#eef3f1",
  cardBg: "#1f172c",
};
const AUTO_TAG_DICTIONARY = [
  { tag: "仕事", keywords: ["仕事", "業務", "会議", "打合せ", "打ち合わせ", "mtg", "見積", "依頼", "タスク", "todo", "締切", "顧客", "案件"] },
  { tag: "アイデア", keywords: ["アイデア", "案", "企画", "発想", "改善", "ネタ", "試したい"] },
  { tag: "勉強", keywords: ["勉強", "学習", "講座", "資格", "復習", "読書", "教材"] },
  { tag: "買い物", keywords: ["買い物", "購入", "注文", "欲しい", "ストア", "スーパー"] },
  { tag: "予定", keywords: ["予定", "予約", "日程", "カレンダー", "イベント", "アポ"] },
  { tag: "重要", keywords: ["重要", "至急", "急ぎ", "優先", "忘れない", "要確認"] },
  { tag: "開発", keywords: ["開発", "コード", "実装", "バグ", "テスト", "deploy", "api", "css", "html", "javascript"] },
  { tag: "デザイン", keywords: ["デザイン", "配色", "レイアウト", "ui", "ux", "画面"] },
  { tag: "資料", keywords: ["資料", "ドキュメント", "議事録", "メモ", "まとめ", "共有"] },
  { tag: "メール", keywords: ["メール", "返信", "送信", "連絡", "問い合わせ"] },
  { tag: "健康", keywords: ["健康", "病院", "薬", "運動", "睡眠", "体調"] },
  { tag: "旅行", keywords: ["旅行", "出張", "ホテル", "航空券", "移動", "旅程"] },
];
const AUTO_TAG_STOP_WORDS = new Set([
  "する",
  "した",
  "して",
  "です",
  "ます",
  "これ",
  "それ",
  "ため",
  "こと",
  "もの",
  "ノート",
  "メモ",
  "memo",
  "the",
  "and",
  "for",
  "with",
  "from",
]);

let auth = null;
let db = null;
let initializeApp = null;
let createUserWithEmailAndPassword = null;
let getAuth = null;
let GoogleAuthProvider = null;
let onAuthStateChanged = null;
let signInWithEmailAndPassword = null;
let signInWithPopup = null;
let signOut = null;
let updateProfile = null;
let collection = null;
let deleteDoc = null;
let doc = null;
let getDocs = null;
let getFirestore = null;
let onSnapshot = null;
let orderBy = null;
let query = null;
let setDoc = null;
let writeBatch = null;
let currentUser = null;
let unsubscribeMemos = null;
let memos = [];
let dataMode = "cloud";
let editingId = null;
let activeTag = "all";
let activeNotebook = "all";
let dateViewMode = DEFAULT_DATE_VIEW;
let emailAuthMode = "signin";
let showFavoritesOnly = false;
let openMemoId = null;
let currentPage = 1;
let sortMode = readSortMode();
let hasTriedRestoreOpenMemo = false;
let currentAttachments = [];
let dialogSearchQuery = "";
let browserAiBaseSession = null;
let browserAiBusy = false;

function readDisplaySettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(DISPLAY_SETTINGS_KEY));
    return {
      dark: Boolean(saved?.dark),
      brightness: Number(saved?.brightness) || 100,
    };
  } catch {
    return { dark: false, brightness: 100 };
  }
}

function readCustomColors() {
  try {
    const saved = JSON.parse(localStorage.getItem(CUSTOM_COLORS_KEY));
    return {
      accent: saved?.accent || DEFAULT_LIGHT_COLORS.accent,
      bg: saved?.bg || DEFAULT_LIGHT_COLORS.bg,
      text: saved?.text || DEFAULT_LIGHT_COLORS.text,
      cardBg: saved?.cardBg || DEFAULT_LIGHT_COLORS.cardBg,
    };
  } catch {
    return { ...DEFAULT_LIGHT_COLORS };
  }
}

function saveCustomColors(colors) {
  try {
    localStorage.setItem(CUSTOM_COLORS_KEY, JSON.stringify(colors));
  } catch {}
}

function applyCustomColors(colors) {
  const root = document.documentElement;
  const resolvedColors = displaySettings.dark ? DEFAULT_DARK_COLORS : colors;
  root.style.setProperty("--accent", resolvedColors.accent);
  root.style.setProperty("--bg", resolvedColors.bg);
  root.style.setProperty("--text", resolvedColors.text);
  root.style.setProperty("--card-bg", resolvedColors.cardBg);
  if (accentColorInput) accentColorInput.value = colors.accent;
  if (bgColorInput) bgColorInput.value = colors.bg;
  if (textColorInput) textColorInput.value = colors.text;
  if (cardBgColorInput) cardBgColorInput.value = colors.cardBg;
}

function cleanNotebook(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, NOTEBOOK_MAX_LENGTH);
}

function getMemoNotebook(memo) {
  return cleanNotebook(memo?.notebook) || DEFAULT_NOTEBOOK;
}

function getNotebookNames() {
  const names = new Set(DEFAULT_NOTEBOOKS);
  memos.forEach((memo) => names.add(getMemoNotebook(memo)));
  const custom = cleanNotebook(customNotebookInput?.value);
  if (custom) names.add(custom);
  return [...names].filter(Boolean).sort((a, b) => {
    if (a === DEFAULT_NOTEBOOK) return -1;
    if (b === DEFAULT_NOTEBOOK) return 1;
    return a.localeCompare(b, "ja-JP", { numeric: true, sensitivity: "base" });
  });
}

function fillSelectOptions(select, values, selectedValue, allLabel = null) {
  if (!select) return;
  const previous = selectedValue ?? select.value;
  select.innerHTML = "";
  if (allLabel) {
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = allLabel;
    select.append(allOption);
  }
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
  select.value = [...select.options].some((option) => option.value === previous)
    ? previous
    : select.options[0]?.value || "";
}

function renderNotebookControls() {
  const notebooks = getNotebookNames();
  fillSelectOptions(noteNotebookSelect, notebooks, noteNotebookSelect?.value || DEFAULT_NOTEBOOK);
  fillSelectOptions(notebookFilterSelect, notebooks, activeNotebook, "すべてのノートブック");
}

function getSelectedNotebook() {
  const custom = cleanNotebook(customNotebookInput?.value);
  if (custom) return custom;
  return cleanNotebook(noteNotebookSelect?.value) || DEFAULT_NOTEBOOK;
}

function getSelectedNoteType() {
  return NOTE_TYPES.has(noteTypeSelect?.value) ? noteTypeSelect.value : "text";
}

function normalizeAttachments(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => item && typeof item === "object")
    .slice(0, ATTACHMENT_LIMIT)
    .map((item) => ({
      id: item.id || crypto.randomUUID(),
      name: String(item.name || "添付ファイル").slice(0, 120),
      type: String(item.type || "application/octet-stream"),
      size: Number(item.size) || 0,
      dataUrl: String(item.dataUrl || ""),
      createdAt: item.createdAt || new Date().toISOString(),
    }))
    .filter((item) => item.dataUrl);
}

function formatFileSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

async function addAttachmentsFromFiles(files) {
  if (!files?.length) return;
  const remaining = ATTACHMENT_LIMIT - currentAttachments.length;
  if (remaining <= 0) {
    showFormError(`添付は${ATTACHMENT_LIMIT}件までです。`);
    return;
  }

  const nextFiles = [...files].slice(0, remaining);
  for (const file of nextFiles) {
    if (file.size > ATTACHMENT_MAX_BYTES) {
      showFormError(`「${file.name}」は大きすぎます。1ファイル${Math.round(ATTACHMENT_MAX_BYTES / 1024)}KB以内にしてください。`);
      continue;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file);
      currentAttachments.push({
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        dataUrl,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error(error);
      showFormError(`「${file.name}」の読み込みに失敗しました。`);
    }
  }
  renderAttachmentList();
}

function renderAttachmentList(target = attachmentList, attachments = currentAttachments, editable = true) {
  if (!target) return;
  target.innerHTML = "";
  if (!attachments.length) {
    target.hidden = true;
    return;
  }
  target.hidden = false;
  attachments.forEach((attachment) => {
    const item = document.createElement("div");
    item.className = "attachment-item";

    if (attachment.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = attachment.dataUrl;
      img.alt = attachment.name;
      item.append(img);
    } else {
      const icon = document.createElement("span");
      icon.className = "attachment-icon";
      icon.textContent = "FILE";
      item.append(icon);
    }

    const link = document.createElement("a");
    link.href = attachment.dataUrl;
    link.download = attachment.name;
    link.textContent = attachment.name;

    const meta = document.createElement("span");
    meta.textContent = formatFileSize(attachment.size);

    const text = document.createElement("div");
    text.append(link, meta);
    item.append(text);

    if (editable) {
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "secondary icon-button attachment-remove";
      remove.textContent = "×";
      remove.setAttribute("aria-label", `${attachment.name}を外す`);
      remove.addEventListener("click", () => {
        currentAttachments = currentAttachments.filter((item) => item.id !== attachment.id);
        renderAttachmentList();
      });
      item.append(remove);
    }

    target.append(item);
  });
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightEscapedText(value, query) {
  if (!query) return value;
  const pattern = new RegExp(`(${escapeRegExp(escapeHtml(query))})`, "gi");
  return value.replace(pattern, "<mark>$1</mark>");
}

function countTextMatches(text, query) {
  if (!query) return 0;
  const matches = String(text || "").match(new RegExp(escapeRegExp(query), "gi"));
  return matches?.length || 0;
}

function slugHeading(text, index) {
  const base = String(text || "")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return `note-heading-${base || "section"}-${index}`;
}

function extractHeadings(body) {
  let index = 0;
  return String(body || "")
    .split(/\r?\n/)
    .map((line) => {
      const match = line.match(/^(#{1,3})\s+(.+)$/);
      if (!match) return null;
      index += 1;
      return {
        id: slugHeading(match[2], index),
        level: match[1].length,
        text: match[2].trim(),
      };
    })
    .filter(Boolean);
}

function renderInlineMarkdown(text, query = "") {
  let output = highlightEscapedText(escapeHtml(text), query);
  output = output.replace(/`([^`]+)`/g, "<code>$1</code>");
  output = output.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  output = output.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  output = output.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  return output;
}

function renderMarkdown(body, options = {}) {
  const query = options.query || "";
  const lines = String(body || "").split(/\r?\n/);
  let headingIndex = 0;
  let inList = false;

  const closeList = () => {
    if (!inList) return "";
    inList = false;
    return "</ul>";
  };

  const html = lines.map((line) => {
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      headingIndex += 1;
      const level = Math.min(heading[1].length + 2, 5);
      const id = slugHeading(heading[2], headingIndex);
      return `${closeList()}<h${level} id="${id}">${renderInlineMarkdown(heading[2], query)}</h${level}>`;
    }

    const checklist = line.match(/^\s*[-*]\s+\[( |x|X)\]\s+(.+)$/);
    if (checklist) {
      const checked = checklist[1].toLowerCase() === "x";
      return `${closeList()}<div class="rendered-check"><input type="checkbox" disabled ${checked ? "checked" : ""}><span>${renderInlineMarkdown(checklist[2], query)}</span></div>`;
    }

    const bullet = line.match(/^\s*[-*]\s+(.+)$/);
    if (bullet) {
      const open = inList ? "" : "<ul>";
      inList = true;
      return `${open}<li>${renderInlineMarkdown(bullet[1], query)}</li>`;
    }

    if (!line.trim()) return `${closeList()}<br>`;
    return `${closeList()}<p>${renderInlineMarkdown(line, query)}</p>`;
  }).join("");

  return `${html}${closeList()}`;
}

function renderDialogToc(memo) {
  if (!memoDialogToc) return;
  const headings = extractHeadings(memo.body);
  memoDialogToc.innerHTML = "";
  memoDialogToc.hidden = headings.length === 0;
  headings.forEach((heading) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `toc-link level-${heading.level}`;
    button.textContent = heading.text;
    button.addEventListener("click", () => {
      memoDialogBody?.querySelector(`#${CSS.escape(heading.id)}`)?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
    memoDialogToc.append(button);
  });
}

function renderDialogBody(memo) {
  if (!memoDialogBody) return;
  memoDialogBody.innerHTML = renderMarkdown(memo.body, { query: dialogSearchQuery });
  renderDialogToc(memo);
  if (memoDialogSearchStatus) {
    const count = countTextMatches(memo.body, dialogSearchQuery);
    memoDialogSearchStatus.textContent = dialogSearchQuery ? `${count}件` : "";
  }
}

function getPopularTags() {
  const tagCounts = {};
  memos.forEach((memo) => {
    let tags = [];
    if (Array.isArray(memo.tags)) {
      tags = memo.tags;
    } else if (typeof memo.tags === 'string') {
      tags = memo.tags.split(",").map((t) => t.trim()).filter((t) => t);
    }
    tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([tag]) => tag);
}

function showTagSuggestions() {
  if (!tagSuggestList || !tagsInput) return;
  const currentTags = tagsInput.value.split(",").map((t) => t.trim()).filter((t) => t);
  const lastTag = currentTags[currentTags.length - 1] || "";
  const popularTags = getPopularTags();
  const filtered = popularTags.filter(
    (tag) => tag.toLowerCase().includes(lastTag.toLowerCase()) && !currentTags.includes(tag)
  );
  tagSuggestList.innerHTML = "";
  if (filtered.length > 0) {
    filtered.forEach((tag) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = tag;
      btn.style.cssText = "display:block;width:100%;padding:8px 12px;text-align:left;border:none;background:transparent;cursor:pointer;color:var(--text);border-bottom:1px solid var(--soft);font-size:14px;";
      btn.addEventListener("mouseover", () => {
        btn.style.background = "var(--soft)";
      });
      btn.addEventListener("mouseout", () => {
        btn.style.background = "transparent";
      });
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const tags = tagsInput.value.split(",").map((t) => t.trim()).filter((t) => t);
        tags[tags.length - 1] = tag;
        tagsInput.value = tags.join(", ") + ", ";
        tagsInput.focus();
        showTagSuggestions();
      });
      tagSuggestList.appendChild(btn);
    });
    tagSuggestList.style.display = filtered.length > 0 ? "block" : "none";
  } else {
    tagSuggestList.style.display = "none";
  }
}

function hideTagSuggestions() {
  if (tagSuggestList) tagSuggestList.style.display = "none";
}

function hideAutoTagStatus() {
  if (!autoTagStatus) return;
  autoTagStatus.hidden = true;
  autoTagStatus.textContent = "";
}

function showAutoTagStatus(message) {
  if (!autoTagStatus) return;
  autoTagStatus.textContent = message;
  autoTagStatus.hidden = false;
}

function cleanAutoTag(tag) {
  return String(tag || "")
    .trim()
    .replace(/^[#＃]+/, "")
    .replace(/\s+/g, " ");
}

function addAutoTagScore(scores, tag, score) {
  const cleaned = cleanAutoTag(tag);
  const lower = cleaned.toLowerCase();
  if (
    !cleaned ||
    cleaned.length < 2 ||
    cleaned.length > TAG_MAX_LENGTH ||
    AUTO_TAG_STOP_WORDS.has(lower)
  ) {
    return;
  }

  scores.set(cleaned, (scores.get(cleaned) || 0) + score);
}

function generateAutoTags(title, body) {
  const source = `${title || ""}\n${body || ""}`.trim();
  if (!source) return [];

  const lowerSource = source.toLowerCase();
  const scores = new Map();

  getPopularTags().forEach((tag, index) => {
    if (lowerSource.includes(tag.toLowerCase())) {
      addAutoTagScore(scores, tag, 42 - index);
    }
  });

  AUTO_TAG_DICTIONARY.forEach(({ tag, keywords }) => {
    const matched = keywords.some((keyword) => lowerSource.includes(keyword.toLowerCase()));
    if (matched) addAutoTagScore(scores, tag, 30);
  });

  const hashTags = [...source.matchAll(/[#＃]([\p{L}\p{N}_-]{2,24})/gu)].map((match) => match[1]);
  hashTags.forEach((tag) => addAutoTagScore(scores, tag, 36));

  source
    .split(/[\s,、。．，.!?！？:：;；()[\]{}<>「」『』【】《》\/\\|]+/u)
    .map((token) => token.trim())
    .filter(Boolean)
    .forEach((token) => {
      const inTitle = title?.toLowerCase().includes(token.toLowerCase());
      addAutoTagScore(scores, token, inTitle ? 12 : 5);
    });

  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ja-JP"))
    .slice(0, AUTO_TAG_LIMIT)
    .map(([tag]) => tag);
}

function applyAutoTags({ silent = false, onlyWhenEmpty = false } = {}) {
  if (!tagsInput) return [];

  const existingTags = parseTags(tagsInput.value);
  if (onlyWhenEmpty && existingTags.length > 0) return existingTags;

  const generatedTags = generateAutoTags(titleInput.value, bodyInput.value);
  const mergedTags = [...existingTags];

  generatedTags.forEach((tag) => {
    const exists = mergedTags.some((item) => item.toLowerCase() === tag.toLowerCase());
    if (!exists && mergedTags.length < TAG_MAX_COUNT) mergedTags.push(tag);
  });

  if (mergedTags.length > existingTags.length) {
    tagsInput.value = mergedTags.join(", ");
    if (!silent) showAutoTagStatus(`${mergedTags.length - existingTags.length}件のタグを追加しました。`);
  } else if (!silent) {
    showAutoTagStatus("追加できるタグ候補が見つかりませんでした。");
  }

  showTagSuggestions();
  return mergedTags;
}

function getBrowserLanguageModel() {
  return window.LanguageModel || window.ai?.languageModel || null;
}

function isMicrosoftEdge() {
  return /\bEdg\//.test(navigator.userAgent || "");
}

function getBrowserAiUnavailableMessage() {
  if (isMicrosoftEdge()) {
    return "Edge通常版では未対応の場合があります。Edge Canary/Dev 138.0.3309.2以降で edge://flags の「Prompt API for Phi mini」をEnabledにしてください。";
  }
  return "このブラウザではブラウザAIを利用できません。Chrome/Edgeの対応版で試してください。";
}

function getBrowserAiDeviceUnavailableMessage() {
  if (isMicrosoftEdge()) {
    return "この端末ではEdgeのブラウザAIを利用できません。Edge Canary/Devで edge://on-device-internals を開き、Device performance class が High 以上か確認してください。";
  }
  return "この端末ではブラウザAIを利用できません。PC版Chrome/Edge、十分な空き容量とメモリが必要です。";
}

function setBrowserAiStatus(message, state = "") {
  if (browserAiStatus) browserAiStatus.textContent = message;
  if (browserAiPanel) {
    if (state) browserAiPanel.dataset.state = state;
    else delete browserAiPanel.dataset.state;
  }
}

function setBrowserAiBusy(isBusy) {
  browserAiBusy = isBusy;
  browserAiActionButtons.forEach((button) => {
    button.disabled = isBusy;
  });
  if (browserAiCheckButton) browserAiCheckButton.disabled = isBusy;
}

function dispatchEditorInputEvents() {
  titleInput?.dispatchEvent(new Event("input", { bubbles: true }));
  bodyInput?.dispatchEvent(new Event("input", { bubbles: true }));
  tagsInput?.dispatchEvent(new Event("input", { bubbles: true }));
}

function createAiContext() {
  const title = titleInput?.value.trim() || "";
  const body = bodyInput?.value.trim() || "";
  const tags = parseTags(tagsInput?.value || "");
  const source = [
    title ? `タイトル: ${title}` : "",
    tags.length ? `タグ: ${tags.join(", ")}` : "",
    body ? `本文:\n${body}` : "",
  ].filter(Boolean).join("\n\n");

  return source.slice(0, BROWSER_AI_CONTEXT_LIMIT);
}

function cleanAiText(text) {
  return String(text || "")
    .replace(/^```(?:json|markdown|md|text)?\s*/i, "")
    .replace(/```$/i, "")
    .trim();
}

function cleanAiTitle(text) {
  return cleanAiText(text)
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*#\d.、\s]+/, "").trim())
    .filter(Boolean)[0]
    ?.replace(/^["「『]|["」』]$/g, "")
    .slice(0, TITLE_MAX_LENGTH) || "";
}

function extractAiTags(text) {
  const cleaned = cleanAiText(text);
  let candidates = [];

  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) candidates = parsed;
    else if (Array.isArray(parsed?.tags)) candidates = parsed.tags;
  } catch {}

  if (candidates.length === 0) {
    candidates = cleaned
      .replace(/^[\s\S]*?タグ[:：]/, "")
      .split(/[\n,、，]/);
  }

  const unique = [];
  candidates.forEach((item) => {
    const tag = cleanAutoTag(String(item).replace(/^[-*\d.、\s]+/, ""));
    if (
      tag &&
      tag.length <= TAG_MAX_LENGTH &&
      !unique.some((current) => current.toLowerCase() === tag.toLowerCase())
    ) {
      unique.push(tag);
    }
  });

  return unique.slice(0, AUTO_TAG_LIMIT);
}

function appendAiSection(title, content) {
  const cleaned = cleanAiText(content);
  if (!cleaned || !bodyInput) return false;

  const nextText = `${bodyInput.value.trimEnd()}\n\n## ${title}\n${cleaned}`.trim();
  if (nextText.length > BODY_MAX_LENGTH) {
    setBrowserAiStatus("AI結果を追加すると本文の上限を超えるため、短い内容で試してください。", "error");
    return false;
  }

  bodyInput.value = nextText;
  dispatchEditorInputEvents();
  return true;
}

function stripLocalAiMarkdown(text) {
  return String(text || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[-*+]\s+\[[ xX]\]\s+/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/[_*~>#|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shortenText(text, maxLength = 42) {
  const cleaned = stripLocalAiMarkdown(text);
  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength - 1).trim()}…`;
}

function splitLocalAiSegments(text) {
  return String(text || "")
    .replace(/\r/g, "\n")
    .split(/[\n。！？!?]+/u)
    .map((segment) => stripLocalAiMarkdown(segment))
    .filter((segment) => segment.length >= 4);
}

function scoreLocalAiSegment(segment, title = "") {
  const lower = segment.toLowerCase();
  let score = Math.min(segment.length, 80) / 8;
  if (title && lower.includes(title.toLowerCase())) score += 10;
  LOCAL_AI_TASK_WORDS.forEach((word) => {
    if (segment.includes(word)) score += 5;
  });
  AUTO_TAG_DICTIONARY.forEach(({ keywords }) => {
    keywords.forEach((keyword) => {
      if (lower.includes(keyword.toLowerCase())) score += 2;
    });
  });
  if (/[:：]$/.test(segment)) score -= 3;
  return score;
}

function pickLocalAiSegments(body, title = "", limit = 3) {
  const segments = splitLocalAiSegments(body);
  return segments
    .map((segment, index) => ({
      segment,
      index,
      score: scoreLocalAiSegment(segment, title),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .sort((a, b) => a.index - b.index)
    .map((item) => item.segment);
}

function createLocalAiTitle(title, body) {
  const heading = String(body || "").match(/^#{1,3}\s+(.+)$/m)?.[1];
  const base = heading || pickLocalAiSegments(body, title, 1)[0] || title || "新しいノート";
  const compact = shortenText(base.replace(/[、,].+$/, ""), 24);
  if (compact.length >= 6) return compact;
  const tags = generateAutoTags(title, body);
  return tags.length ? `${tags[0]}ノート` : compact || "新しいノート";
}

function createLocalAiSummary(title, body) {
  const segments = pickLocalAiSegments(body, title, 3);
  if (segments.length === 0) return "- 要約できる本文がまだありません。";
  return segments.map((segment) => `- ${shortenText(segment, 58)}`).join("\n");
}

function createLocalAiChecklist(title, body) {
  const taskPattern = new RegExp(LOCAL_AI_TASK_WORDS.join("|"));
  let segments = splitLocalAiSegments(body).filter((segment) => taskPattern.test(segment));
  if (segments.length === 0) segments = pickLocalAiSegments(body, title, 4);
  if (segments.length === 0) return "- [ ] ノート内容を確認する";
  return segments
    .slice(0, 6)
    .map((segment) => `- [ ] ${shortenText(segment, 52)}`)
    .join("\n");
}

function createLocalAiPolish(title, body) {
  const lines = String(body || "")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return "本文を入力すると、ここに整形案を作成します。";

  const normalizedLines = lines.map((line) => {
    if (/^[-*+]\s+/.test(line) || /^#{1,6}\s+/.test(line) || /^- \[[ xX]\]/.test(line)) {
      return line;
    }
    if (/^[・･]\s*/.test(line)) return `- ${line.replace(/^[・･]\s*/, "")}`;
    return line.replace(/\s+/g, " ");
  });

  const needsHeading = title && !normalizedLines.some((line) => /^#{1,6}\s+/.test(line));
  return [
    needsHeading ? `## ${shortenText(title, 36)}` : "",
    ...normalizedLines,
  ].filter(Boolean).join("\n");
}

function createLocalBrowserAiResult(action) {
  const title = titleInput?.value.trim() || "";
  const body = bodyInput?.value.trim() || "";

  if (action === "title") return createLocalAiTitle(title, body);
  if (action === "summary") return createLocalAiSummary(title, body);
  if (action === "tags") {
    const generated = generateAutoTags(title, body);
    if (generated.length > 0) return generated.join(", ");
    return pickLocalAiSegments(body, title, 2)
      .flatMap((segment) => segment.split(/[\s,、。．，.!?！？:：;；()[\]{}<>「」『』【】《》\/\\|]+/u))
      .map(cleanAutoTag)
      .filter((tag) => tag.length >= 2 && tag.length <= TAG_MAX_LENGTH)
      .slice(0, AUTO_TAG_LIMIT)
      .join(", ");
  }
  if (action === "checklist") return createLocalAiChecklist(title, body);
  if (action === "polish") return createLocalAiPolish(title, body);
  return "";
}

async function getBrowserAiAvailability(model) {
  if (!model?.availability) return "unavailable";
  try {
    return await model.availability(BROWSER_AI_SESSION_OPTIONS);
  } catch {
    try {
      return await model.availability();
    } catch {
      return "unavailable";
    }
  }
}

async function createBrowserAiSession(model) {
  const systemPrompt = [
    "あなたはNoteDeskのブラウザ内AIです。",
    "ノート作成を助けるため、日本語で簡潔に回答してください。",
    "ユーザーのノート本文に含まれない事実は追加しないでください。",
  ].join(" ");

  const createOptions = {
    ...BROWSER_AI_SESSION_OPTIONS,
    initialPrompts: [{ role: "system", content: systemPrompt }],
    monitor(monitorTarget) {
      monitorTarget.addEventListener("downloadprogress", (event) => {
        const percent = Math.round((event.loaded || 0) * 100);
        setBrowserAiStatus(`AIモデルを準備しています... ${percent}%`, "working");
      });
    },
  };

  try {
    return await model.create(createOptions);
  } catch (error) {
    if (error?.name === "NotSupportedError") throw error;
    return model.create({
      initialPrompts: [{ role: "system", content: systemPrompt }],
      monitor: createOptions.monitor,
    });
  }
}

async function ensureBrowserAiSession() {
  if (browserAiBaseSession) return browserAiBaseSession;

  const model = getBrowserLanguageModel();
  if (!model?.create) {
    throw new Error(getBrowserAiUnavailableMessage());
  }

  const availability = await getBrowserAiAvailability(model);
  if (availability === "unavailable") {
    throw new Error(getBrowserAiDeviceUnavailableMessage());
  }

  if (availability === "downloadable") {
    setBrowserAiStatus("AIモデルを準備します。初回はダウンロードに時間がかかる場合があります。", "working");
  } else if (availability === "downloading") {
    setBrowserAiStatus("AIモデルをダウンロード中です。完了までこの画面を開いたままお待ちください。", "working");
  } else {
    setBrowserAiStatus("ブラウザAIを準備しています。", "working");
  }

  browserAiBaseSession = await createBrowserAiSession(model);
  setBrowserAiStatus("ブラウザAIを利用できます。", "ready");
  return browserAiBaseSession;
}

async function promptBrowserAi(prompt) {
  const baseSession = await ensureBrowserAiSession();
  const session = typeof baseSession.clone === "function" ? await baseSession.clone() : baseSession;

  try {
    return cleanAiText(await session.prompt(prompt));
  } finally {
    if (session !== baseSession && typeof session.destroy === "function") {
      session.destroy();
    }
  }
}

async function checkBrowserAiAvailability() {
  if (browserAiBusy) return;
  setBrowserAiBusy(true);
  setBrowserAiStatus("ブラウザAIを確認しています。", "working");

  try {
    const model = getBrowserLanguageModel();
    if (!model?.create) {
      setBrowserAiStatus("通常版Edgeでも使える軽量ブラウザAIで利用できます。外部送信なしで端末内処理します。", "ready");
      return;
    }
    await ensureBrowserAiSession();
  } catch (error) {
    setBrowserAiStatus("組み込みAIは利用できませんが、軽量ブラウザAIで利用できます。外部送信なしで端末内処理します。", "ready");
  } finally {
    setBrowserAiBusy(false);
  }
}

async function runBrowserAiAction(action) {
  if (browserAiBusy) return;
  const context = createAiContext();
  if (!context) {
    setBrowserAiStatus("先にタイトルか本文を入力してください。", "error");
    return;
  }

  const prompts = {
    title: `次のノート内容から、日本語の短いタイトルを1つだけ作ってください。記号や説明は付けないでください。\n\n${context}`,
    summary: `次のノート内容を、日本語で3行以内に要約してください。箇条書きでも構いません。\n\n${context}`,
    tags: `次のノート内容に合う日本語タグを最大5個だけ提案してください。回答はタグ名だけをカンマ区切りにしてください。\n\n${context}`,
    checklist: `次のノート内容から、実行項目だけをMarkdownのチェックリストで作ってください。各行は "- [ ] " で始めてください。\n\n${context}`,
    polish: `次のノート本文を、意味を変えずに読みやすい日本語へ整えてください。見出しや箇条書きが有効ならMarkdownで整えてください。\n\n${context}`,
  };

  if (!prompts[action]) return;

  setBrowserAiBusy(true);
  setBrowserAiStatus("AIで作成しています。", "working");

  try {
    let usedLocalFallback = false;
    let result = "";

    if (getBrowserLanguageModel()?.create) {
      try {
        result = await promptBrowserAi(prompts[action]);
      } catch {
        result = createLocalBrowserAiResult(action);
        usedLocalFallback = true;
      }
    } else {
      result = createLocalBrowserAiResult(action);
      usedLocalFallback = true;
    }

    const statusPrefix = usedLocalFallback ? "軽量AIで" : "";

    if (action === "title") {
      const title = cleanAiTitle(result);
      if (!title) throw new Error("タイトルを作成できませんでした。");
      titleInput.value = title;
      dispatchEditorInputEvents();
      setBrowserAiStatus(`${statusPrefix}タイトルを作成しました。`, "ready");
    } else if (action === "tags") {
      const aiTags = extractAiTags(result);
      if (aiTags.length === 0) throw new Error("タグ候補を作成できませんでした。");
      tagsInput.value = mergeTags(tagsInput.value, aiTags);
      dispatchEditorInputEvents();
      showTagSuggestions();
      setBrowserAiStatus(`${statusPrefix}${aiTags.length}件のAIタグを追加しました。`, "ready");
    } else if (action === "summary") {
      if (appendAiSection("AI要約", result)) setBrowserAiStatus(`${statusPrefix}要約を本文に追加しました。`, "ready");
    } else if (action === "checklist") {
      if (appendAiSection("AIチェックリスト", result)) setBrowserAiStatus(`${statusPrefix}チェックリストを本文に追加しました。`, "ready");
    } else if (action === "polish") {
      if (appendAiSection("AI整形案", result)) setBrowserAiStatus(`${statusPrefix}整形案を本文に追加しました。`, "ready");
    }
  } catch (error) {
    const message = error?.name === "NotSupportedError"
      ? "日本語のブラウザAIに対応していない環境です。Edgeの場合はCanary/Dev版とPrompt API for Phi mini設定を確認してください。"
      : error?.message || "AI処理に失敗しました。少し短い本文で試してください。";
    setBrowserAiStatus(message, "error");
  } finally {
    setBrowserAiBusy(false);
  }
}

function readLayoutSetting() {
  const saved = localStorage.getItem(LAYOUT_SETTING_KEY);
  return (saved === "list") ? "list" : "grid";
}

function saveLayoutSetting(layout) {
  try {
    localStorage.setItem(LAYOUT_SETTING_KEY, layout);
  } catch {}
}

function applyLayoutSetting(layout) {
  if (memoList) {
    memoList.classList.toggle("list-view", layout === "list");
  }
  if (layoutGridRadio) layoutGridRadio.checked = layout === "grid";
  if (layoutListRadio) layoutListRadio.checked = layout === "list";
}

function padDatePart(value) {
  return String(value).padStart(2, "0");
}

function toReminderDate(value) {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;

  if (typeof value === "object") {
    if (typeof value.toDate === "function") {
      const date = value.toDate();
      return date instanceof Date && !Number.isNaN(date.getTime()) ? date : null;
    }

    const seconds = value.seconds ?? value._seconds;
    if (Number.isFinite(seconds)) {
      const milliseconds = seconds * 1000 + Math.floor((value.nanoseconds ?? value._nanoseconds ?? 0) / 1000000);
      const date = new Date(milliseconds);
      return Number.isNaN(date.getTime()) ? null : date;
    }
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function normalizeReminderAt(value) {
  const date = toReminderDate(value);
  if (!date) return "";
  return date.toISOString();
}

function toDatetimeLocalValue(value) {
  const date = toReminderDate(value);
  if (!date) return "";
  return [
    date.getFullYear(),
    padDatePart(date.getMonth() + 1),
    padDatePart(date.getDate()),
  ].join("-") + `T${padDatePart(date.getHours())}:${padDatePart(date.getMinutes())}`;
}

function formatReminderDate(value) {
  const date = toReminderDate(value);
  if (!date) return "";
  return new Intl.DateTimeFormat("ja-JP", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getReminderState(value) {
  const date = toReminderDate(value);
  if (!date) return "";
  return date.getTime() < Date.now() ? "due" : "upcoming";
}

function readOutlookReminderMinutes() {
  const raw = localStorage.getItem(OUTLOOK_REMINDER_SETTING_KEY);
  if (raw === null) return DEFAULT_OUTLOOK_REMINDER_MINUTES;
  const saved = Number(raw);
  return OUTLOOK_REMINDER_OPTIONS.has(saved) ? saved : DEFAULT_OUTLOOK_REMINDER_MINUTES;
}

function saveOutlookReminderMinutes(minutes) {
  localStorage.setItem(OUTLOOK_REMINDER_SETTING_KEY, String(minutes));
}

function applyOutlookReminderSetting(minutes) {
  outlookReminderMinutes = OUTLOOK_REMINDER_OPTIONS.has(minutes)
    ? minutes
    : DEFAULT_OUTLOOK_REMINDER_MINUTES;
  if (outlookReminderSelect) outlookReminderSelect.value = String(outlookReminderMinutes);
}

function formatIcsDate(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeIcsText(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\r|\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function foldIcsLine(line) {
  if (typeof TextEncoder === "undefined") return line;

  const encoder = new TextEncoder();
  const chunks = [];
  let current = "";
  let currentBytes = 0;

  for (const char of line) {
    const charBytes = encoder.encode(char).length;
    if (current && currentBytes + charBytes > ICS_LINE_BYTE_LIMIT) {
      chunks.push(current);
      current = char;
      currentBytes = charBytes;
    } else {
      current += char;
      currentBytes += charBytes;
    }
  }

  if (current) chunks.push(current);
  return chunks.map((chunk, index) => (index === 0 ? chunk : ` ${chunk}`)).join("\r\n");
}

function formatIcsTrigger(minutes) {
  if (!Number.isFinite(minutes) || minutes <= 0) return "PT0M";
  if (minutes % 1440 === 0) return `-P${minutes / 1440}D`;
  if (minutes % 60 === 0) return `-PT${minutes / 60}H`;
  return `-PT${minutes}M`;
}

function sanitizeFileName(value) {
  const cleaned = String(value || "")
    .trim()
    .replace(/[\\/:*?"<>|]+/g, "_")
    .replace(/\s+/g, "_")
    .slice(0, 60);
  return cleaned || "note-reminder";
}

function toOutlookEventStart(value) {
  const reminderDate = toReminderDate(value);
  if (!reminderDate) return null;
  return new Date(
    reminderDate.getFullYear(),
    reminderDate.getMonth(),
    reminderDate.getDate(),
    OUTLOOK_EVENT_START_HOUR,
    0,
    0,
    0,
  );
}

function buildOutlookIcs(memo) {
  const start = toOutlookEventStart(memo?.reminderAt);
  if (!start) return "";

  const end = new Date(start.getTime() + OUTLOOK_EVENT_DURATION_MINUTES * 60 * 1000);
  const title = memo.title?.trim() || "NoteDesk リマインダー";
  const description = [
    memo.body?.trim(),
    memo.tags?.length ? `タグ: ${memo.tags.join(", ")}` : "",
  ].filter(Boolean).join("\n\n") || title;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NoteDesk//Note Reminder//JA",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:note-desk-${memo.id || crypto.randomUUID()}@note-desk.local`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${escapeIcsText(title)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
  ];

  if (memo.tags?.length) {
    lines.push(`CATEGORIES:${memo.tags.map(escapeIcsText).join(",")}`);
  }

  lines.push(
    "BEGIN:VALARM",
    `TRIGGER:${formatIcsTrigger(outlookReminderMinutes)}`,
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcsText(title)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  );

  return `${lines.map(foldIcsLine).join("\r\n")}\r\n`;
}

function downloadOutlookIcs(memo) {
  const content = buildOutlookIcs(memo);
  if (!content) return false;

  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${sanitizeFileName(memo.title)}.ics`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return true;
}

function rememberOpenMemo(id) {
  if (!id || !currentUser) return;
  try {
    localStorage.setItem(
      LAST_OPEN_MEMO_KEY,
      JSON.stringify({
        id,
        dataMode,
        uid: currentUser.uid,
        openedAt: new Date().toISOString(),
      }),
    );
  } catch {}
}

function clearRememberedOpenMemo(id = null) {
  try {
    if (!id) {
      localStorage.removeItem(LAST_OPEN_MEMO_KEY);
      return;
    }

    const saved = JSON.parse(localStorage.getItem(LAST_OPEN_MEMO_KEY));
    if (saved?.id === id) localStorage.removeItem(LAST_OPEN_MEMO_KEY);
  } catch {
    localStorage.removeItem(LAST_OPEN_MEMO_KEY);
  }
}

function resetOpenMemoRestore() {
  hasTriedRestoreOpenMemo = false;
}

function restoreLastOpenMemoIfNeeded() {
  if (hasTriedRestoreOpenMemo || appLoading?.hidden === false || !currentUser) return;
  hasTriedRestoreOpenMemo = true;
  if (editingId || titleInput.value.trim() || bodyInput.value.trim() || tagsInput.value.trim()) return;

  try {
    const saved = JSON.parse(localStorage.getItem(LAST_OPEN_MEMO_KEY));
    if (!saved?.id) return;

    const isSameScope = saved.dataMode === dataMode && saved.uid === currentUser.uid;
    if (!isSameScope) {
      localStorage.removeItem(LAST_OPEN_MEMO_KEY);
      return;
    }

    const memo = memos.find((item) => item.id === saved.id);
    if (!memo) {
      localStorage.removeItem(LAST_OPEN_MEMO_KEY);
      return;
    }

    openMemoDialog(memo.id);
  } catch {
    localStorage.removeItem(LAST_OPEN_MEMO_KEY);
  }
}

let displaySettings = readDisplaySettings();
let customColors = readCustomColors();
let layoutSetting = readLayoutSetting();
let outlookReminderMinutes = readOutlookReminderMinutes();
let autoSaveIntervalId = null;
let autoSaveDebounceTimer = null;
let draftInputHandler = null;
let confirmAction = null;
let pendingDeleteMemoId = null;

async function loadFirebaseModules() {
  if (initializeApp) return;

  const [appModule, authModule, firestoreModule] = await Promise.all([
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js`),
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`),
  ]);

  ({ initializeApp } = appModule);
  ({
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } = authModule);
  ({
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    writeBatch,
  } = firestoreModule);
}

function pageUrl(fileName) {
  const url = new URL(window.location.href);
  url.pathname = url.pathname.replace(/[^/]*$/, fileName);
  url.search = "";
  url.hash = "";
  return url.href;
}

function goToLogin() {
  window.location.replace(pageUrl("index.html"));
}

function goToLocalStart() {
  window.location.replace(pageUrl("local.html"));
}

function goToMemos() {
  window.location.replace(pageUrl("memo.html"));
}

function isLocalModeEnabled() {
  return localStorage.getItem(LOCAL_MODE_KEY) === "true";
}

function enableLocalMode() {
  localStorage.setItem(LOCAL_MODE_KEY, "true");
}

function disableLocalMode() {
  localStorage.removeItem(LOCAL_MODE_KEY);
}

function useLocalOnlyEntry() {
  return localStorage.getItem(LOCAL_ENTRY_KEY) === "true";
}

function disableLocalOnlyEntry() {
  localStorage.removeItem(LOCAL_ENTRY_KEY);
}

function memosCollectionRef(uid) {
  return collection(db, "users", uid, "notes");
}

function memoDocRef(uid, memoId) {
  return doc(db, "users", uid, "notes", memoId);
}

function showLoginError(message) {
  if (!loginError) return;
  loginError.textContent = message;
  loginError.hidden = !message;
}

function clearLoginError() {
  showLoginError("");
}

function showFormError(message) {
  if (!formError) return;
  formError.textContent = message;
  formError.hidden = !message;
}

function clearFormError() {
  showFormError("");
}

function setAuthLoading(isLoading) {
  if (!isLoginPage) return;
  googleLoginButton.disabled = isLoading;
  emailSubmitButton.disabled = isLoading;
  emailSignInTab.disabled = isLoading;
  emailSignUpTab.disabled = isLoading;
  loginHint.hidden = !isLoading;
}

function setAppLoading(isLoading) {
  if (appLoading) appLoading.hidden = !isLoading;
}

function setUsernameSaving(isSaving) {
  if (!isMemoPage) return;
  usernameInput.disabled = isSaving;
  usernameSaveButton.disabled = isSaving;
}

function normalizeMemo(data, fallbackId = crypto.randomUUID()) {
  return {
    id: data?.id || fallbackId,
    title: data?.title ?? "",
    body: data?.body ?? "",
    tags: Array.isArray(data?.tags) ? data.tags : [],
    notebook: cleanNotebook(data?.notebook) || DEFAULT_NOTEBOOK,
    type: NOTE_TYPES.has(data?.type) ? data.type : "text",
    archived: Boolean(data?.archived),
    attachments: normalizeAttachments(data?.attachments),
    reminderAt: normalizeReminderAt(data?.reminderAt),
    updatedAt: data?.updatedAt ?? new Date().toISOString(),
    favorite: Boolean(data?.favorite),
    pinned: Boolean(data?.pinned),
  };
}

function sortMemos(items) {
  return [...items].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

function readSortMode() {
  const saved = localStorage.getItem(SORT_SETTING_KEY);
  return SORT_MODES.has(saved) ? saved : DEFAULT_SORT_MODE;
}

function saveSortMode() {
  localStorage.setItem(SORT_SETTING_KEY, sortMode);
}

function compareTitle(a, b) {
  return a.title.localeCompare(b.title, "ja-JP", { numeric: true, sensitivity: "base" });
}

function compareUpdatedAt(a, b) {
  return new Date(a.updatedAt) - new Date(b.updatedAt);
}

function sortVisibleMemos(items) {
  return [...items].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;

    if (sortMode === "updatedAsc") return compareUpdatedAt(a, b);
    if (sortMode === "titleAsc") return compareTitle(a, b) || compareUpdatedAt(b, a);
    if (sortMode === "titleDesc") return compareTitle(b, a) || compareUpdatedAt(b, a);
    return compareUpdatedAt(b, a);
  });
}

function readJsonArray(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadLocalMemos() {
  const savedMemos = readJsonArray(LOCAL_MEMOS_KEY);
  if (savedMemos.length > 0) {
    return sortMemos(savedMemos.map((memo) => normalizeMemo(memo)));
  }

  const legacyMemos = readJsonArray(LEGACY_STORAGE_KEY);
  if (legacyMemos.length > 0) {
    const normalized = sortMemos(legacyMemos.map((memo) => normalizeMemo(memo)));
    localStorage.setItem(LOCAL_MEMOS_KEY, JSON.stringify(normalized));
    return normalized;
  }

  return [];
}

function saveLocalMemos() {
  localStorage.setItem(LOCAL_MEMOS_KEY, JSON.stringify(sortMemos(memos)));
}

function showLogin() {
  stopMemoSubscription();
  currentUser = null;
  memos = [];
  if (loginScreen) loginScreen.hidden = false;
  clearLoginError();
  setAuthLoading(false);
  googleLoginButton?.focus();
}

function getDisplayName(user) {
  return user.displayName || user.email?.split("@")[0] || "ユーザー";
}

function updateUserDisplay(user) {
  if (!isMemoPage) return;
  const displayName = getDisplayName(user);
  userGreeting.textContent = `${displayName}さん`;
  usernameInput.value = displayName;
}

function normalizeBrightness(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 100;
  return Math.min(120, Math.max(80, number));
}

function saveDisplaySettings() {
  localStorage.setItem(DISPLAY_SETTINGS_KEY, JSON.stringify(displaySettings));
}

function applyDisplaySettings() {
  if (!isMemoPage) return;

  displaySettings = {
    dark: Boolean(displaySettings.dark),
    brightness: normalizeBrightness(displaySettings.brightness),
  };

  document.documentElement.dataset.theme = displaySettings.dark ? "dark" : "light";
  document.documentElement.style.setProperty("--app-brightness", `${displaySettings.brightness}%`);
  darkModeToggle.checked = displaySettings.dark;
  brightnessInput.value = String(displaySettings.brightness);
  brightnessValue.textContent = `${displaySettings.brightness}%`;
  applyCustomColors(customColors);
}

function stopMemoSubscription() {
  if (unsubscribeMemos) {
    unsubscribeMemos();
    unsubscribeMemos = null;
  }
}

function startMemoSubscription(user) {
  stopMemoSubscription();

  const q = query(memosCollectionRef(user.uid), orderBy("updatedAt", "desc"));

  unsubscribeMemos = onSnapshot(
    q,
    (snapshot) => {
      memos = snapshot.docs.map((document) => {
        const data = document.data();
        return {
          id: document.id,
          title: data.title ?? "",
          body: data.body ?? "",
          tags: Array.isArray(data.tags) ? data.tags : [],
          notebook: cleanNotebook(data.notebook) || DEFAULT_NOTEBOOK,
          type: NOTE_TYPES.has(data.type) ? data.type : "text",
          archived: Boolean(data.archived),
          attachments: normalizeAttachments(data.attachments),
          reminderAt: normalizeReminderAt(data.reminderAt),
          updatedAt: data.updatedAt ?? new Date().toISOString(),
          favorite: Boolean(data.favorite),
          pinned: Boolean(data.pinned),
        };
      });
      setAppLoading(false);
      render();
    },
    (error) => {
      console.error(error);
      setAppLoading(false);
      showFormError("ノートの読み込みに失敗しました。Firestore の設定を確認してください。");
    },
  );
}

async function migrateLocalMemosIfNeeded(uid) {
  const keys = [LEGACY_STORAGE_KEY, `note-desk-notes-${uid}`];
  let localMemos = [];

  for (const key of keys) {
    const saved = localStorage.getItem(key);
    if (!saved) continue;
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        localMemos = parsed;
        break;
      }
    } catch {
      // ignore
    }
  }

  if (localMemos.length === 0) return;

  const existing = await getDocs(memosCollectionRef(uid));
  if (!existing.empty) return;

  const batch = writeBatch(db);
  localMemos.forEach((memo) => {
    const id = memo.id || crypto.randomUUID();
    batch.set(memoDocRef(uid, id), {
      title: memo.title ?? "",
      body: memo.body ?? "",
      tags: Array.isArray(memo.tags) ? memo.tags : [],
      notebook: cleanNotebook(memo.notebook) || DEFAULT_NOTEBOOK,
      type: NOTE_TYPES.has(memo.type) ? memo.type : "text",
      archived: Boolean(memo.archived),
      attachments: normalizeAttachments(memo.attachments),
      reminderAt: normalizeReminderAt(memo.reminderAt),
      updatedAt: memo.updatedAt ?? new Date().toISOString(),
      favorite: Boolean(memo.favorite),
      pinned: Boolean(memo.pinned),
    });
  });
  await batch.commit();
}

async function enterApp(user) {
  dataMode = "cloud";
  currentUser = user;
  if (appScreen) appScreen.hidden = false;
  updateUserDisplay(user);
  editingId = null;
  activeTag = "all";
  activeNotebook = "all";
  dateViewMode = DEFAULT_DATE_VIEW;
  showFavoritesOnly = false;
  resetOpenMemoRestore();
  resetPagination();
  searchInput.value = "";
  setAppLoading(true);
  clearFormError();
  resetForm();

  try {
    await migrateLocalMemosIfNeeded(user.uid);
    startMemoSubscription(user);
  } catch (error) {
    console.error(error);
    setAppLoading(false);
    showFormError("ノートの準備に失敗しました。");
  }
}

function enterLocalApp() {
  dataMode = "local";
  currentUser = {
    uid: "local",
    displayName: localStorage.getItem(LOCAL_DISPLAY_NAME_KEY) || "ローカル",
  };
  if (appScreen) appScreen.hidden = false;
  updateUserDisplay(currentUser);
  if (logoutButton) logoutButton.textContent = useLocalOnlyEntry() ? "ログイン画面に戻る" : "モード選択へ";
  editingId = null;
  activeTag = "all";
  activeNotebook = "all";
  dateViewMode = DEFAULT_DATE_VIEW;
  showFavoritesOnly = false;
  resetOpenMemoRestore();
  resetPagination();
  searchInput.value = "";
  memos = loadLocalMemos();
  setAppLoading(false);
  clearFormError();
  resetForm();
  render();
}

async function logout() {
  stopMemoSubscription();
  if (dataMode === "cloud" && auth) await signOut(auth);
  const shouldReturnToLocalStart = dataMode === "local" && useLocalOnlyEntry();
  if (dataMode === "local") disableLocalMode();
  memos = [];
  dataMode = "cloud";
  editingId = null;
  activeTag = "all";
  showFavoritesOnly = false;
  openMemoId = null;
  resetPagination();
  if (shouldReturnToLocalStart) {
    goToLocalStart();
    return;
  }
  goToLogin();
}

function openFeedbackForm() {
  if (!isFeedbackConfigured()) {
    showFormError("要望フォームURLが未設定です。FEEDBACK_SETUP.md を参照してください。");
    return;
  }

  window.open(feedbackConfig.formUrl.trim(), "_blank", "noopener,noreferrer");
}

async function updateUsername(event) {
  event.preventDefault();
  if (!currentUser) return;

  const displayName = usernameInput.value.trim().replace(/\s+/g, " ");
  if (!displayName) {
    showFormError("ユーザー名を入力してください。");
    usernameInput.focus();
    return;
  }

  clearFormError();
  setUsernameSaving(true);

  try {
    if (dataMode === "local") {
      localStorage.setItem(LOCAL_DISPLAY_NAME_KEY, displayName);
      currentUser.displayName = displayName;
    } else {
      await updateProfile(currentUser, { displayName });
    }
    updateUserDisplay({ ...currentUser, displayName });
  } catch (error) {
    console.error(error);
    showFormError("ユーザー名の変更に失敗しました。");
  } finally {
    setUsernameSaving(false);
  }
}

function parseAuthError(error) {
  const code = error?.code ?? "";
  const messages = {
    "auth/popup-blocked": "ポップアップがブロックされました。ブラウザで許可してください。",
    "auth/unauthorized-domain": "このドメインは Firebase で許可されていません。",
    "auth/popup-closed-by-user": "ログインがキャンセルされました。",
    "auth/email-already-in-use": "このメールアドレスはすでに登録されています。ログインしてください。",
    "auth/invalid-email": "メールアドレスの形式が正しくありません。",
    "auth/weak-password": "パスワードは6文字以上にしてください。",
    "auth/user-not-found": "アカウントが見つかりません。新規登録してください。",
    "auth/wrong-password": "パスワードが違います。",
    "auth/invalid-credential": "メールアドレスまたはパスワードが正しくありません。",
    "auth/too-many-requests": "試行回数が多すぎます。しばらく待ってから再度お試しください。",
  };

  return messages[code] || error?.message || "ログインに失敗しました。";
}

async function loginWithGoogle() {
  if (!auth) return;

  clearLoginError();
  setAuthLoading(true);

  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (error) {
    showLoginError(parseAuthError(error));
    setAuthLoading(false);
  }
}

async function loginWithEmail(event) {
  event.preventDefault();
  if (!auth) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email) {
    showLoginError("メールアドレスを入力してください。");
    return;
  }

  if (password.length < 6) {
    showLoginError("パスワードは6文字以上にしてください。");
    return;
  }

  clearLoginError();
  setAuthLoading(true);

  try {
    if (emailAuthMode === "signup") {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
  } catch (error) {
    showLoginError(parseAuthError(error));
    setAuthLoading(false);
  }
}

function setEmailAuthMode(mode) {
  if (!isLoginPage) return;
  emailAuthMode = mode;
  const isSignIn = mode === "signin";
  emailSignInTab.classList.toggle("active", isSignIn);
  emailSignUpTab.classList.toggle("active", !isSignIn);
  emailSignInTab.setAttribute("aria-selected", String(isSignIn));
  emailSignUpTab.setAttribute("aria-selected", String(!isSignIn));
  emailSubmitButton.textContent = isSignIn ? "メールでログイン" : "アカウントを作成";
  passwordInput.autocomplete = isSignIn ? "current-password" : "new-password";
}

function parseTags(text) {
  return text
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function insertMarkdown(action) {
  if (!bodyInput) return;
  const start = bodyInput.selectionStart ?? bodyInput.value.length;
  const end = bodyInput.selectionEnd ?? start;
  const selected = bodyInput.value.slice(start, end);
  const presets = {
    heading: `## ${selected || "見出し"}`,
    bold: `**${selected || "強調したい言葉"}**`,
    bullet: `- ${selected || "箇条書き"}`,
    check: `- [ ] ${selected || "チェック項目"}`,
    link: `[${selected || "リンク"}](https://example.com)`,
  };
  const insertText = presets[action];
  if (!insertText) return;
  bodyInput.setRangeText(insertText, start, end, "end");
  bodyInput.focus();
  bodyInput.dispatchEvent(new Event("input", { bubbles: true }));
}

function mergeTags(existingText, nextTags) {
  const tags = parseTags(existingText);
  nextTags.forEach((tag) => {
    if (!tags.some((item) => item.toLowerCase() === tag.toLowerCase()) && tags.length < TAG_MAX_COUNT) {
      tags.push(tag);
    }
  });
  return tags.join(", ");
}

function applyTemplate(templateId) {
  const template = NOTE_TEMPLATES[templateId];
  if (!template) return;

  if (!titleInput.value.trim()) {
    titleInput.value = template.title;
  }
  if (!bodyInput.value.trim()) {
    bodyInput.value = template.body;
  } else {
    bodyInput.value = `${bodyInput.value.trimEnd()}\n\n${template.body}`;
  }
  if (tagsInput) tagsInput.value = mergeTags(tagsInput.value, template.tags);
  renderNotebookControls();
  if (noteNotebookSelect) noteNotebookSelect.value = template.notebook;
  if (customNotebookInput) customNotebookInput.value = "";
  if (noteTypeSelect) noteTypeSelect.value = template.type;
  titleInput.dispatchEvent(new Event("input", { bubbles: true }));
  bodyInput.dispatchEvent(new Event("input", { bubbles: true }));
}

function validateMemoInput(title, body, tags) {
  if (!title) {
    return { message: "タイトルを入力してください。", target: titleInput };
  }

  if (title.length > TITLE_MAX_LENGTH) {
    return { message: `タイトルは${TITLE_MAX_LENGTH}文字以内にしてください。`, target: titleInput };
  }

  if (!body) {
    return { message: "本文を入力してください。", target: bodyInput };
  }

  if (body.length > BODY_MAX_LENGTH) {
    return { message: `本文は${BODY_MAX_LENGTH}文字以内にしてください。`, target: bodyInput };
  }

  if (tags.length > TAG_MAX_COUNT) {
    return { message: `タグは${TAG_MAX_COUNT}個以内にしてください。`, target: tagsInput };
  }

  const longTag = tags.find((tag) => tag.length > TAG_MAX_LENGTH);
  if (longTag) {
    return { message: `タグは1つ${TAG_MAX_LENGTH}文字以内にしてください。`, target: tagsInput };
  }

  const notebook = getSelectedNotebook();
  if (notebook.length > NOTEBOOK_MAX_LENGTH) {
    return { message: `ノートブック名は${NOTEBOOK_MAX_LENGTH}文字以内にしてください。`, target: customNotebookInput || noteNotebookSelect };
  }

  return null;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ja-JP", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function startOfLocalDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function matchesDateView(memo) {
  if (dateViewMode === "all") return true;
  if (dateViewMode === "archive") return Boolean(memo.archived);
  if (memo.archived) return false;
  if (dateViewMode === "active") return true;
  if (dateViewMode === "reminder") return Boolean(toReminderDate(memo.reminderAt));

  const updated = new Date(memo.updatedAt);
  const today = startOfLocalDay();
  const noteDay = startOfLocalDay(updated);
  if (dateViewMode === "today") return noteDay.getTime() === today.getTime();
  if (dateViewMode === "week") {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    return noteDay >= weekStart && noteDay < weekEnd;
  }
  if (dateViewMode === "month") {
    return updated.getFullYear() === today.getFullYear() && updated.getMonth() === today.getMonth();
  }
  return true;
}

function getFilteredMemos() {
  const keyword = searchInput.value.trim().toLowerCase();

  return memos.filter((memo) => {
    const attachmentText = normalizeAttachments(memo.attachments).map((file) => file.name).join(" ");
    const matchesKeyword =
      memo.title.toLowerCase().includes(keyword) ||
      memo.body.toLowerCase().includes(keyword) ||
      memo.tags.some((tag) => tag.toLowerCase().includes(keyword)) ||
      getMemoNotebook(memo).toLowerCase().includes(keyword) ||
      attachmentText.toLowerCase().includes(keyword) ||
      formatReminderDate(memo.reminderAt).toLowerCase().includes(keyword);
    const matchesTag = activeTag === "all" || memo.tags.includes(activeTag);
    const matchesNotebook = activeNotebook === "all" || getMemoNotebook(memo) === activeNotebook;
    const matchesFavorite = !showFavoritesOnly || memo.favorite;
    return matchesKeyword && matchesTag && matchesNotebook && matchesFavorite && matchesDateView(memo);
  });
}

function resetPagination() {
  currentPage = 1;
}

function getTotalPages(totalItems) {
  return Math.max(1, Math.ceil(totalItems / MEMOS_PER_PAGE));
}

function renderFavoriteFilter() {
  favoriteFilterButton.classList.toggle("active", showFavoritesOnly);
  favoriteFilterButton.setAttribute("aria-pressed", String(showFavoritesOnly));
}

function renderSortControl() {
  if (sortSelect) sortSelect.value = SORT_MODES.has(sortMode) ? sortMode : DEFAULT_SORT_MODE;
  if (dateViewSelect) dateViewSelect.value = DATE_VIEW_MODES.has(dateViewMode) ? dateViewMode : DEFAULT_DATE_VIEW;
}

function renderPagination(totalItems) {
  const totalPages = getTotalPages(totalItems);
  pagination.innerHTML = "";
  pagination.hidden = totalItems <= MEMOS_PER_PAGE;

  if (pagination.hidden) return;

  const status = document.createElement("span");
  status.className = "pagination-status";
  status.textContent = `${currentPage} / ${totalPages}`;

  const prevButton = document.createElement("button");
  prevButton.type = "button";
  prevButton.className = "secondary";
  prevButton.textContent = "前へ";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    currentPage = Math.max(1, currentPage - 1);
    renderMemos();
  });

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "secondary";
  nextButton.textContent = "次へ";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    currentPage = Math.min(totalPages, currentPage + 1);
    renderMemos();
  });

  pagination.append(prevButton, status, nextButton);
}

function renderTags() {
  const tags = [...new Set(memos.flatMap((memo) => memo.tags))].sort();
  if (activeTag !== "all" && !tags.includes(activeTag)) {
    activeTag = "all";
  }

  tagFilter.innerHTML = "";
  if (tagFilterButton) {
    const label = activeTag === "all" ? "タグ絞り込み" : `タグ: ${activeTag}`;
    tagFilterButton.textContent = label;
    tagFilterButton.classList.toggle("active", activeTag !== "all");
    tagFilterButton.setAttribute("aria-pressed", String(activeTag !== "all"));
  }
  if (tagFilterStatus) {
    tagFilterStatus.textContent =
      activeTag === "all" ? "すべてのノートを表示中" : `「${activeTag}」で絞り込み中`;
  }

  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.textContent = "すべて";
  allButton.classList.toggle("active", activeTag === "all");
  allButton.addEventListener("click", () => {
    activeTag = "all";
    resetPagination();
    render();
    closeTagFilterDialog();
  });
  tagFilter.append(allButton);

  tags.forEach((tag) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = tag;
    button.classList.toggle("active", activeTag === tag);
    button.addEventListener("click", () => {
      activeTag = tag;
      resetPagination();
      render();
      closeTagFilterDialog();
    });
    tagFilter.append(button);
  });
}

function openTagFilterDialog() {
  if (!tagFilterDialog) return;
  tagFilterDialog.hidden = false;
  tagFilterButton?.setAttribute("aria-expanded", "true");
  document.body.classList.add("dialog-open");

  const activeButton = tagFilter.querySelector("button.active");
  activeButton?.focus();
  if (!activeButton) tagFilterDialogCloseButton?.focus();
}

function closeTagFilterDialog() {
  if (!tagFilterDialog || tagFilterDialog.hidden) return;
  tagFilterDialog.hidden = true;
  tagFilterButton?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("dialog-open");
  tagFilterButton?.focus();
}

function renderMemos() {
  const filteredMemos = sortVisibleMemos(getFilteredMemos());
  const totalPages = getTotalPages(filteredMemos.length);
  currentPage = Math.min(currentPage, totalPages);
  const startIndex = (currentPage - 1) * MEMOS_PER_PAGE;
  const pageMemos = filteredMemos.slice(startIndex, startIndex + MEMOS_PER_PAGE);

  memoList.innerHTML = "";
  memoCount.textContent = `${filteredMemos.length}件`;
  if (openMemoId) updateMemoDialog(openMemoId);

  if (pageMemos.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = appLoading.hidden === false ? "読み込み中…" : "表示できるノートがありません";
    memoList.append(empty);
    renderPagination(filteredMemos.length);
    return;
  }

  pageMemos.forEach((memo) => {
    const item = template.content.cloneNode(true);
    const card = item.querySelector(".memo-card");
    const title = item.querySelector("h3");
    const time = item.querySelector("time");
    const body = item.querySelector(".memo-body");
    const tags = item.querySelector(".memo-tags");
    const notebookChip = item.querySelector(".notebook-chip");
    const noteTypeChip = item.querySelector(".note-type-chip");
    const attachmentSummary = item.querySelector(".attachment-summary");
    const reminder = getOrCreateCardReminder(card);
    const pinButton = item.querySelector(".pin-button");
    const favoriteButton = item.querySelector(".favorite-button");
    const openButton = item.querySelector(".open-button");
    const editButton = item.querySelector(".edit-button");
    const duplicateButton = item.querySelector(".duplicate-button");
    const exportButton = item.querySelector(".export-button");
    const archiveButton = item.querySelector(".archive-button");
    const deleteButton = item.querySelector(".delete-button");
    const isFavorite = Boolean(memo.favorite);
    const isPinned = Boolean(memo.pinned);

    title.textContent = memo.title;
    time.textContent = formatDate(memo.updatedAt);
    time.dateTime = memo.updatedAt;
    body.innerHTML = renderMarkdown(memo.body);
    if (notebookChip) notebookChip.textContent = getMemoNotebook(memo);
    if (noteTypeChip) noteTypeChip.textContent = memo.type === "checklist" ? "チェックリスト" : "ノート";
    const attachments = normalizeAttachments(memo.attachments);
    if (attachmentSummary) {
      attachmentSummary.hidden = attachments.length === 0;
      attachmentSummary.textContent = attachments.length ? `添付 ${attachments.length}件` : "";
    }
    const reminderText = formatReminderDate(memo.reminderAt);
    if (reminder) {
      reminder.hidden = !reminderText;
      reminder.textContent = reminderText ? `リマインダー: ${reminderText}` : "";
      reminder.dataset.state = getReminderState(memo.reminderAt);
    }
    card.classList.toggle("is-pinned", isPinned);
    card.classList.toggle("is-favorite", isFavorite);
    card.classList.toggle("is-archived", Boolean(memo.archived));
    pinButton.textContent = isPinned ? "固定中" : "ピン";
    pinButton.setAttribute("aria-pressed", String(isPinned));
    pinButton.setAttribute("aria-label", isPinned ? "ピン留めを外す" : "ピン留めする");
    favoriteButton.textContent = isFavorite ? "★" : "☆";
    favoriteButton.setAttribute("aria-pressed", String(isFavorite));
    favoriteButton.setAttribute("aria-label", isFavorite ? "お気に入りから外す" : "お気に入りに追加");
    tags.innerHTML = "";

    memo.tags.forEach((tag) => {
      const tagItem = document.createElement("span");
      tagItem.textContent = tag;
      tags.append(tagItem);
    });

    openButton.addEventListener("click", () => openMemoDialog(memo.id));
    pinButton.addEventListener("click", () => togglePinnedMemo(memo.id));
    favoriteButton.addEventListener("click", () => toggleFavoriteMemo(memo.id));
    editButton.addEventListener("click", () => startEditing(memo.id));
    duplicateButton?.addEventListener("click", () => duplicateMemo(memo.id));
    exportButton?.addEventListener("click", () => exportMemo(memo.id, "md"));
    archiveButton?.addEventListener("click", () => toggleArchivedMemo(memo.id));
    if (archiveButton) archiveButton.textContent = memo.archived ? "戻す" : "保管";
    deleteButton.addEventListener("click", () => deleteMemo(memo.id));
    card.addEventListener("dblclick", () => openMemoDialog(memo.id));
    memoList.append(card);
  });

  renderPagination(filteredMemos.length);
}

function getOrCreateCardReminder(card) {
  let reminder = card.querySelector(".memo-reminder");
  if (reminder) return reminder;

  reminder = document.createElement("p");
  reminder.className = "memo-reminder";
  reminder.hidden = true;

  const preview = card.querySelector(".memo-preview");
  if (preview) {
    card.insertBefore(reminder, preview);
  } else {
    card.append(reminder);
  }

  return reminder;
}

function render() {
  renderNotebookControls();
  renderFavoriteFilter();
  renderSortControl();
  renderTags();
  renderMemos();
  restoreLastOpenMemoIfNeeded();
}

function resetForm() {
  form.reset();
  editingId = null;
  currentAttachments = [];
  if (noteTypeSelect) noteTypeSelect.value = "text";
  if (customNotebookInput) customNotebookInput.value = "";
  if (noteTemplateSelect) noteTemplateSelect.value = "";
  renderNotebookControls();
  if (noteNotebookSelect) noteNotebookSelect.value = DEFAULT_NOTEBOOK;
  renderAttachmentList();
  saveButton.textContent = "ノートを保存";
  clearFormError();
  hideAutoTagStatus();
  hideTagSuggestions();
  if (!appScreen.hidden && appLoading.hidden) titleInput.focus();
}

function startEditing(id) {
  const memo = memos.find((item) => item.id === id);
  if (!memo) return;

  closeMemoDialog();
  editingId = id;
  renderNotebookControls();
  titleInput.value = memo.title;
  bodyInput.value = memo.body;
  tagsInput.value = memo.tags.join(", ");
  if (noteNotebookSelect) noteNotebookSelect.value = getMemoNotebook(memo);
  if (customNotebookInput) customNotebookInput.value = "";
  if (noteTypeSelect) noteTypeSelect.value = memo.type === "checklist" ? "checklist" : "text";
  currentAttachments = normalizeAttachments(memo.attachments);
  renderAttachmentList();
  if (reminderInput) reminderInput.value = toDatetimeLocalValue(memo.reminderAt);
  saveButton.textContent = "ノートを更新";
  titleInput.focus();
}

function renderDialogTags(memo) {
  memoDialogTags.innerHTML = "";

  const notebookItem = document.createElement("span");
  notebookItem.className = "notebook-chip";
  notebookItem.textContent = getMemoNotebook(memo);
  memoDialogTags.append(notebookItem);

  const typeItem = document.createElement("span");
  typeItem.className = "note-type-chip";
  typeItem.textContent = memo.type === "checklist" ? "チェックリスト" : "ノート";
  memoDialogTags.append(typeItem);

  memo.tags.forEach((tag) => {
    const tagItem = document.createElement("span");
    tagItem.textContent = tag;
    memoDialogTags.append(tagItem);
  });
}

function renderDialogReminder(memo) {
  const reminder = getOrCreateDialogReminder();
  if (!reminder) return;

  const reminderText = formatReminderDate(memo.reminderAt);
  const schedule = getOrCreateDialogSchedule();
  reminder.hidden = !reminderText;
  reminder.textContent = reminderText ? `リマインダー: ${reminderText}` : "";
  reminder.dataset.state = getReminderState(memo.reminderAt);
  if (schedule) schedule.dataset.state = reminder.dataset.state;
}

function getOrCreateDialogSchedule() {
  if (memoDialogSchedule) return memoDialogSchedule;
  if (!memoDialog) return null;

  const panel = memoDialog.querySelector(".memo-dialog-panel");
  if (!panel) return null;

  const existing = panel.querySelector("#memoDialogSchedule");
  if (existing) return existing;

  const schedule = document.createElement("div");
  schedule.className = "memo-dialog-schedule";
  schedule.id = "memoDialogSchedule";
  schedule.hidden = true;

  const tags = panel.querySelector("#memoDialogTags");
  const actions = panel.querySelector(".card-actions");
  if (tags) {
    panel.insertBefore(schedule, tags);
  } else if (actions) {
    panel.insertBefore(schedule, actions);
  } else {
    panel.append(schedule);
  }

  return schedule;
}

function getOrCreateDialogOutlookButton() {
  if (!memoDialog) return null;

  const schedule = getOrCreateDialogSchedule();
  const panel = memoDialog.querySelector(".memo-dialog-panel");
  const actions = memoDialog.querySelector(".card-actions");
  if (!panel && !schedule && !actions) return null;

  const existing =
    schedule?.querySelector("#memoDialogOutlookButton") ||
    panel?.querySelector("#memoDialogOutlookButton") ||
    memoDialogOutlookButton;
  if (existing) {
    if (schedule && existing.parentElement !== schedule) schedule.append(existing);
    return existing;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "secondary outlook-calendar-button";
  button.id = "memoDialogOutlookButton";
  button.textContent = "Outlook予定に追加";

  if (schedule) {
    schedule.append(button);
  } else if (actions) {
    const editButton = actions.querySelector("#memoDialogEditButton");
    if (editButton) {
      actions.insertBefore(button, editButton);
    } else {
      actions.append(button);
    }
  } else {
    panel?.append(button);
  }

  return button;
}

function renderDialogOutlookButton(memo) {
  const button = getOrCreateDialogOutlookButton();
  if (!button) return;

  const hasReminder = Boolean(toReminderDate(memo.reminderAt));
  const schedule = getOrCreateDialogSchedule();
  if (schedule) schedule.hidden = !hasReminder;
  button.disabled = !hasReminder;
  button.title = hasReminder
    ? "通知付きのOutlook予定ファイルを作成します"
    : "リマインダー日時を設定すると予定に追加できます";
}

function getOrCreateCalendarDownloadStatus() {
  if (calendarDownloadStatus) return calendarDownloadStatus;
  if (!memoDialog) return null;

  const panel = memoDialog.querySelector(".memo-dialog-panel");
  if (!panel) return null;

  const existing = panel.querySelector("#calendarDownloadStatus");
  if (existing) return existing;

  const status = document.createElement("p");
  status.className = "calendar-download-status";
  status.id = "calendarDownloadStatus";
  status.setAttribute("aria-live", "polite");
  status.hidden = true;

  const schedule = panel.querySelector("#memoDialogSchedule");
  const tags = panel.querySelector("#memoDialogTags");
  if (schedule) {
    schedule.insertAdjacentElement("afterend", status);
  } else if (tags) {
    panel.insertBefore(status, tags);
  } else {
    panel.append(status);
  }

  return status;
}

function hideCalendarDownloadStatus() {
  const status = getOrCreateCalendarDownloadStatus();
  if (!status) return;
  status.hidden = true;
  status.textContent = "";
}

function showCalendarDownloadStatus() {
  const status = getOrCreateCalendarDownloadStatus();
  if (!status) return;
  status.textContent = "カレンダー登録後、ダウンロードした .ics ファイルは削除してOKです。";
  status.hidden = false;
}

function getOrCreateDialogReminder() {
  if (memoDialogReminder) return memoDialogReminder;
  if (!memoDialog) return null;

  const panel = memoDialog.querySelector(".memo-dialog-panel");
  if (!panel) return null;
  const schedule = getOrCreateDialogSchedule();

  const existing = schedule?.querySelector(".memo-dialog-reminder") || panel.querySelector(".memo-dialog-reminder");
  if (existing) {
    if (schedule && existing.parentElement !== schedule) schedule.prepend(existing);
    return existing;
  }

  const reminder = document.createElement("p");
  reminder.className = "memo-dialog-reminder";
  reminder.id = "memoDialogReminder";
  reminder.hidden = true;

  const tags = panel.querySelector("#memoDialogTags");
  if (schedule) {
    schedule.prepend(reminder);
  } else if (tags) {
    panel.insertBefore(reminder, tags);
  } else {
    panel.append(reminder);
  }

  return reminder;
}

function updateMemoDialog(id) {
  if (!memoDialog || memoDialog.hidden) return;

  const memo = memos.find((item) => item.id === id);
  if (!memo) {
    closeMemoDialog();
    return;
  }

  const isFavorite = Boolean(memo.favorite);
  const isPinned = Boolean(memo.pinned);
  memoDialogTitle.textContent = memo.title;
  memoDialogTime.textContent = formatDate(memo.updatedAt);
  memoDialogTime.dateTime = memo.updatedAt;
  renderDialogBody(memo);
  memoDialogPinButton.textContent = isPinned ? "ピン留め解除" : "ピン留め";
  memoDialogPinButton.setAttribute("aria-pressed", String(isPinned));
  memoDialogFavoriteButton.textContent = isFavorite ? "お気に入り解除" : "お気に入り";
  memoDialogFavoriteButton.setAttribute("aria-pressed", String(isFavorite));
  if (memoDialogArchiveButton) {
    memoDialogArchiveButton.textContent = memo.archived ? "アーカイブ解除" : "アーカイブ";
    memoDialogArchiveButton.setAttribute("aria-pressed", String(Boolean(memo.archived)));
  }
  renderAttachmentList(memoDialogAttachments, normalizeAttachments(memo.attachments), false);
  renderDialogTags(memo);
  renderDialogReminder(memo);
  renderDialogOutlookButton(memo);
  hideCalendarDownloadStatus();
}

function openMemoDialog(id) {
  if (!memoDialog) return;

  openMemoId = id;
  dialogSearchQuery = "";
  if (memoDialogSearch) memoDialogSearch.value = "";
  rememberOpenMemo(id);
  memoDialog.hidden = false;
  document.body.classList.add("dialog-open");
  updateMemoDialog(id);
  memoDialogCloseButton.focus();
}

function closeMemoDialog() {
  if (!memoDialog || memoDialog.hidden) return;

  memoDialog.hidden = true;
  clearRememberedOpenMemo(openMemoId);
  openMemoId = null;
  hideCalendarDownloadStatus();
  document.body.classList.remove("dialog-open");
}

async function deleteMemo(id) {
  const memo = memos.find((item) => item.id === id);
  if (!memo || !currentUser) return;

  if (!confirmDialog || !confirmDialogMessage) {
    // fallback to native confirm
    const ok = confirm(`「${memo.title}」を削除しますか？`);
    if (!ok) return;
    try {
      if (dataMode === 'local') {
        memos = memos.filter((item) => item.id !== id);
        saveLocalMemos();
        render();
      } else {
        await deleteDoc(memoDocRef(currentUser.uid, id));
      }
      if (openMemoId === id) closeMemoDialog();
      if (editingId === id) resetForm();
    } catch {
      showFormError('削除に失敗しました。');
    }
    return;
  }

  // open custom confirm dialog
  confirmDialogMessage.textContent = `「${memo.title}」を削除しますか？`;
  confirmAction = async () => {
    try {
      if (dataMode === 'local') {
        memos = memos.filter((item) => item.id !== id);
        saveLocalMemos();
        render();
      } else {
        await deleteDoc(memoDocRef(currentUser.uid, id));
      }
      if (openMemoId === id) closeMemoDialog();
      if (editingId === id) resetForm();
    } catch (e) {
      console.error(e);
      showFormError('削除に失敗しました。');
    }
  };
  pendingDeleteMemoId = id;
  confirmDialog.hidden = false;
  document.body.classList.add('dialog-open');
  confirmCancel?.focus();
}

async function saveMemo(memo) {
  if (!currentUser) return;
  if (dataMode === "local") {
    const index = memos.findIndex((item) => item.id === memo.id);
    if (index >= 0) {
      memos[index] = memo;
    } else {
      memos.push(memo);
    }
    memos = sortMemos(memos);
    saveLocalMemos();
    render();
    return;
  }

  await setDoc(memoDocRef(currentUser.uid, memo.id), {
    title: memo.title,
    body: memo.body,
    tags: memo.tags,
    notebook: getMemoNotebook(memo),
    type: NOTE_TYPES.has(memo.type) ? memo.type : "text",
    archived: Boolean(memo.archived),
    attachments: normalizeAttachments(memo.attachments),
    reminderAt: normalizeReminderAt(memo.reminderAt),
    updatedAt: memo.updatedAt,
    favorite: memo.favorite,
    pinned: memo.pinned,
  });
}

function memoWriteData(memo, changes = {}) {
  return {
    title: memo.title,
    body: memo.body,
    tags: memo.tags,
    notebook: getMemoNotebook(memo),
    type: NOTE_TYPES.has(memo.type) ? memo.type : "text",
    archived: Boolean(memo.archived),
    attachments: normalizeAttachments(memo.attachments),
    reminderAt: normalizeReminderAt(memo.reminderAt),
    updatedAt: memo.updatedAt,
    favorite: Boolean(memo.favorite),
    pinned: Boolean(memo.pinned),
    ...changes,
  };
}

async function togglePinnedMemo(id) {
  const memo = memos.find((item) => item.id === id);
  if (!memo || !currentUser) return;

  try {
    if (dataMode === "local") {
      memo.pinned = !memo.pinned;
      saveLocalMemos();
      render();
    } else {
      await setDoc(
        memoDocRef(currentUser.uid, id),
        memoWriteData(memo, { pinned: !memo.pinned }),
        { merge: true },
      );
    }
  } catch (error) {
    console.error(error);
    showFormError("ピン留めの変更に失敗しました。");
  }
}

async function toggleFavoriteMemo(id) {
  const memo = memos.find((item) => item.id === id);
  if (!memo || !currentUser) return;

  try {
    if (dataMode === "local") {
      memo.favorite = !memo.favorite;
      saveLocalMemos();
      render();
    } else {
      await setDoc(
        memoDocRef(currentUser.uid, id),
        memoWriteData(memo, { favorite: !memo.favorite }),
        { merge: true },
      );
    }
  } catch (error) {
    console.error(error);
    showFormError("お気に入りの変更に失敗しました。");
  }
}

async function toggleArchivedMemo(id) {
  const memo = memos.find((item) => item.id === id);
  if (!memo || !currentUser) return;

  try {
    if (dataMode === "local") {
      memo.archived = !memo.archived;
      memo.updatedAt = new Date().toISOString();
      saveLocalMemos();
      if (memo.archived && openMemoId === id && dateViewMode !== "archive" && dateViewMode !== "all") closeMemoDialog();
      render();
    } else {
      await setDoc(
        memoDocRef(currentUser.uid, id),
        memoWriteData(memo, {
          archived: !memo.archived,
          updatedAt: new Date().toISOString(),
        }),
        { merge: true },
      );
    }
  } catch (error) {
    console.error(error);
    showFormError("アーカイブの変更に失敗しました。");
  }
}

async function duplicateMemo(id) {
  const memo = memos.find((item) => item.id === id);
  if (!memo || !currentUser) return;

  const copy = normalizeMemo({
    ...memo,
    id: crypto.randomUUID(),
    title: `${memo.title} コピー`,
    pinned: false,
    archived: false,
    updatedAt: new Date().toISOString(),
    attachments: normalizeAttachments(memo.attachments).map((attachment) => ({
      ...attachment,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    })),
  });

  try {
    await saveMemo(copy);
    resetPagination();
    render();
  } catch (error) {
    console.error(error);
    showFormError("ノートの複製に失敗しました。");
  }
}

function buildMarkdownExport(memo) {
  const attachments = normalizeAttachments(memo.attachments);
  const lines = [
    `# ${memo.title || "無題のノート"}`,
    "",
    `- ノートブック: ${getMemoNotebook(memo)}`,
    `- 更新日: ${formatDate(memo.updatedAt)}`,
    memo.tags?.length ? `- タグ: ${memo.tags.join(", ")}` : "- タグ: なし",
    memo.reminderAt ? `- リマインダー: ${formatReminderDate(memo.reminderAt)}` : "- リマインダー: なし",
    attachments.length ? `- 添付: ${attachments.map((item) => item.name).join(", ")}` : "- 添付: なし",
    "",
    "---",
    "",
    memo.body || "",
  ];
  return lines.join("\n");
}

function stripMarkdown(text) {
  return String(text || "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/^\s*[-*]\s+\[( |x|X)\]\s+/gm, "- ");
}

function buildTextExport(memo) {
  return stripMarkdown(buildMarkdownExport(memo));
}

function downloadTextFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportMemo(id, format = "md") {
  const memo = memos.find((item) => item.id === id);
  if (!memo) return;
  const baseName = sanitizeFileName(memo.title || "note");
  if (format === "txt") {
    downloadTextFile(`${baseName}.txt`, buildTextExport(memo), "text/plain;charset=utf-8");
    return;
  }
  downloadTextFile(`${baseName}.md`, buildMarkdownExport(memo), "text/markdown;charset=utf-8");
}

async function initFirebase() {
  if (isLocalModeEnabled()) {
    if (isLoginPage) {
      goToMemos();
    } else {
      enterLocalApp();
    }
    return;
  }

  if (!isFirebaseConfigured()) {
    if (isLoginPage) {
      showLoginError("firebase-config.js が未設定です。FIREBASE_SETUP.md を参照してください。");
      googleLoginButton.disabled = true;
      emailSubmitButton.disabled = true;
      showLogin();
    } else {
      showFormError("firebase-config.js が未設定です。FIREBASE_SETUP.md を参照してください。");
      if (appScreen) appScreen.hidden = false;
    }
    return;
  }

  setAuthLoading(true);

  try {
    await loadFirebaseModules();
  } catch (error) {
    console.error(error);
    if (isLoginPage) {
      showLoginError("Firebase の読み込みに失敗しました。ネットワーク接続を確認するか、ローカルモードを使ってください。");
      setAuthLoading(false);
    } else {
      showFormError("Firebase の読み込みに失敗しました。ネットワーク接続を確認してください。");
      if (appScreen) appScreen.hidden = false;
    }
    return;
  }

  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  onAuthStateChanged(auth, (user) => {
    setAuthLoading(false);

    if (user) {
      if (isLoginPage) {
        goToMemos();
      } else {
        enterApp(user);
      }
      return;
    }

    if (isMemoPage) {
      goToLogin();
    } else {
      showLogin();
    }
  });
}

function bindLoginPage() {
  googleLoginButton.addEventListener("click", loginWithGoogle);
  emailAuthForm.addEventListener("submit", loginWithEmail);
  emailSignInTab.addEventListener("click", () => setEmailAuthMode("signin"));
  emailSignUpTab.addEventListener("click", () => setEmailAuthMode("signup"));
  localModeButton.addEventListener("click", () => {
    disableLocalOnlyEntry();
    enableLocalMode();
    goToMemos();
  });

  [emailInput, passwordInput].forEach((input) => {
    input.addEventListener("input", clearLoginError);
  });

  setEmailAuthMode("signin");
}

function bindMemoPage() {
  usernameForm.addEventListener("submit", updateUsername);
  feedbackButton.addEventListener("click", openFeedbackForm);
  logoutButton.addEventListener("click", logout);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearFormError();

    if (!currentUser) return;

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    let tags = parseTags(tagsInput.value);
    if (tags.length === 0) {
      tags = applyAutoTags({ silent: true, onlyWhenEmpty: true });
    }
    const existingMemo = memos.find((item) => item.id === editingId);
    const notebook = getSelectedNotebook();
    const type = getSelectedNoteType();
    const reminderAt = reminderInput
      ? normalizeReminderAt(reminderInput.value)
      : normalizeReminderAt(existingMemo?.reminderAt);
    const validationError = validateMemoInput(title, body, tags);

    if (validationError) {
      showFormError(validationError.message);
      validationError.target.focus();
      return;
    }

    const memo = {
      id: editingId ?? crypto.randomUUID(),
      title,
      body,
      tags,
      notebook,
      type,
      archived: existingMemo?.archived ?? false,
      attachments: normalizeAttachments(currentAttachments),
      reminderAt,
      updatedAt: new Date().toISOString(),
      favorite: existingMemo?.favorite ?? false,
      pinned: existingMemo?.pinned ?? false,
    };

    saveButton.disabled = true;

    try {
      await saveMemo(memo);
      clearDraft();
      resetForm();
    } catch {
      showFormError(
        dataMode === "local"
          ? "保存に失敗しました。ブラウザの保存容量を確認してください。"
          : "保存に失敗しました。Firestore の設定を確認してください。",
      );
    } finally {
      saveButton.disabled = false;
    }
  });

  [titleInput, bodyInput, usernameInput, reminderInput, customNotebookInput].forEach((input) => {
    input?.addEventListener("input", clearFormError);
  });

  searchInput.addEventListener("input", () => {
    resetPagination();
    renderMemos();
  });
  sortSelect.addEventListener("change", () => {
    sortMode = SORT_MODES.has(sortSelect.value) ? sortSelect.value : DEFAULT_SORT_MODE;
    saveSortMode();
    resetPagination();
    renderMemos();
  });
  notebookFilterSelect?.addEventListener("change", () => {
    activeNotebook = notebookFilterSelect.value || "all";
    resetPagination();
    render();
  });
  dateViewSelect?.addEventListener("change", () => {
    dateViewMode = DATE_VIEW_MODES.has(dateViewSelect.value) ? dateViewSelect.value : DEFAULT_DATE_VIEW;
    resetPagination();
    render();
  });
  favoriteFilterButton.addEventListener("click", () => {
    showFavoritesOnly = !showFavoritesOnly;
    resetPagination();
    render();
  });
  customNotebookInput?.addEventListener("input", renderNotebookControls);
  noteTemplateSelect?.addEventListener("change", () => {
    applyTemplate(noteTemplateSelect.value);
  });
  attachmentInput?.addEventListener("change", async () => {
    await addAttachmentsFromFiles(attachmentInput.files);
    attachmentInput.value = "";
  });
  document.querySelectorAll("[data-markdown-action]").forEach((button) => {
    button.addEventListener("click", () => insertMarkdown(button.dataset.markdownAction));
  });
  tagFilterButton?.addEventListener("click", openTagFilterDialog);
  tagFilterDialogCloseButton?.addEventListener("click", closeTagFilterDialog);
  tagFilterDialog?.addEventListener("click", (event) => {
    if (event.target === tagFilterDialog) closeTagFilterDialog();
  });
  darkModeToggle.addEventListener("change", () => {
    displaySettings.dark = darkModeToggle.checked;
    applyDisplaySettings();
    saveDisplaySettings();
  });
  brightnessInput.addEventListener("input", () => {
    displaySettings.brightness = normalizeBrightness(brightnessInput.value);
    applyDisplaySettings();
    saveDisplaySettings();
  });
  outlookReminderSelect?.addEventListener("change", () => {
    const minutes = Number(outlookReminderSelect.value);
    applyOutlookReminderSetting(minutes);
    saveOutlookReminderMinutes(outlookReminderMinutes);
  });
  clearButton.addEventListener("click", () => {
    clearDraft();
    clearRememberedOpenMemo();
    resetForm();
  });

  newMemoButton?.addEventListener("click", () => {
    closeMemoDialog();
    clearDraft();
    clearRememberedOpenMemo();
    resetForm();
    document.querySelector(".editor")?.scrollIntoView({ block: "start", behavior: "smooth" });
  });

  // Tag suggestion handlers
  if (tagsInput) {
    tagsInput.addEventListener("focus", showTagSuggestions);
    tagsInput.addEventListener("input", () => {
      hideAutoTagStatus();
      showTagSuggestions();
    });
    tagsInput.addEventListener("blur", () => {
      setTimeout(hideTagSuggestions, 100);
    });
  }

  autoTagButton?.addEventListener("click", () => {
    applyAutoTags();
    tagsInput?.focus();
  });
  browserAiCheckButton?.addEventListener("click", checkBrowserAiAvailability);
  browserAiActionButtons.forEach((button) => {
    button.addEventListener("click", () => runBrowserAiAction(button.dataset.aiAction));
  });

  memoDialogCloseButton.addEventListener("click", closeMemoDialog);
  memoDialog.addEventListener("click", (event) => {
    if (event.target === memoDialog) closeMemoDialog();
  });
  if (settingsButton && settingsDialog) {
    settingsButton.addEventListener("click", () => {
      settingsDialog.hidden = false;
      document.body.classList.add("dialog-open");
      settingsDialogCloseButton?.focus();
    });

    settingsDialogCloseButton?.addEventListener("click", () => {
      settingsDialog.hidden = true;
      document.body.classList.remove("dialog-open");
      settingsButton.focus();
    });

    settingsDialog.addEventListener("click", (event) => {
      if (event.target === settingsDialog) {
        settingsDialog.hidden = true;
        document.body.classList.remove("dialog-open");
        settingsButton.focus();
      }
    });
  }

  if (helpButton && helpDialog) {
    helpButton.addEventListener("click", () => {
      helpDialog.hidden = false;
      helpButton.setAttribute("aria-expanded", "true");
      document.body.classList.add("dialog-open");
      helpDialogCloseButton?.focus();
    });

    helpDialogCloseButton?.addEventListener("click", () => {
      helpDialog.hidden = true;
      helpButton.setAttribute("aria-expanded", "false");
      document.body.classList.remove("dialog-open");
      helpButton.focus();
    });

    helpDialog.addEventListener("click", (event) => {
      if (event.target === helpDialog) {
        helpDialog.hidden = true;
        helpButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("dialog-open");
        helpButton.focus();
      }
    });
  }
  memoDialogFavoriteButton.addEventListener("click", () => {
    if (openMemoId) toggleFavoriteMemo(openMemoId);
  });
  memoDialogPinButton.addEventListener("click", () => {
    if (openMemoId) togglePinnedMemo(openMemoId);
  });
  memoDialogSearch?.addEventListener("input", () => {
    dialogSearchQuery = memoDialogSearch.value.trim();
    if (openMemoId) updateMemoDialog(openMemoId);
  });
  getOrCreateDialogOutlookButton()?.addEventListener("click", () => {
    const memo = memos.find((item) => item.id === openMemoId);
    if (memo && downloadOutlookIcs(memo)) showCalendarDownloadStatus();
  });
  memoDialogDuplicateButton?.addEventListener("click", () => {
    if (openMemoId) duplicateMemo(openMemoId);
  });
  memoDialogExportMdButton?.addEventListener("click", () => {
    if (openMemoId) exportMemo(openMemoId, "md");
  });
  memoDialogExportTxtButton?.addEventListener("click", () => {
    if (openMemoId) exportMemo(openMemoId, "txt");
  });
  memoDialogEditButton.addEventListener("click", () => {
    if (openMemoId) startEditing(openMemoId);
  });
  memoDialogArchiveButton?.addEventListener("click", () => {
    if (openMemoId) toggleArchivedMemo(openMemoId);
  });
  memoDialogDeleteButton.addEventListener("click", () => {
    if (openMemoId) deleteMemo(openMemoId);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (tagFilterDialog && !tagFilterDialog.hidden) {
        closeTagFilterDialog();
        return;
      }
      if (memoDialog && !memoDialog.hidden) {
        closeMemoDialog();
        return;
      }
      if (helpDialog && !helpDialog.hidden) {
        helpDialog.hidden = true;
        helpButton?.setAttribute("aria-expanded", "false");
        document.body.classList.remove("dialog-open");
        helpButton?.focus();
        return;
      }
      if (settingsDialog && !settingsDialog.hidden) {
        settingsDialog.hidden = true;
        document.body.classList.remove("dialog-open");
        settingsButton?.focus();
      }
    }
  });

  // Initialize auto-save toggle and behavior
  try {
    const savedAuto = localStorage.getItem(AUTOSAVE_SETTING_KEY);
    if (autoSaveToggle) autoSaveToggle.checked = savedAuto === "true";
    autoSaveToggle?.addEventListener("change", () => {
      const enabled = autoSaveToggle.checked;
      localStorage.setItem(AUTOSAVE_SETTING_KEY, enabled ? "true" : "false");
      if (enabled) {
        startAutoSave();
        attachDraftInputHandlers();
      } else {
        stopAutoSave();
        detachDraftInputHandlers();
      }
    });
    if (autoSaveToggle?.checked) { startAutoSave(); attachDraftInputHandlers(); }
  } catch {
    // ignore
  }

  // Brightness reset
  if (brightnessResetButton) {
    brightnessResetButton.addEventListener("click", () => {
      displaySettings.brightness = 100;
      applyDisplaySettings();
      saveDisplaySettings();
    });
  }

  if (accentColorInput) {
    accentColorInput.addEventListener("change", () => {
      customColors.accent = accentColorInput.value;
      applyCustomColors(customColors);
      saveCustomColors(customColors);
    });
  }
  if (bgColorInput) {
    bgColorInput.addEventListener("change", () => {
      customColors.bg = bgColorInput.value;
      applyCustomColors(customColors);
      saveCustomColors(customColors);
    });
  }
  if (textColorInput) {
    textColorInput.addEventListener("change", () => {
      customColors.text = textColorInput.value;
      applyCustomColors(customColors);
      saveCustomColors(customColors);
    });
  }
  if (cardBgColorInput) {
    cardBgColorInput.addEventListener("change", () => {
      customColors.cardBg = cardBgColorInput.value;
      applyCustomColors(customColors);
      saveCustomColors(customColors);
    });
  }
  if (colorResetButton) {
    colorResetButton.addEventListener("click", () => {
      customColors = { ...DEFAULT_LIGHT_COLORS };
      applyCustomColors(customColors);
      saveCustomColors(customColors);
    });
  }

  // Layout radio handlers
  if (layoutGridRadio) {
    layoutGridRadio.addEventListener("change", () => {
      layoutSetting = "grid";
      applyLayoutSetting(layoutSetting);
      saveLayoutSetting(layoutSetting);
    });
  }
  if (layoutListRadio) {
    layoutListRadio.addEventListener("change", () => {
      layoutSetting = "list";
      applyLayoutSetting(layoutSetting);
      saveLayoutSetting(layoutSetting);
    });
  }

  // Clear local data handler: open confirm dialog
  if (settingsClearLocalButton) {
    settingsClearLocalButton.addEventListener("click", () => {
      if (!confirmDialog || !confirmDialogMessage) return;
      confirmDialogMessage.textContent = 'このブラウザに保存されたローカルノートを削除します。よろしいですか？';
      confirmAction = async () => {
        try {
          localStorage.removeItem(LOCAL_MEMOS_KEY);
          localStorage.removeItem(LEGACY_STORAGE_KEY);
          localStorage.removeItem(DRAFT_KEY);
          memos = loadLocalMemos();
          render();
          alert('ローカルノートを削除しました。');
        } catch (error) {
          console.error(error);
          alert('ローカルノートの削除に失敗しました。コンソールを確認してください。');
        }
      };
      confirmDialog.hidden = false;
      document.body.classList.add('dialog-open');
      confirmCancel?.focus();
    });
  }

  if (confirmCancel) {
    confirmCancel.addEventListener("click", () => {
      if (!confirmDialog) return;
      confirmDialog.hidden = true;
      document.body.classList.remove('dialog-open');
      confirmAction = null;
      pendingDeleteMemoId = null;
      settingsClearLocalButton?.focus();
    });
  }

  if (confirmOk) {
    confirmOk.addEventListener('click', async () => {
      try {
        if (typeof confirmAction === 'function') {
          await confirmAction();
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!confirmDialog) return;
        confirmDialog.hidden = true;
        document.body.classList.remove('dialog-open');
        confirmAction = null;
        // if it was a memo deletion, clear selection and re-render
        if (pendingDeleteMemoId) pendingDeleteMemoId = null;
        settingsClearLocalButton?.focus();
      }
    });
  }

  // Try restoring draft if present and autosave enabled
  tryRestoreDraftOnLoad();

  applyDisplaySettings();
  applyCustomColors(customColors);
  applyLayoutSetting(layoutSetting);
  applyOutlookReminderSetting(outlookReminderMinutes);
}

if (isLoginPage) bindLoginPage();
if (isMemoPage) bindMemoPage();
initFirebase();

// Auto-save and draft helpers
function createDraftSnapshot() {
  return {
    id: editingId,
    title: titleInput.value || "",
    body: bodyInput.value || "",
    tags: tagsInput.value || "",
    notebook: getSelectedNotebook(),
    type: getSelectedNoteType(),
    reminderAt: reminderInput?.value || "",
    updatedAt: new Date().toISOString(),
  };
}

function isDraftEmpty(draft) {
  return !draft.id && !draft.title.trim() && !draft.body.trim() && !draft.tags.trim() && !draft.reminderAt;
}

function startAutoSave() {
  stopAutoSave();
  // save immediately and then every 10s
  saveDraft();
  autoSaveIntervalId = setInterval(() => saveDraft(), 10000);
}

function stopAutoSave() {
  if (autoSaveIntervalId) {
    clearInterval(autoSaveIntervalId);
    autoSaveIntervalId = null;
  }
}

function scheduleSaveDraft() {
  if (autoSaveDebounceTimer) clearTimeout(autoSaveDebounceTimer);
  autoSaveDebounceTimer = setTimeout(() => saveDraft(), 1000);
}

function attachDraftInputHandlers() {
  if (draftInputHandler) detachDraftInputHandlers();
  draftInputHandler = function () {
    saveDraft();
  };
  [titleInput, bodyInput, tagsInput, reminderInput, noteNotebookSelect, customNotebookInput, noteTypeSelect].forEach((el) => {
    el?.addEventListener('input', draftInputHandler);
    el?.addEventListener('change', draftInputHandler);
  });
}

function detachDraftInputHandlers() {
  [titleInput, bodyInput, tagsInput, reminderInput, noteNotebookSelect, customNotebookInput, noteTypeSelect].forEach((el) => {
    if (draftInputHandler) el?.removeEventListener('input', draftInputHandler);
    if (draftInputHandler) el?.removeEventListener('change', draftInputHandler);
  });
  draftInputHandler = null;
}

function saveDraft() {
  try {
    const draft = createDraftSnapshot();
    if (isDraftEmpty(draft)) {
      clearDraft();
      return;
    }
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch (e) {
    // ignore
  }
}

function clearDraft() {
  try { localStorage.removeItem(DRAFT_KEY); } catch {}
}

function tryRestoreDraftOnLoad() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    const autosaveEnabled = localStorage.getItem(AUTOSAVE_SETTING_KEY) === 'true';
    if (!raw || !autosaveEnabled) return;
    const draft = JSON.parse(raw);
    if (!draft) return;
    if (isDraftEmpty(draft)) return;
    const should = confirm('下書きが見つかりました。編集中の内容を復元しますか？');
    if (!should) return;
    editingId = draft.id || null;
    titleInput.value = draft.title || '';
    bodyInput.value = draft.body || '';
    tagsInput.value = draft.tags || '';
    renderNotebookControls();
    if (noteNotebookSelect) noteNotebookSelect.value = cleanNotebook(draft.notebook) || DEFAULT_NOTEBOOK;
    if (customNotebookInput) customNotebookInput.value = "";
    if (noteTypeSelect) noteTypeSelect.value = NOTE_TYPES.has(draft.type) ? draft.type : "text";
    if (reminderInput) reminderInput.value = draft.reminderAt || '';
    saveButton.textContent = editingId ? "ノートを更新" : "ノートを保存";
  } catch {
    // ignore
  }
}

// Expose helpers for testing/debugging
try {
  window.saveDraft = saveDraft;
  window.startAutoSave = startAutoSave;
  window.attachDraftInputHandlers = attachDraftInputHandlers;
  window.detachDraftInputHandlers = detachDraftInputHandlers;
} catch (e) {
  // ignore in restricted contexts
}
