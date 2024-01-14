function get_appcache_state() {
    var appCache = window.applicationCache;
    switch (appCache.status) {
        case appCache.UNCACHED: // UNCACHED == 0
            return 'UNCACHED';
            break;
        case appCache.IDLE: // IDLE == 1
            return 'IDLE';
            break;
        case appCache.CHECKING: // CHECKING == 2
            return 'CHECKING';
            break;
        case appCache.DOWNLOADING: // DOWNLOADING == 3
            return 'DOWNLOADING';
            break;
        case appCache.UPDATEREADY:  // UPDATEREADY == 4
            return 'UPDATEREADY';
            break;
        case appCache.OBSOLETE: // OBSOLETE == 5
            return 'OBSOLETE';
            break;
        default:
            return 'UKNOWN CACHE STATUS';
            break;
    };
}

function add_cache_event_toasts() {
    var appCache = window.applicationCache;
    
    if (!navigator.onLine) {
        showToast('Você está off-line');
    }

	if (appCache) {
		appCache.addEventListener('cached', function (e) {
			showToast('Finished caching site.');
		}, false);
	} else {
		console.error('Application Cache is not available.');
	}
	
    appCache.addEventListener('downloading', function (e) {
        showToast('Downloading new cache.');
    }, false);

    appCache.addEventListener('error', function (e) {
        if (navigator.onLine) {
            showToast('Error while caching site.', 5000);
        }
    }, false);

    appCache.addEventListener('noupdate', function (e) {
        showToast('Cache atualizada.');
    }, false);

    appCache.addEventListener('obsolete', function (e) {
        showToast('Site is obsolete.');
    }, false);

    appCache.addEventListener('updateready', function (e) {
        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
            showToast('The site was updated. Refresh to switch to updated version',8000);
        }
    }, false);

 }