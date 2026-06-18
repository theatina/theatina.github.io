# 📝 Markdown Flat-File CMS

This repository uses a custom, automated Flat-File Content Management System. You write content in simple Markdown (`.md`) files, and the background scripts automatically handle frontmatter generation, ID assignment, exact timestamps, and JSON compilation for the live website.

## 📂 Directory Structure
All writing takes place inside `assets/raw/writings/`. There are three main folders:

* **`/unpublished`** (Drafts & Edits) - Where you create new posts or edit old ones. 
* **`/published`** (Live Site) - Where live posts live. The script moves files here automatically once processed.
* **`/deleted`** (Trash) - Move files here to permanently remove them from the live site (while keeping a local backup of the text).

## ✍️ How to Write & Edit

### 1. Create a New Post
Simply create a new `.md` file in the `unpublished` folder. You do **not** need to worry about IDs or dates. 

You can use this minimal template, or even leave the frontmatter (`---`) out entirely!

```markdown
---
category: General
tags: [ideas, coding]
---
# My Post Title

Post content goes here...
```

*When the script runs, it will auto-generate an ID, exact `created` and `updated` timestamps, and move the file to `/published`.*

### 2. Edit an Existing Post
To edit a post that is already live:
1. Drag the file from `/published` back into `/unpublished`.
2. Make your edits and save.
3. *When the script runs, it will automatically update the `updated` timestamp to the exact current time and move it back to `/published`.*

### 3. Delete a Post
To unpublish a post:
1. Drag the file into the `/deleted` folder.
2. *When the script runs, it will permanently strip that post's ID from the live JSON data.*

---

## 🚀 Running the Compiler

Run these commands from the **root directory** of your project.

### Option A: Manual Update
If you just want to run a one-time sweep to compile your drafts into the live site without keeping a watcher open:
```bash
node js/update_archive.js
```

## ⚙️ Output
Both scripts compile all valid Markdown files and output them into a single, highly-optimized JSON array located at:
`js/archive_data.js`

This file is automatically sorted from **newest to oldest** (down to the millisecond) based on the `updated` timestamp.