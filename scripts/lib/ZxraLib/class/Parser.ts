/**
 * Utility class to handle string text into other format
 */
class Parser {
  /**
   * Split all text to separated array
   *
   * @param data text want to separate
   * @returns array of string
   */
  static stringArray(data: string): string[] | undefined {
    const regex = data.match(/"[^"]*"|'[^'*]|`[^*`]|\([^)]*\)|\S+/g)?.map((e) => {
      if (
        (e.startsWith('"') && e.endsWith('"')) ||
        (e.startsWith("'") && e.endsWith("'")) ||
        (e.startsWith("`") && e.endsWith("`")) ||
        (e.startsWith("(") && e.endsWith(")"))
      ) {
        return e.slice(1, -1);
      }
      return e;
    });

    return regex;
  }

  static clone(data: Object): Object {
    return JSON.parse(JSON.stringify(data));
  }
}

export { Parser };
