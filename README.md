# Plain Text Outline Navigator

Turn indentation in plain-text documents into a navigable hierarchy in the VS Code Outline view, without changing the original files.

## Two ways to use the outline

Choose the view that fits what you are doing:

- **All Lines View** (`indentOutline.displayMode: allLines`, the default) shows all lines in a compact, collapsible view of the entire document.
- **Heading-Focused View** (`indentOutline.displayMode: headingFocused`) hides indented lines without children, which are likely to be content, to make headings easier to identify. Root lines are always shown.

Blank lines are omitted from the outline in both views.

## Features

- Build a hierarchy from indentation in plain-text documents.
- Interpret tabs and spaces using the document's editor `tabSize` setting.
- Switch between an all-lines view and a heading-focused view.
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

### Heading-Focused View

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
| `indentOutline.displayMode` | `allLines` | Choose `allLines` for a compact, collapsible view of all lines, or `headingFocused` to hide likely content lines and make headings easier to identify. |
| `indentOutline.symbolKind` | `String` | Choose the VS Code symbol icon used for outline entries: `String`, `Constant`, `Method`, `Number`, `Array`, or `TypeParameter`. |

Indentation is interpreted using the editor's `editor.tabSize` setting for the document. If `editor.tabSize` is set to `auto`, a value of 4 is used.

## Supported documents

The extension provides an outline for documents using the `plaintext` language mode.
