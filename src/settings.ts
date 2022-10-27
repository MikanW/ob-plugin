import { App, Notice, PluginSettingTab, Setting } from 'obsidian';
import { WordCountPlugin } from '../main';

export interface WordCountSettingsTab {
	mySetting: string;
	docType: string;
}

export class WordCountSettingsTab extends PluginSettingTab {
	plugin: WordCountPlugin;

	constructor(app: App, plugin: WordCountPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();
		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
        this.fileFilter();
    }

    private fileFilter() {
        new Setting(this.containerEl)
            .setName('文件Filter')
            .setDesc('请设置字数统计的目标文件的YAML中的doc-type字段')
            .addText( text => text
                .setPlaceholder(this.plugin.settings.docType)
                .setValue(this.plugin.settings.docType)
                .onChange(async (value) => {
                    this.plugin.settings.docType = value;
                    new Notice(value);
                    await this.plugin.saveSettings();
                })
            )
    }
}