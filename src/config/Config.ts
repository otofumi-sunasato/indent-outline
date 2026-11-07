import * as vscode from "vscode";

const CONFIGURATION_SECTION = "indentOutline";
const EDITOR_CONFIGURATION_SECTION = "editor";
const TAB_SIZE_SETTING = "tabSize";
const SHOW_INDENTED_LEAF_NODES_SETTING = "showIndentedLeafNodes";
const DEFAULT_TAB_SIZE = 4;

export class Config {
	static getTabSize(documentUri: vscode.Uri): number {
		const configuredTabSize = vscode.workspace
			.getConfiguration(EDITOR_CONFIGURATION_SECTION, documentUri)
			.get<number | "auto">(TAB_SIZE_SETTING, DEFAULT_TAB_SIZE);

		return typeof configuredTabSize === "number" && 0 < configuredTabSize
			? configuredTabSize
			: DEFAULT_TAB_SIZE;
	}

	static getShowIndentedLeafNodes(): boolean {
		return vscode.workspace
			.getConfiguration(CONFIGURATION_SECTION)
			.get<boolean>(SHOW_INDENTED_LEAF_NODES_SETTING, true);
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
