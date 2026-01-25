const CACHE_NAME = "lostschedule-cache-v1";
const urlsToCache = ["/", "/index.html", "/favicon.png"];

// Install 이벤트: 캐시 생성 + 새 SW 즉시 활성화
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
  self.skipWaiting(); // 새 SW 즉시 활성화
});

// Activate 이벤트: 오래된 캐시 제거 + 모든 클라이언트 즉시 적용
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim(); // 기존 탭에 바로 적용
});

// Fetch 이벤트: JS 파일은 네트워크 우선, 나머지는 캐시 우선
self.addEventListener("fetch", (event) => {
  const requestUrl = event.request.url;

  if (requestUrl.endsWith(".js")) {
    // JS 파일은 항상 네트워크에서 가져옴
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request)),
    );
  } else {
    // HTML, CSS, 이미지 등은 캐시 우선
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => response || fetch(event.request)),
    );
  }
});
