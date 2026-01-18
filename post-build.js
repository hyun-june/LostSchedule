const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "dist", "index.html");

if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, "utf8");

  // 만약 매니페스트 링크가 없다면 추가
  if (!html.includes('rel="manifest"')) {
    const manifestTag =
      '\n    <link rel="manifest" href="/manifest.json" />\n    <meta name="theme-color" content="#ffc030" />';
    html = html.replace("</head>", `${manifestTag}\n  </head>`);

    fs.writeFileSync(indexPath, html, "utf8");
    console.log("✅ index.html에 매니페스트 태그를 강제로 주입했습니다!");
  } else {
    console.log("ℹ️ 이미 매니페스트 태그가 존재합니다.");
  }
} else {
  console.error("❌ dist/index.html 파일을 찾을 수 없습니다.");
}
