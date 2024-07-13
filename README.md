<br>
<br>
<p align="center">
<img src="https://github.com/jfzhou5/snap-jot/blob/main/assets/command-icon.png?raw=true" width="140" height="140" align="center" />
</p>

<h1 align="center">SnapJot</h1>

<p align="center">
Create a memo with a timestamp using this Raycast Extension. Quickly jot down notes in your specified files.
</p>

## Configuration

The SnapJot extension allows you to tailor its behavior to your needs with both required and optional settings.

### Required Settings

These settings are essential for the extension to work properly.

#### Directory

Specify the folder where your memos will be saved. Default is `~/Documents`.

### Optional Settings

These settings are optional and can be customized according to your preference.

#### Format

The format of the note file name, e.g., `YYYY-MM-DD.json` results in `2023-12-11.json`. Default is `YYYY-MM-DD.json`.

#### Prefix

The prefix of the note, e.g., `YYYY-MM-DD HH:mm` results in `date: 2024-07-13 23:19`.

template file example:

```
[
  {
    "date": "2024-07-13 23:19",
    "content": "1234124812y21y3"
  },
  {
    "date": "2024-07-13 23:27",
    "content": "dsds"
  },
  {
    "date": "2024-07-13 23:27",
    "content": "interface Preferences {\n  directory: string;\n  format: string;\n  prefix: string;\n  timeFormat: string;\n  template: string;\n}\n"
  }
]
```
Tips: when you show details of the memo, the `content` will be copied to clipboard automaticly.

Pics example:

<img src="https://github.com/jfzhou5/snap-jot/blob/main/assets/example-for-code.jpg?raw=true" width="80%" align="center" />
<img src="https://github.com/jfzhou5/snap-jot/blob/main/assets/example.jpg?raw=true" width="80%" align="center" />
