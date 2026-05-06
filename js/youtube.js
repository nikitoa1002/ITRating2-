// Данные видео
const myVideos = [
    {
        url: "https://www.youtube.com/watch?v=RNz78grxVZI",
        title: "Город Витебск с высоты птичьего полёта",
        description: "Красивые дрон‑кадры, панорамы города, виды на храмы и набережную."
    },
    {
        url: "https://www.youtube.com/watch?v=UgaaXGi6JFE",
        title: "История Витебска",
        description: "История создания великого Витебска"
    },
    {
        url: "https://www.youtube.com/watch?v=0v1mNzSvvOM",
        title: "Витебск (1947) — архивные кадры",
        description: "Редкие исторические съёмки"
    },
    {
        url: "https://www.youtube.com/watch?v=AMeTmk3E44c",
        title: "Беларусь. Страна неповторимой архитектуры",
        description: "Документальный фильм о храмах, усадьбах, замках."
    },
];

// Получение ID видео из ссылки YouTube
function getYouTubeId(url) {
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname.includes('youtube.com') && urlObj.pathname === '/watch') {
            return urlObj.searchParams.get('v');
        }
        if (urlObj.hostname === 'youtu.be') {
            return urlObj.pathname.substring(1);
        }
        return null;
    } catch (e) {
        console.error('Ошибка при обработке URL:', url, e);
        return null;
    }
}

// Создание карточек видео
function createVideoCards() {
    const grid = document.getElementById('videosGrid');
    
    if (!grid) {
        console.error('Элемент videosGrid не найден!');
        return;
    }

    myVideos.forEach((video, index) => {
        const videoId = getYouTubeId(video.url);
        if (!videoId) {
            console.warn('Не удалось извлечь ID видео:', video.url);
            return;
        }

        const card = document.createElement('div');
        card.className = 'video-card wow animate__animated animate__fadeInUp';
        card.setAttribute('data-video-id', videoId);
        card.setAttribute('data-wow-delay', `${(index * 0.1).toFixed(1)}s`);
        card.setAttribute('role', 'listitem');

        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        card.innerHTML = `
            <div class="video-thumbnail" aria-hidden="true">
                <img src="${thumbnailUrl}" 
                     alt="Превью: ${video.title}"
                     loading="lazy"
                     onerror="this.onerror=null; this.src='../images/video-placeholder.jpg';">
                <div class="play-btn" aria-hidden="true">▶</div>
                <div class="video-duration" aria-hidden="true">5:30</div>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
                <div class="video-meta">
                    <span class="video-views">15K просмотров</span>
                    <span class="video-date">2 недели назад</span>
                </div>
            </div>
        `;

        card.setAttribute('tabindex', '0');
        card.addEventListener('click', () => openVideoModal(videoId, video.title, video.description));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openVideoModal(videoId, video.title, video.description);
            }
        });
        grid.appendChild(card);
    });

    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }
}

// Открытие модального окна
function openVideoModal(videoId, title, description) {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoPlayer');
    const modalTitle = document.getElementById('videoModalTitle');
    const modalDesc = document.getElementById('videoModalDescription');

    if (!modal || !player) {
        console.error('Модальное окно или плеер не найдены!');
        return;
    }

    player.src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&enablejsapi=1`;
    player.setAttribute('title', title || 'Видео об архитектуре Витебска');
    modalTitle.textContent = title || 'Название видео';
    modalDesc.textContent = description || 'Описание видео';
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.video-close');
    if (closeBtn) closeBtn.focus();

    trapFocusInModal(modal);
}

// Закрытие модального окна
function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoPlayer');

    if (modal && player) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        player.src = 'about:blank';
        document.body.style.overflow = '';
    }
}

// Блокировка фокуса внутри модалки
function trapFocusInModal(modal) {
    const focusable = modal.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handler(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === first) {
                last.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === last) {
                first.focus();
                e.preventDefault();
            }
        }
    }
    modal.addEventListener('keydown', handler);
    modal.addEventListener('transitionend', () => {
        if (!modal.classList.contains('active')) {
            modal.removeEventListener('keydown', handler);
        }
    });
}

// Поиск видео
const videoSearchInput = document.getElementById('videoSearch');
if (videoSearchInput) {
    videoSearchInput.addEventListener('input', function () {
        const term = this.value.toLowerCase().trim();
        document.querySelectorAll('.video-card').forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
            card.style.display = (title.includes(term) || desc.includes(term) || term === '') ? 'block' : 'none';
        });
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', function () {
    createVideoCards();

    const closeBtn = document.querySelector('.video-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeVideoModal);
    }

    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) closeVideoModal();
        });
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeVideoModal();
    });
});