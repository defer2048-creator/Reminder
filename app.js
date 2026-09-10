// 1. Register the background service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log("Service Worker Active"));
}

document.getElementById('remindBtn').addEventListener('click', async () => {
    // 2. Ask your Samsung tablet for permission
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
        alert("Permission granted! Wait 10 seconds...");
        
        // 3. Set a timer to trigger the notification
        setTimeout(() => {
            sendNotification();
        }, 10000); // 10000 milliseconds = 10 seconds
    } else {
        alert("You need to allow notifications for this to work.");
    }
});

function sendNotification() {
    // 4. Tell the service worker to display the alert
    navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('Reminder!', {
            body: 'This is your custom notification!',
            vibrate: [200, 100, 200] // Vibrates your tablet
        });
    });
}
