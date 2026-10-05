---
title: "TIL: git commit --fixup and --autosquash"
date: 2026-10-05
description: "Sample post — replace with your own content. A quick git trick for keeping feature branches clean."
tags: ["til", "git"]
draft: false
---

<div class="sample-notice">

**Sample post — replace with your own content.** Short TIL-style posts like this one
live in `src/content/blog/` as Markdown files and are tagged `til`.

</div>

TIL that `git commit --fixup` exists, and I wish I'd learned it years earlier.

When you spot a small mistake in an earlier commit on your branch, instead of making a
new "fix typo" commit that pollutes history, do:

```bash
git commit --fixup <commit-sha>
```

Then, when you're ready to clean up, `git rebase -i --autosquash main` will
automatically move the fixup commit right under the commit it fixes and mark it as
`squash` — no manual reordering in the editor. The final history looks like the
mistake never happened.
