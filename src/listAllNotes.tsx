import { List, ActionPanel, Action, getPreferenceValues, Icon, showToast, Toast } from "@raycast/api";
import fs from "fs";
import path from "path";
import { useState } from "react";
import { ShowNoteAndPbCopy } from "./ShowNoteAndPbCopy";

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

  const files = readFiles().reverse();

  let fileContent = "";
  try {
    for (const file of files) {
      fileContent += fs.readFileSync(file.path, "utf-8");
    }
  } catch (error) {
    showToast({
      style: Toast.Style.Failure,
      title: "Failed to read file",
      message: (error as Error).message, // Type assertion to specify the type of 'error'
    });
  }
  const bulletPoints = fileContent
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .reverse();
  const [searchText, setSearchText] = useState("");
  const filteredBulletPoints = bulletPoints.filter((point) => point.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <List searchBarPlaceholder="Search Notes" onSearchTextChange={setSearchText} throttle={true}>
      {filteredBulletPoints.map((point, index) => (
        <List.Item
          key={index}
          title={point.replace("- ", "")}
          actions={
            <ActionPanel>
              <Action.Push
                title="Show Details"
                icon={Icon.Circle}
                target={<ShowNoteAndPbCopy content={point.replace("- ", "")} />}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
