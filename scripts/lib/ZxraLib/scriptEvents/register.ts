import { PluginsData, Script, ScriptParams, Terra } from "../module";

Script.add("add-plugin", ({ msg }: ScriptParams) => {
  Terra.addPlugins(JSON.parse(msg[0]) as PluginsData);
});
