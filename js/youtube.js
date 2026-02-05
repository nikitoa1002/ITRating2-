// ВИДЕО
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

// Функция для извлечения ID из YouTube ссылки
function getYouTubeId(url) {
    try {
        // Обрабатываем разные форматы ссылок
        const urlObj = new URL(url);
        
        // Для ссылок вида https://www.youtube.com/watch?v=VIDEO_ID
        if (urlObj.hostname.includes('youtube.com') && urlObj.pathname === '/watch') {
            return urlObj.searchParams.get('v');
        }
        
        // Для ссылок вида https://youtu.be/VIDEO_ID
        if (urlObj.hostname === 'youtu.be') {
            return urlObj.pathname.substring(1);
        }
        
        return null;
    } catch (e) {
        console.error('Ошибка при обработке URL:', url, e);
        return null;
    }
}

// Создаем видео карточки
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

        // Используем запасные обложки если основная не работает
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        card.innerHTML = `
            <div class="video-thumbnail">
                <img src="${thumbnailUrl}" 
                     alt="${video.title}"
                     loading="lazy"
                     onerror="this.onerror=null; this.src='../images/video-placeholder.jpg';">
                <div class="play-btn">▶</div>
                <div class="video-duration">5:30</div>
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

        card.addEventListener('click', () => openVideoModal(videoId, video.title, video.description));
        grid.appendChild(card);
    });

    // Инициализируем WOW.js
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

    // Формируем правильную ссылку для iframe
    player.src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&enablejsapi=1`;
    modalTitle.textContent = title || 'Название видео';
    modalDesc.textContent = description || 'Описание видео';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрытие модального окна
function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoPlayer');

    if (modal && player) {
        modal.classList.remove('active');
        player.src = 'about:blank'; // Останавливаем видео
        document.body.style.overflow = '';
    }
}

// Поиск
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

    // Обработчики для модального окна
    const closeBtn = document.querySelector('.video-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeVideoModal);
    }

    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) {
                closeVideoModal();
            }
        });
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeVideoModal();
        }
    });
});