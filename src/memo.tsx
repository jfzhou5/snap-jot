import {
  Form,
  ActionPanel,
  Action,
  getPreferenceValues,
  openExtensionPreferences,
  LaunchProps,
  popToRoot,
  Toast,
  showToast,
} from "@raycast/api";
import { useForm } from "@raycast/utils";
import fs from "fs";
import path from "path";
import { formatDateTime } from "./utils/FormatDateTime";

interface MemoContent {
  memo: string;
}

interface Preferences {
  directory: string;
  format: string;
  prefix: string;
  timeFormat: string;
  template: string;
}

export type Memo = {
  date: string;
  content: string;
};

export default function Command(props: LaunchProps<{ draftValues: Memo }>) {
  const preferences = getPreferenceValues<Preferences>();
  const { directory, format, prefix } = preferences;
  const { draftValues } = props;

  function saveMemo(values: MemoContent) {
    try {
      const filePath = path.join(directory, formatDateTime(new Date(), format));
      const memo: Memo = {
        date: formatDateTime(new Date(), prefix),
        content: values.memo,
      };
      let newContent: Array<Memo> = [];
      if (fs.existsSync(filePath)) {
        const existingContent = fs.readFileSync(filePath, "utf8");
        newContent = JSON.parse(existingContent);
      }
      newContent.push(memo);

      fs.writeFileSync(filePath, JSON.stringify(newContent, null, 2));
      const successOptions: Toast.Options = {
        style: Toast.Style.Success,
        title: "Memo Saved",
        message: memo.content,
      };
      showToast(successOptions);
    } catch (error) {
      const failureOptions: Toast.Options = {
        style: Toast.Style.Failure,
        title: "Error Saving Memo",
        message: (error as Error).message,
      };
      showToast(failureOptions);
    }
  }

  const { handleSubmit, reset, itemProps } = useForm<MemoContent>({
    onSubmit(values) {
      saveMemo(values);
      reset();
      popToRoot();
    },
  });

  return (
    <Form
      enableDrafts={true}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
          <Action title="Open Extension Preferences" onAction={openExtensionPreferences} />
        </ActionPanel>
      }
    >
      <Form.TextArea
        title="Memo"
        {...itemProps.memo}
        placeholder="Whats on your mind..."
        defaultValue={draftValues?.content}
      />
    </Form>
  );
}
