import * as vscode from "vscode";
import { Config } from "./config/Config";
import { IndentOutlineProvider } from "./providers/IndentOutlineProvider";

export function activate(context: vscode.ExtensionContext) {
	const provider = new IndentOutlineProvider();
	let providerDisposable = registerProvider(provider);

	context.subscriptions.push(
		{
			dispose: () => providerDisposable.dispose(),
		},
		vscode.workspace.onDidChangeConfiguration((event) => {
			if (!Config.affectsConfiguration(event)) {
				return;
			}

			providerDisposable.dispose();
			providerDisposable = registerProvider(provider);
		}),
	);
}

export function deactivate() {}

function registerProvider(
	provider: vscode.DocumentSymbolProvider,
): vscode.Disposable {
	return vscode.languages.registerDocumentSymbolProvider(
		{ language: "plaintext" },
		provider,
	);
}
