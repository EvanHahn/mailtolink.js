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
  const result: string[] = ["mailto:"];

  if (isString(to) || Array.isArray(to)) {
    result.push(encodeAddresses(to));
  } else {
    options = to;
  }

  const queryString: string[] = [];
  if (options) {
    if (options.subject) {
      queryString.push("subject=" + encodeURIComponent(options.subject));
    }
    if (options.cc) {
      queryString.push("cc=" + encodeAddresses(options.cc));
    }
    if (options.bcc) {
      queryString.push("bcc=" + encodeAddresses(options.bcc));
    }
    if (options.body) {
      queryString.push("body=" + encodeBody(options.body));
    }

    if (queryString.length) {
      result.push("?", queryString.join("&"));
    }
  }

  return result.join("");
}

function encodeAddress(addr: string): string {
  const encoded = encodeURIComponent(addr);
  const lastAt = encoded.lastIndexOf("%40");
  if (lastAt === -1) return encoded;
  return encoded.slice(0, lastAt) + "@" + encoded.slice(lastAt + 3);
}

function encodeAddresses(addr: Address): string {
  if (Array.isArray(addr)) {
    return addr.map(encodeAddress).join(",");
  }
  return encodeAddress(addr);
}

function encodeBody(body: string): string {
  const normalized = body.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  return encodeURIComponent(normalized).replace(/%0A/g, "%0D%0A");
}

function isString(value: unknown): value is string {
  return Object.prototype.toString.call(value) === "[object String]";
}
