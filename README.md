# Indent Outline

Indent Outline displays plain-text documents as a hierarchy based on indentation in the VS Code Outline view.

## Motivation

I often use VS Code as a text editor for everyday notes, ideas, and reminders, organizing headings and sections with indentation (tabs).

VS Code does not interpret indentation in plain text as an outline by default. When I want to get an overview, find a heading, jump to a section, or reorganize content by section, it can be difficult to do so in a long document without headings in the Outline view.

Writing in Markdown is one way to address this, but I have many existing plain-text files. I created this extension to show headings in the Outline view without changing those files.

## Features

- View indented plain text as a hierarchy in the VS Code Outline view.
- Interpret indentation using the editor's `tabSize` setting. Both tabs and spaces are supported.
- Choose whether to show indented lines that do not have child lines. Since the deepest indented lines often contain content rather than headings, hiding them can make the outline easier to scan.

## Usage

1. Open a plain-text document.
2. Add indentation at the beginning of lines to organize them into levels.
3. Open **Outline** in the Explorer view to browse the hierarchy.

For example:

```text
Project
    Planning
        Requirements
            Enough space for the planters and good drainage
        Schedule
            Day 1: Cleaning
            Day 2: Assembly
    Work
        Preparation
        Features
```

## Extension settings

| Setting | Default | Description |
| --- | --- | --- |
| `indentOutline.showIndentedLeafNodes` | `true` | Show indented lines that do not have child lines. |

### Example: `showIndentedLeafNodes = true`

```text
Project
    Planning
        Requirements
            Enough space for the planters and good drainage
        Schedule
            Day 1: Cleaning
            Day 2: Assembly
    Work
        Preparation
        Features
```

### Example: `showIndentedLeafNodes = false`

```text
Project
    Planning
        Requirements
        Schedule
    Work
```

Indentation is interpreted using the editor's `editor.tabSize` setting for the document. If `editor.tabSize` is set to `auto`, a value of 4 is used.

## Supported documents

The extension provides an outline for documents using the `plaintext` language mode.
