import * as vscode from "vscode";

const CONFIGURATION_SECTION = "indentOutline";
const EDITOR_CONFIGURATION_SECTION = "editor";
const TAB_SIZE_SETTING = "tabSize";
const DISPLAY_MODE_SETTING = "displayMode";
const SYMBOL_KIND_SETTING = "symbolKind";
const DEFAULT_TAB_SIZE = 4;
const DEFAULT_DISPLAY_MODE: DisplayMode = "allLines";
const DEFAULT_SYMBOL_KIND: SymbolKindOption = "String";

type DisplayMode = "allLines" | "headingFocused";
type SymbolKindOption =
	| "String"
	| "Constant"
	| "Method"
	| "Number"
	| "Array"
	| "TypeParameter";

const SYMBOL_KIND_MAP: Record<SymbolKindOption, vscode.SymbolKind> = {
	String: vscode.SymbolKind.String,
	Constant: vscode.SymbolKind.Constant,
	Method: vscode.SymbolKind.Method,
	Number: vscode.SymbolKind.Number,
	Array: vscode.SymbolKind.Array,
	TypeParameter: vscode.SymbolKind.TypeParameter,
};

export class Config {
	static getTabSize(documentUri: vscode.Uri): number {
		const configuredTabSize = vscode.workspace
			.getConfiguration(EDITOR_CONFIGURATION_SECTION, documentUri)
			.get<number | "auto">(TAB_SIZE_SETTING, DEFAULT_TAB_SIZE);

		return typeof configuredTabSize === "number" && 0 < configuredTabSize
			? configuredTabSize
			: DEFAULT_TAB_SIZE;
	}

	static getDisplayMode(): DisplayMode {
		return vscode.workspace
			.getConfiguration(CONFIGURATION_SECTION)
			.get<DisplayMode>(DISPLAY_MODE_SETTING, DEFAULT_DISPLAY_MODE);
	}

	static getSymbolKind(): vscode.SymbolKind {
		const configuredSymbolKind = vscode.workspace
			.getConfiguration(CONFIGURATION_SECTION)
			.get<SymbolKindOption>(SYMBOL_KIND_SETTING, DEFAULT_SYMBOL_KIND);
		const symbolKind = SYMBOL_KIND_MAP[configuredSymbolKind];

		if (symbolKind === undefined) {
			throw new Error(
				`Unsupported symbol kind configured: ${configuredSymbolKind}`,
			);
		}

		return symbolKind;
	}

	static affectsConfiguration(event: vscode.ConfigurationChangeEvent): boolean {
		return (
			event.affectsConfiguration(CONFIGURATION_SECTION) ||
			event.affectsConfiguration(
				`${EDITOR_CONFIGURATION_SECTION}.${TAB_SIZE_SETTING}`,
			)
		);
	}
}
