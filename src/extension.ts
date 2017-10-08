'use strict';

import * as vscode from 'vscode';
import { getActions } from './hubs/hub_entrypoint';
import * as _ from 'lodash';

export function activate(context: vscode.ExtensionContext) {

    let actions = getActions();

    // @TODO: Union this for all theo ther commands too later
    _.each(actions, function (action) {
        let command = vscode.commands.registerCommand(action.command, action.function);

        context.subscriptions.push(command);
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}