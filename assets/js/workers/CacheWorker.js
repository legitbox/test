// yoinked from mysterious places :3
// legitbox, if you see this masterpiece later down the line, rewrite it yourself - [legitbox]

const CACHE_NAMES = {
    LIBRARIES: 'lib-cache-v1',
    IMAGES: 'img-cache-v1'
};
const BASE_DIR = '/assets/libraries/';
const LIBRARY_FILES = [
    'cytoscape.min.js',
    'gridjs.umd.js',
    'highlight.min.js',
    'index.min.js',
    'wunderbaum.umd.min.js'
];

self.addEventListener('install', event => {
    const preCacheUrls = LIBRARY_FILES.map(file => BASE_DIR + file);

    event.waitUntil(
        caches.open(CACHE_NAMES.LIBRARIES)
            .then(cache => cache.addAll(preCacheUrls))
            .then(self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (!Object.values(CACHE_NAMES).includes(key)) {
                    return caches.delete(key);
                }
            })
        ))
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.startsWith(BASE_DIR)) {
        event.respondWith(
            caches.match(event.request)
                .then(cached => cached || fetchAndCache(event.request, CACHE_NAMES.LIBRARIES))
        );
    }
});

async function fetchAndCache(request, cacheName) {
    const response = await fetch(request);
    if (!response.ok) throw Error('Bad response');

    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
    return response;
}