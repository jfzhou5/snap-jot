import { Detail, showToast, Toast } from "@raycast/api";
import { pbcopy } from "./utils/utils";

export type NoteDetails = {
  content: string;
};

export function ShowNoteAndPbCopy(props: NoteDetails) {
  const content = props.content;
  const datePrefix = content.slice(0, 17);
  const detail = content.slice(19);
  // ignore the prefix of time
  pbcopy(detail);
  const successOptions: Toast.Options = {
    style: Toast.Style.Success,
    title: "Copied to clipboard",
    message: "",
  };
  showToast(successOptions);
  return <Detail markdown={`${datePrefix} \n` + "```\n" + detail + "\n```"} />;
}
