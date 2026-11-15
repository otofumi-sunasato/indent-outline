# Plain Text Outline Navigator

[日本語版](README.ja.md)

This extension displays plain-text documents as an indentation-based hierarchy in the VS Code Outline view.

- Show documents using the `plaintext` language mode as a hierarchy in the Outline view.
- Analyze indentation to offer a view that makes headings easier to identify.
- Choose from several icons for outline entries.
- Keep the original files unchanged.

## Motivation

I use VS Code every day for notes, ideas, and reminders—not only for development, but also as a general-purpose text editor. I use indentation (tabs) to organize headings and structure in my text.

VS Code does not interpret indentation in plain-text documents as an outline. When I want to understand the overall structure, check whether a heading exists, jump directly to a heading, or rearrange a section, it can be difficult to navigate long documents because their headings (symbols) are not shown in the Outline view.

Markdown is one solution, and I use it often. However, I have many existing files, and I wanted to show them in the Outline view without changing the files.

## Two ways to use the outline

Choose the view that fits what you are doing:

- **All Lines View** (`indentOutline.displayMode: allLines`, the default) shows all lines in a compact, collapsible view of the entire document in the Outline view.
- **Heading View** (`indentOutline.displayMode: headingFocused`) hides indented lines that are likely to be content, making headings easier to identify. Root lines are always shown.

Blank lines are omitted from the outline in both views.

## Features

- Build a hierarchy from indentation in plain-text documents.
- Interpret tabs and spaces using the document's editor `tabSize` setting.
- Switch between an all-lines view and a heading view.
- Choose from several icons for outline entries.
- Keep your original text unchanged.

## Usage

1. Open a document using the `plaintext` language mode.
2. Indent lines to organize them into levels.
3. Open **Outline** in the Explorer view to browse and navigate the hierarchy.
4. Set `indentOutline.displayMode` to choose a view.

Example:

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

### All Lines View

With `indentOutline.displayMode` set to `allLines`:

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

### Heading View

With `indentOutline.displayMode` set to `headingFocused`:

```text
Project
    Planning
        Requirements
        Schedule
    Work
```

## Extension settings

| Setting | Default | Description |
| --- | --- | --- |
| `indentOutline.displayMode` | `allLines` | `allLines` shows all text in a compact, collapsible view in the Outline view. `headingFocused` hides lines likely to be content to make headings easier to identify. Root lines are always shown. |
| `indentOutline.symbolKind` | `String` | Choose the icon shown for outline entries: `String`, `Constant`, `Method`, `Number`, `Array`, or `TypeParameter`. |

Indentation is interpreted using the editor's `editor.tabSize` setting for the document. If `editor.tabSize` is set to `auto`, a value of 4 is used.

## Supported documents

The extension provides an outline for documents using the `plaintext` language mode.
