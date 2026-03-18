// --- 1. إعدادات وجلب أوقات الصلاة ---
function formatTime(time24) {
    let [hours, minutes] = time24.split(':');
    let period = 'ص';
    hours = parseInt(hours);
    if (hours >= 12) { period = 'م'; if (hours > 12) hours -= 12; }
    if (hours === 0) hours = 12;
    return `${hours}:${minutes} ${period}`;
}

async function fetchPrayerTimes() {
    try {
        const response = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Al Qahmah&country=Saudi Arabia&method=4');
        const data = await response.json();
        
        if(data.code === 200) {
            const timings = data.data.timings;
            const dateInfo = data.data.date;

            document.getElementById('gregorian-date').innerText = `${dateInfo.hijri.weekday.ar} - ${dateInfo.hijri.day} ${dateInfo.hijri.month.ar} ${dateInfo.hijri.year} هـ`;
            document.getElementById('fajr-time').innerText = formatTime(timings.Fajr);
            document.getElementById('sunrise-time').innerText = formatTime(timings.Sunrise);
            document.getElementById('dhuhr-time').innerText = formatTime(timings.Dhuhr);
            document.getElementById('asr-time').innerText = formatTime(timings.Asr);
            document.getElementById('maghrib-time').innerText = formatTime(timings.Maghrib);
            document.getElementById('isha-time').innerText = formatTime(timings.Isha);

            document.getElementById('loading').style.display = 'none';
            document.getElementById('prayers-container').style.display = 'grid';
        }
    } catch (error) {
        document.getElementById('loading').innerText = 'حدث خطأ في جلب أوقات الصلاة.';
    }
}

fetchPrayerTimes(); // تشغيل الدالة

// --- 2. كود التنقل بين الصفحات (الأزرار) ---
const menuItems = document.querySelectorAll('.menu-item');
const pages = document.querySelectorAll('.page-content');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.menu-item.active').classList.remove('active');
        item.classList.add('active');
        
        pages.forEach(page => page.style.display = 'none');
        
        const targetId = item.getAttribute('data-target');
        const targetPage = document.getElementById(targetId);
        if(targetPage) {
            targetPage.style.display = 'block';
        }
    });
});

// --- 3. كود تشغيل السبحة الإلكترونية ---
let currentCount = 0;
const countDisplay = document.getElementById('sebha-count');
const sebhaBtn = document.getElementById('sebha-click-btn');
const resetBtn = document.getElementById('sebha-reset-btn');

sebhaBtn.addEventListener('click', () => {
    currentCount++;
    countDisplay.innerText = currentCount;
});

resetBtn.addEventListener('click', () => {
    currentCount = 0;
    countDisplay.innerText = currentCount;
});