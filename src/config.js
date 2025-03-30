async function writeConfig(json) {
  let data = JSON.stringify(json);
  try {
    if (!fs.existsSync(path.join(".", "data"))) {
      fs.mkdirSync(path.join(".", "data"));
    }
    fs.writeFile(path.join(".", "data", "config.json"), data, {
      mode: 0o600,
    });
  } catch (err) {
    console.error("Error writing config, do we have sufficient permissions?");
  }
}
