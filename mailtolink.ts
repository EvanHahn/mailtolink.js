type Address = string | string[];

type MailtolinkOptions = Readonly<{
  subject?: string;
  cc?: Address;
  bcc?: Address;
  body?: string;
}>;

export function mailtolink(to: Address, options?: MailtolinkOptions): string;
export function mailtolink(options: MailtolinkOptions): string;
export function mailtolink(
  to: Address | MailtolinkOptions,
  options?: MailtolinkOptions,
): string {
  const result: Array<string | string[]> = ["mailto:"];

  if (isString(to) || Array.isArray(to)) {
    result.push(to);
  } else {
    options = to;
  }

  const queryString: string[] = [];
  if (options) {
    if (options.subject) {
      queryString.push("subject=" + encodeURIComponent(options.subject));
    }
    if (options.cc) {
      queryString.push("cc=" + options.cc);
    }
    if (options.bcc) {
      queryString.push("bcc=" + options.bcc);
    }
    if (options.body) {
      queryString.push(
        "body=" + encodeURIComponent(options.body).replace(/%0A/g, "%0D%0A"),
      );
    }

    if (queryString.length) {
      result.push("?", queryString.join("&"));
    }
  }

  return result.join("");
}

function isString(value: unknown): value is string {
  return Object.prototype.toString.call(value) === "[object String]";
}
