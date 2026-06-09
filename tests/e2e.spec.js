const { test, expect } = require('@playwright/test');
const fs = require('fs');

function formatIcsDate(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function outlookMorningStart(value) {
  const reminderDate = new Date(value);
  return new Date(
    reminderDate.getFullYear(),
    reminderDate.getMonth(),
    reminderDate.getDate(),
    8,
    0,
    0,
    0
  );
}

test.describe('NoteDesk E2E', () => {
  test.beforeEach(async ({ page }) => {
    // ensure local mode and autosave enabled before load
    await page.addInitScript(() => {
      localStorage.setItem('note-desk-local-mode', 'true');
      localStorage.setItem('note-desk-autosave', 'true');
    });
  });

  test('autosave creates draft in localStorage', async ({ page }) => {
    await page.goto('/memo.html');
    await page.waitForSelector('#memoTitle');
    await page.fill('#memoTitle', 'E2E テストタイトル');
    await page.fill('#memoBody', 'E2E 本文');
    await page.fill('#memoTags', 'e2e');
    // trigger input events
    await page.dispatchEvent('#memoTitle', 'input');
    await page.dispatchEvent('#memoBody', 'input');
    // wait for autosave debounce
    await page.waitForTimeout(1200);
    const draft = await page.evaluate(() => localStorage.getItem('note-desk-draft'));
    expect(draft).not.toBeNull();
    const parsed = JSON.parse(draft);
    expect(parsed.title).toBe('E2E テストタイトル');
  });

  test('delete opens confirm dialog and removes memo', async ({ page }) => {
    // seed one local memo
    await page.addInitScript(() => {
      localStorage.setItem('note-desk-local-notes', JSON.stringify([
        { id: 'd1', title: '削除対象', body: 'x', tags: [], updatedAt: new Date().toISOString() }
      ]));
    });

    await page.goto('/memo.html');
    await page.waitForSelector('.delete-button');
    await page.click('.delete-button');
    // confirm dialog should appear
    await page.waitForSelector('#confirmDialog:not([hidden])');
    // click confirm
    await page.click('#confirmOk');
    await page.waitForTimeout(300);
    const memos = JSON.parse(await page.evaluate(() => localStorage.getItem('note-desk-local-notes') || '[]'));
    expect(memos.length).toBe(0);
  });

  test('saves reminder and shows it on memo card', async ({ page }) => {
    await page.goto('/memo.html');
    await page.waitForSelector('#memoTitle');
    await page.fill('#memoTitle', 'リマインダーテスト');
    await page.fill('#memoBody', '確認する内容');
    await page.fill('#memoReminder', '2026-06-05T09:30');
    await page.click('#saveButton');
    await expect(page.locator('.memo-reminder')).toContainText('リマインダー');

    const memos = JSON.parse(await page.evaluate(() => localStorage.getItem('note-desk-local-notes') || '[]'));
    expect(memos[0].reminderAt).toContain('2026-06-05');
  });

  test('downloads Outlook calendar file with reminder alarm', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('note-desk-local-notes', JSON.stringify([
        {
          id: 'outlook-reminder',
          title: 'Outlook通知',
          body: '予定に入れる本文',
          tags: ['仕事'],
          updatedAt: new Date().toISOString(),
          favorite: false,
          pinned: false,
          reminderAt: '2026-06-05T09:30:00.000Z'
        }
      ]));
    });

    await page.goto('/memo.html');
    await page.waitForSelector('.open-button');
    await page.click('.open-button');
    await page.waitForSelector('#memoDialog:not([hidden])');
    await expect(page.locator('#memoDialogSchedule')).toBeVisible();
    await expect(page.locator('#memoDialogSchedule #memoDialogOutlookButton')).toBeVisible();
    await expect(page.locator('#memoDialogOutlookButton')).toBeEnabled();

    const downloadPromise = page.waitForEvent('download');
    await page.click('#memoDialogOutlookButton');
    const download = await downloadPromise;
    const filePath = await download.path();
    const content = fs.readFileSync(filePath, 'utf8');
    const expectedStart = outlookMorningStart('2026-06-05T09:30:00.000Z');
    const expectedEnd = new Date(expectedStart.getTime() + 30 * 60 * 1000);

    await expect(page.locator('#calendarDownloadStatus')).toBeVisible();
    await expect(page.locator('#calendarDownloadStatus')).toContainText('削除してOK');
    expect(download.suggestedFilename()).toBe('Outlook通知.ics');
    expect(content).toContain('BEGIN:VCALENDAR');
    expect(content).toContain('BEGIN:VEVENT');
    expect(content).toContain(`DTSTART:${formatIcsDate(expectedStart)}`);
    expect(content).toContain(`DTEND:${formatIcsDate(expectedEnd)}`);
    expect(content).toContain('SUMMARY:Outlook通知');
    expect(content).toContain('BEGIN:VALARM');
    expect(content).toContain('TRIGGER:-PT15M');
    expect(content).toContain('ACTION:DISPLAY');
  });

  test('auto tag fills tags from memo content', async ({ page }) => {
    await page.goto('/memo.html');
    await page.waitForSelector('#memoTitle');
    await page.fill('#memoTitle', '会議タスク');
    await page.fill('#memoBody', '締切までに資料を共有する');
    await page.click('#autoTagButton');
    await expect(page.locator('#memoTags')).toHaveValue(/仕事/);
  });

  test('supports notebook markdown attachments duplicate archive and export', async ({ page }) => {
    await page.goto('/memo.html');
    await page.waitForSelector('#memoTitle');

    await expect(page.locator('[data-markdown-action]')).toHaveCount(5);
    await page.selectOption('#noteTemplateSelect', 'todo');
    await expect(page.locator('#noteTypeSelect')).toHaveValue('checklist');
    await page.fill('#memoTitle', '研究ノート');
    await page.fill('#customNotebookInput', '研究');
    await page.fill('#memoBody', '# 見出し\n- [ ] 確認する\n重要キーワードを残す');
    await page.fill('#memoTags', '研究, 重要');
    await page.setInputFiles('#noteAttachmentInput', {
      name: 'sample.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('添付テキスト')
    });
    await expect(page.locator('#attachmentList .attachment-item')).toHaveCount(1);
    await page.click('#saveButton');

    await expect(page.locator('.memo-card-title h3')).toHaveText('研究ノート');
    await expect(page.locator('.notebook-chip').first()).toHaveText('研究');
    await expect(page.locator('.note-type-chip').first()).toHaveText('チェックリスト');
    await expect(page.locator('.attachment-summary')).toContainText('添付 1件');

    await page.click('.open-button');
    await page.waitForSelector('#memoDialog:not([hidden])');
    await expect(page.locator('#memoDialogToc')).toBeVisible();
    await expect(page.locator('#memoDialogToc')).toContainText('見出し');
    await expect(page.locator('#memoDialogBody h3')).toHaveText('見出し');
    await expect(page.locator('#memoDialogBody .rendered-check')).toContainText('確認する');
    await expect(page.locator('#memoDialogAttachments .attachment-item')).toHaveCount(1);

    await page.fill('#memoDialogSearch', '重要キーワード');
    await expect(page.locator('#memoDialogSearchStatus')).toHaveText('1件');
    await expect(page.locator('#memoDialogBody mark')).toContainText('重要キーワード');

    const downloadPromise = page.waitForEvent('download');
    await page.click('#memoDialogExportMdButton');
    const download = await downloadPromise;
    const filePath = await download.path();
    const content = fs.readFileSync(filePath, 'utf8');
    expect(download.suggestedFilename()).toBe('研究ノート.md');
    expect(content).toContain('# 研究ノート');
    expect(content).toContain('- ノートブック: 研究');

    await page.click('#memoDialogDuplicateButton');
    await expect(page.locator('#memoCount')).toHaveText('2件');
    let notes = JSON.parse(await page.evaluate(() => localStorage.getItem('note-desk-local-notes') || '[]'));
    expect(notes).toHaveLength(2);
    expect(notes.some((note) => note.title === '研究ノート コピー')).toBeTruthy();

    await page.click('#memoDialogArchiveButton');
    await expect(page.locator('#memoDialog')).toBeHidden();
    await expect(page.locator('.memo-card-title h3')).toHaveText('研究ノート コピー');
    await page.selectOption('#dateViewSelect', 'archive');
    await expect(page.locator('.memo-card-title h3')).toHaveText('研究ノート');
    notes = JSON.parse(await page.evaluate(() => localStorage.getItem('note-desk-local-notes') || '[]'));
    expect(notes.find((note) => note.title === '研究ノート').archived).toBeTruthy();
  });

  test('restores memo dialog that was open before reload', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('note-desk-local-notes', JSON.stringify([
        {
          id: 'last-open',
          title: '前回開いていたノート',
          body: 'reload restore',
          tags: [],
          updatedAt: new Date().toISOString(),
          favorite: false,
          pinned: false,
          reminderAt: ''
        }
      ]));
      localStorage.setItem('note-desk-last-open-note', JSON.stringify({
        id: 'last-open',
        dataMode: 'local',
        uid: 'local',
        openedAt: new Date().toISOString()
      }));
    });

    await page.goto('/memo.html');
    await page.waitForSelector('#memoDialog:not([hidden])');
    await expect(page.locator('#memoDialogTitle')).toHaveText('前回開いていたノート');
  });

  test('dark mode keeps settings icon readable', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('note-desk-display-settings', JSON.stringify({ dark: true, brightness: 100 }));
      localStorage.setItem('note-desk-custom-colors', JSON.stringify({
        accent: '#0f766e',
        bg: '#f7f5f0',
        text: '#202124',
        cardBg: '#fffefb'
      }));
    });

    await page.goto('/memo.html');
    await page.waitForSelector('#settingsButton');

    const styles = await page.evaluate(() => {
      const read = (selector) => {
        const element = document.querySelector(selector);
        const computed = getComputedStyle(element);
        return {
          color: computed.color,
          textFillColor: computed.webkitTextFillColor,
          background: computed.backgroundColor
        };
      };

      return {
        rootText: getComputedStyle(document.documentElement).getPropertyValue('--text').trim(),
        settings: read('#settingsButton'),
        newMemo: read('#newMemoButton'),
        sort: read('#sortSelect'),
        search: read('#searchInput'),
        help: read('#helpButton'),
        tag: read('#tagFilterButton')
      };
    });

    expect(styles.rootText).toBe('#eef3f1');
    for (const key of ['settings', 'newMemo', 'sort', 'search', 'help', 'tag']) {
      expect(styles[key].color).not.toBe('rgb(0, 0, 0)');
      expect(styles[key].textFillColor).not.toBe('rgb(0, 0, 0)');
    }
    expect(styles.settings.background).not.toBe('rgb(255, 255, 255)');
  });

  test('renders reminder even when cached template has no reminder slot', async ({ page }) => {
    await page.route('**/memo.html', async (route) => {
      const response = await route.fetch();
      const body = (await response.text()).replace('<p class="memo-reminder" hidden></p>', '');
      await route.fulfill({ response, body });
    });

    await page.addInitScript(() => {
      localStorage.setItem('note-desk-local-notes', JSON.stringify([
        {
          id: 'cached-template-reminder',
          title: '古いテンプレート確認',
          body: 'リマインダー表示枠なし',
          tags: [],
          updatedAt: new Date().toISOString(),
          favorite: false,
          pinned: false,
          reminderAt: { seconds: 1812255300, nanoseconds: 0 }
        }
      ]));
    });

    await page.goto('/memo.html');
    await page.waitForSelector('.memo-reminder:not([hidden])');
    await expect(page.locator('.memo-reminder')).toContainText('リマインダー');
  });

  test('settings dialog contains moved home controls and scrolls', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('note-desk-local-entry', 'true');
    });

    await page.goto('/memo.html');
    await page.waitForSelector('#settingsButton');
    await page.click('#settingsButton');
    await page.waitForSelector('#settingsDialog:not([hidden])');

    await expect(page.locator('.app-header #settingsButton')).toBeVisible();
    await expect(page.locator('.app-header #helpButton')).toBeVisible();
    await expect(page.locator('.app-header #feedbackButton')).toHaveCount(0);
    await expect(page.locator('.app-header #logoutButton')).toHaveCount(0);
    await expect(page.locator('.app-header #usernameForm')).toHaveCount(0);

    await expect(page.locator('#settingsDialog #helpButton')).toHaveCount(0);
    await expect(page.locator('#settingsDialog #feedbackButton')).toBeVisible();
    await expect(page.locator('#settingsDialog #logoutButton')).toHaveText('ログイン画面に戻る');
    await expect(page.locator('#settingsDialog #usernameForm')).toBeVisible();
    await expect(page.locator('#outlookReminderSelect')).toHaveValue('15');
    await expect(page.locator('#settingsDialog')).toContainText('ブラウザAI');
    const headerButtonSizes = await page.evaluate(() => {
      const settings = document.querySelector('#settingsButton').getBoundingClientRect();
      const help = document.querySelector('#helpButton').getBoundingClientRect();
      return {
        settingsWidth: settings.width,
        settingsHeight: settings.height,
        helpWidth: help.width,
        helpHeight: help.height
      };
    });
    expect(headerButtonSizes.helpWidth).toBe(headerButtonSizes.settingsWidth);
    expect(headerButtonSizes.helpHeight).toBe(headerButtonSizes.settingsHeight);

    const scrollState = await page.locator('.settings-dialog-body').evaluate((body) => {
      const style = getComputedStyle(body);
      return {
        overflowY: style.overflowY
      };
    });

    expect(scrollState.overflowY).toBe('auto');
  });

  test('help opens from header and shows illustrated feature instructions', async ({ page }) => {
    await page.goto('/memo.html');
    await page.waitForSelector('#helpButton');
    await page.click('#helpButton');

    await page.waitForSelector('#helpDialog:not([hidden])');
    await expect(page.locator('#helpDialogTitle')).toHaveText('使い方ガイド');
    await expect(page.locator('.help-card')).toHaveCount(5);
    await expect(page.locator('.help-dialog-body')).toContainText('ノートを作る');
    await expect(page.locator('.help-dialog-body')).toContainText('探す・絞り込む');
    await expect(page.locator('.help-dialog-body')).toContainText('整理する');
    await expect(page.locator('.help-dialog-body')).toContainText('表示と下書き');
    await expect(page.locator('.help-dialog-body')).toContainText('ブラウザAI');
    await expect(page.locator('#outlookHelpTitle')).toHaveText('Outlookでリマインダー通知を受ける');
    const outlookHelp = page.locator('[aria-labelledby="outlookHelpTitle"]');
    await expect(outlookHelp.locator('figure')).toHaveCount(3);
    await expect(outlookHelp).toContainText('Outlook予定に追加');
    await expect(outlookHelp).toContainText('朝8:00');
    await expect(outlookHelp).toContainText('予定時刻を選ぶと朝8:00');
    await expect(outlookHelp).toContainText('削除してOK');

    const images = await page.locator('#helpDialog img').evaluateAll((items) =>
      items.map((img) => ({
        complete: img.complete,
        width: img.naturalWidth,
        alt: img.getAttribute('alt')
      }))
    );

    expect(images).toHaveLength(8);
    for (const image of images) {
      expect(image.complete).toBeTruthy();
      expect(image.width).toBeGreaterThan(0);
      expect(image.alt.length).toBeGreaterThan(8);
    }

    const svgTexts = await page.evaluate(async () => {
      const sources = [...document.querySelectorAll('#helpDialog img')].map((img) => img.src);
      return Promise.all(sources.map(async (source) => {
        const response = await fetch(source);
        return response.text();
      }));
    });
    const combinedSvgText = svgTexts.join('\n');
    expect(combinedSvgText).not.toMatch(/Title|Tags|Save|Memo List|New|Search|Pin|Settings|Dark mode|Grid|List|Reminder 09:30|15 min reminder/);
    expect(combinedSvgText).not.toContain('15分前通知');
    expect(combinedSvgText).toContain('タイトル');
    expect(combinedSvgText).toContain('ノート一覧');
    expect(combinedSvgText).toContain('朝8:00予定');
    expect(combinedSvgText).toContain('ブラウザAI');
  });

  test('browser AI buttons apply generated title tags and summary', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('note-desk-ai-mode', 'auto');
      const prompt = async (input) => {
        if (input.includes('短いタイトル')) return '改善計画';
        if (input.includes('最大5個')) return '改善, 仕事, 重要';
        if (input.includes('3行以内')) return '- 改善内容を短く整理します';
        if (input.includes('チェックリスト')) return '- [ ] 改善案を確認する';
        return '読みやすく整えた本文です。';
      };
      const session = {
        prompt,
        clone: async () => ({ prompt, destroy() {} }),
        destroy() {}
      };
      Object.defineProperty(window, 'LanguageModel', {
        configurable: true,
        value: {
          availability: async () => 'available',
          create: async () => session
        }
      });
    });

    await page.goto('/memo.html');
    await page.waitForSelector('#memoBody');
    await page.fill('#memoBody', '今年の改善業務を整理して、優先順位を決める。');

    await page.click('[data-ai-action="title"]');
    await expect(page.locator('#memoTitle')).toHaveValue('改善計画');
    await expect(page.locator('#browserAiStatus')).toContainText('タイトルを作成');

    await page.click('[data-ai-action="tags"]');
    await expect(page.locator('#memoTags')).toHaveValue(/改善/);
    await expect(page.locator('#memoTags')).toHaveValue(/仕事/);

    await page.click('[data-ai-action="summary"]');
    await expect(page.locator('#memoBody')).toHaveValue(/## AI要約/);
  });

  test('browser AI falls back to lightweight local mode without LanguageModel', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('note-desk-ai-mode', 'light');
      Object.defineProperty(window, 'LanguageModel', {
        configurable: true,
        value: undefined
      });
      Object.defineProperty(window, 'ai', {
        configurable: true,
        value: undefined
      });
    });

    await page.goto('/memo.html');
    await page.waitForSelector('#memoBody');
    await page.fill('#memoBody', '今年の改善業務を整理して、優先順位を決める。資料を共有して、担当者へ連絡する。');

    await page.click('#browserAiCheckButton');
    await expect(page.locator('#browserAiStatus')).toContainText('軽量ブラウザAI');

    await page.click('[data-ai-action="title"]');
    await expect(page.locator('#memoTitle')).not.toHaveValue('');
    await expect(page.locator('#browserAiStatus')).toContainText('軽量AIでタイトル');

    await page.click('[data-ai-action="tags"]');
    await expect(page.locator('#memoTags')).toHaveValue(/仕事|資料|重要|改善/);

    await page.click('[data-ai-action="checklist"]');
    await expect(page.locator('#memoBody')).toHaveValue(/## AIチェックリスト/);
    await expect(page.locator('#memoBody')).toHaveValue(/- \[ \]/);
  });

  test('high performance browser AI uses WebLLM provider when available', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('note-desk-ai-mode', 'high');
      Object.defineProperty(navigator, 'gpu', {
        configurable: true,
        value: {}
      });
      window.__noteDeskWebLlmFactory = async () => ({
        prebuiltAppConfig: {
          model_list: [{ model_id: 'Qwen2-0.5B-Instruct-q4f16_1-MLC' }]
        },
        CreateMLCEngine: async (_model, config) => {
          config?.initProgressCallback?.({ text: 'mock loading', progress: 1 });
          return {
            chat: {
              completions: {
                create: async ({ messages }) => {
                  const prompt = messages.at(-1).content;
                  if (prompt.includes('短いタイトル')) {
                    return { choices: [{ message: { content: '高性能改善ノート' } }] };
                  }
                  return { choices: [{ message: { content: '- 高性能AIで整理しました' } }] };
                }
              }
            }
          };
        }
      });
    });

    await page.goto('/memo.html');
    await page.waitForSelector('#memoBody');
    await expect(page.locator('#browserAiModeSelect')).toHaveValue('high');
    await page.fill('#memoBody', '改善業務の内容を整理し、資料を共有する。');
    await page.click('[data-ai-action="title"]');
    await expect(page.locator('#memoTitle')).toHaveValue('高性能改善ノート');
    await expect(page.locator('#browserAiStatus')).toContainText('高性能AIでタイトル');
  });

  test('tag filter opens dialog and filters by selected tag', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('note-desk-local-notes', JSON.stringify([
        {
          id: 'tag-1',
          title: 'コジプロノート',
          body: 'tag filter',
          tags: ['コジプロ'],
          updatedAt: new Date().toISOString(),
          favorite: false,
          pinned: false,
          reminderAt: ''
        },
        {
          id: 'tag-2',
          title: 'タスクノート',
          body: 'tag filter',
          tags: ['タスク'],
          updatedAt: new Date(Date.now() - 1000).toISOString(),
          favorite: false,
          pinned: false,
          reminderAt: ''
        }
      ]));
    });

    await page.goto('/memo.html');
    await page.waitForSelector('#tagFilterButton');
    await page.click('#tagFilterButton');
    await page.waitForSelector('#tagFilterDialog:not([hidden])');
    await expect(page.locator('#tagFilter button')).toContainText(['すべて', 'コジプロ', 'タスク']);

    await page.getByRole('button', { name: 'コジプロ', exact: true }).click();
    await expect(page.locator('#tagFilterDialog')).toBeHidden();
    await expect(page.locator('#tagFilterButton')).toHaveText('タグ: コジプロ');
    await expect(page.locator('.memo-card-title h3')).toHaveText('コジプロノート');

    await page.click('#tagFilterButton');
    await page.getByRole('button', { name: 'すべて', exact: true }).click();
    await expect(page.locator('#tagFilterButton')).toHaveText('タグ絞り込み');
    await expect(page.locator('.memo-card')).toHaveCount(2);
  });

  test('tag filter button stays horizontal on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/memo.html');
    await page.waitForSelector('#tagFilterButton');

    const buttonStyle = await page.locator('#tagFilterButton').evaluate((button) => {
      const style = getComputedStyle(button);
      const box = button.getBoundingClientRect();
      return {
        writingMode: style.writingMode,
        whiteSpace: style.whiteSpace,
        wordBreak: style.wordBreak,
        width: box.width,
        height: box.height
      };
    });

    expect(buttonStyle.writingMode).toBe('horizontal-tb');
    expect(buttonStyle.whiteSpace).toBe('nowrap');
    expect(buttonStyle.wordBreak).toBe('keep-all');
    expect(buttonStyle.width).toBeGreaterThan(buttonStyle.height);
  });

  test('uses wider desktop space while keeping mobile single column', async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await page.goto('/memo.html');
    await page.waitForSelector('.app');

    const desktop = await page.evaluate(() => {
      const app = document.querySelector('.app').getBoundingClientRect();
      const sidebar = document.querySelector('.workspace-sidebar').getBoundingClientRect();
      const editor = document.querySelector('.editor').getBoundingClientRect();
      const library = document.querySelector('.library').getBoundingClientRect();
      const gridColumns = getComputedStyle(document.querySelector('.app')).gridTemplateColumns;
      return {
        appWidth: app.width,
        sidebarWidth: sidebar.width,
        editorWidth: editor.width,
        libraryWidth: library.width,
        gridColumns
      };
    });

    expect(desktop.appWidth).toBeGreaterThan(1320);
    expect(desktop.sidebarWidth).toBeLessThan(desktop.libraryWidth);
    expect(desktop.libraryWidth).toBeGreaterThan(380);
    expect(desktop.editorWidth).toBeGreaterThan(360);
    expect(desktop.gridColumns.split(' ').length).toBe(3);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();
    await page.waitForSelector('.app');

    const mobile = await page.evaluate(() => {
      const app = document.querySelector('.app').getBoundingClientRect();
      const gridColumns = getComputedStyle(document.querySelector('.app')).gridTemplateColumns;
      return {
        appWidth: app.width,
        viewportWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        gridColumns
      };
    });

    expect(mobile.appWidth).toBeLessThanOrEqual(mobile.viewportWidth);
    expect(mobile.scrollWidth).toBeLessThanOrEqual(mobile.viewportWidth);
    expect(mobile.gridColumns.split(' ').length).toBe(1);
  });
});
