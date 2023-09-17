// SPDX-FileCopyrightText: GSConnect Developers https://github.com/GSConnect
//
// SPDX-License-Identifier: GPL-2.0-or-later

import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import Adw from 'gi://Adw';

// Bootstrap
import * as Utils from './shell/utils.js';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class GSConnectExtensionPreferences extends ExtensionPreferences {
    constructor(metadata) {
        super(metadata);
        Utils.setupExtensionData(this.path);
        Utils.installService();
    }

    fillPreferencesWindow(window) {
        const widget = new Adw.PreferencesPage();
        window.add(widget);

        GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
            window.close();
        });

        Gio.Subprocess.new([`${this.path}/gsconnect-preferences`], 0);
    }
}

