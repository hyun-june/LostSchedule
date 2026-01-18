const fs = require("fs");
const path = require("path");

const indexPath = path.resolve(process.cwd(), "dist", "index.html");

if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, "utf8");

  // 이미 태그가 있다면 중복 추가 방지
  if (!html.includes('rel="manifest"')) {
    // </head> 태그 바로 직전에 매니페스트 태그 삽입
    const manifestTag =
      '\n    <link rel="manifest" href="/manifest.json" />\n    <meta name="theme-color" content="#ffc030" />';
    html = html.replace("</head>", manifestTag + "\n  </head>");

    fs.writeFileSync(indexPath, html, "utf8");
    console.log("✅ 매니페스트 주입 성공!");
  }
}
