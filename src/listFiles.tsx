import { List, ActionPanel, Action, getPreferenceValues, Icon, showToast, Toast } from "@raycast/api";
import fs from "fs";
import path from "path";
import { useState } from "react";
import { ShowNoteAndPbCopy } from "./ShowNoteAndPbCopy";
import { Memo } from "./memo";

interface ShowNoteProps {
  filePath: string;
}

interface Preferences {
  directory: string;
  format: string;
  prefix: string;
  timeFormat: string;
  template: string;
}

export default function Command() {
  const preferences = getPreferenceValues<Preferences>();
  const folderPath = preferences.directory;

  // Function to read files from a directory
  const readFiles = () => {
    try {
      return fs.readdirSync(folderPath).map((fileName) => ({
        name: fileName,
        path: path.join(folderPath, fileName),
      }));
    } catch (error) {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to read directory",
        message: (error as Error).message, // Type assertion to specify the type of 'error'
      });
      return [];
    }
  };

  const files = readFiles()
    .filter((v) => !v.name.includes(".DS_Store"))
    .reverse();

  return (
    <List searchBarPlaceholder="Search Notes">
      {files.map((file) => (
        <List.Item
          key={file.path}
          title={file.name}
          actions={
            <ActionPanel>
              <Action.Push title="View Content" icon={Icon.ChevronRight} target={<ShowNote filePath={file.path} />} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

function ShowNote(props: ShowNoteProps) {
  let fileContent: Array<string> = [];
  try {
    fileContent = JSON.parse(fs.readFileSync(props.filePath, "utf-8")).map(
      (v: Memo) => `${v.date}   ${v.content}`,
    );
  } catch (error) {
    showToast({
      style: Toast.Style.Failure,
      title: "Failed to read file",
      message: (error as Error).message, // Type assertion to specify the type of 'error'
    });
  }
  const bulletPoints = fileContent.reverse();
  const [searchText, setSearchText] = useState("");
  const filteredBulletPoints = bulletPoints.filter((point) => point.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <List searchBarPlaceholder="Search Memos" onSearchTextChange={setSearchText} throttle={true}>
      {filteredBulletPoints.map((point, index) => (
        <List.Item
          key={index}
          title={point.slice(11)}
          actions={
            <ActionPanel>
              <Action.Push title="Show Details" icon={Icon.Circle} target={<ShowNoteAndPbCopy content={point} />} />
              <Action.Open title="Open File" target={props.filePath} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
