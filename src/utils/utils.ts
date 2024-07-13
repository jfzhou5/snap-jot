import child_process from "child_process";

export function pbcopy(data: unknown) {
  return new Promise(function (resolve, reject) {
    const child = child_process.spawn("pbcopy");

    child.on("error", function (err: unknown) {
      reject(err);
    });

    child.on("close", function () {
      resolve(data);
    });

    child.stdin.write(data);
    child.stdin.end();
  });
}
