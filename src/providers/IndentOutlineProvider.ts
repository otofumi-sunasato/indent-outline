import * as vscode from "vscode";
import { Config } from "../config/Config";

export class IndentOutlineProvider implements vscode.DocumentSymbolProvider {
	provideDocumentSymbols(
		document: vscode.TextDocument,
		_token: vscode.CancellationToken,
	): vscode.ProviderResult<vscode.DocumentSymbol[]> {
		const nodes: OutlineNode[] = [];
		const stack: { depth: number; node: OutlineNode }[] = [];

		let previousIndent = 0;
		let previousDepth = 0;
		let hasPreviousLine = false;
		const tabSize = Config.getTabSize(document.uri);
		const symbolKind = Config.getSymbolKind();

		for (let line = 0; line < document.lineCount; line++) {
			const text = document.lineAt(line).text;

			if (text.trim() === "") {
				continue;
			}

			const indent = countLeadingIndentLevels(text, tabSize);

			let depth: number;

			if (!hasPreviousLine) {
				depth = 0;
			} else if (previousIndent < indent) {
				depth = previousDepth + 1;
			} else if (indent < previousIndent) {
				depth = indent;
			} else {
				depth = previousDepth;
			}

			const name = text.trim();
			const range = new vscode.Range(line, 0, line, text.length);
			const indentStart = countLeadingIndentCharacters(text);
			const selectionRange = new vscode.Range(line, indentStart, line, text.length);

			const symbol = new vscode.DocumentSymbol(
				name,
				"",
				symbolKind,
				range,
				selectionRange,
			);
			const node: OutlineNode = {
				depth,
				isRoot: depth === 0,
				isIndented: 0 < indentStart,
				symbol,
				children: [],
			};

			while (
				0 < stack.length &&
				depth <= stack[stack.length - 1].depth
			) {
				stack.pop();
			}

			if (stack.length === 0) {
				nodes.push(node);
			} else {
				stack[stack.length - 1].node.children.push(node);
			}

			stack.push({ depth, node });

			previousIndent = indent;
			previousDepth = depth;
			hasPreviousLine = true;
		}

		const showIndentedLeafNodes = Config.getDisplayMode() === "allLines";
		return createDocumentSymbols(nodes, showIndentedLeafNodes);
	}
}

interface OutlineNode {
	depth: number;
	isRoot: boolean;
	isIndented: boolean;
	symbol: vscode.DocumentSymbol;
	children: OutlineNode[];
}

function countLeadingIndentLevels(text: string, tabSize: number): number {
	let columns = 0;
	let index = 0;

	while (index < text.length && (text[index] === "\t" || text[index] === " ")) {
		if (text[index] === "\t") {
			columns += tabSize - (columns % tabSize);
		} else {
			columns++;
		}
		index++;
	}

	return Math.ceil(columns / tabSize);
}

function countLeadingIndentCharacters(text: string): number {
	let index = 0;

	while (index < text.length && (text[index] === "\t" || text[index] === " ")) {
		index++;
	}

	return index;
}

function createDocumentSymbols(
	nodes: OutlineNode[],
	showIndentedLeafNodes: boolean,
): vscode.DocumentSymbol[] {
	return nodes
		.filter(
			(node) =>
				showIndentedLeafNodes ||
				node.isRoot ||
				!node.isIndented ||
				0 < node.children.length,
		)
		.map((node) => {
			node.symbol.children.push(
				...createDocumentSymbols(node.children, showIndentedLeafNodes),
			);
			return node.symbol;
		});
}
