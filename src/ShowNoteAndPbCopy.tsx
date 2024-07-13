import { Detail, showToast, Toast } from "@raycast/api";
import { pbcopy } from "./utils/utils";

export type NoteDetails = {
  content: string;
};

export function ShowNoteAndPbCopy(props: NoteDetails) {
  const fileContent = props.content;
  // ignore the prefix of time
  pbcopy(fileContent.slice(6));
  const successOptions: Toast.Options = {
    style: Toast.Style.Success,
    title: "Copied to clipboard",
    message: "",
  };
  showToast(successOptions);
  return <Detail markdown={fileContent.replace("- ", "")} />;
}
