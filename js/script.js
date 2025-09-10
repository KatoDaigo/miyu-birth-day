// スライドショーとアニメーションの制御
document.addEventListener('DOMContentLoaded', function() {
    const startScreen = document.getElementById('start-screen');
    const letsGoBtn = document.getElementById('lets-go-btn');
    const openingScreen = document.getElementById('opening-screen');
    const slides = document.querySelectorAll('.slide');
    const slideshowContainer = document.getElementById('slideshow-container');
    const finalMessage = document.getElementById('final-message');
    const journeyButton = document.getElementById('start-journey');
    const skipButtonStart = document.getElementById('skip-to-itinerary-start');
    const passwordModal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmit = document.getElementById('password-submit');
    const passwordError = document.getElementById('password-error');
    const mainContent = document.getElementById('main-content');
    const backgroundMusic = document.getElementById('background-music');
    
    let currentSlide = 0;
    const slideInterval = 2000; // 2秒間隔
    const correctPassword = '20231222'; // パスワード設定（変更可能）
    
    // スライドショー開始
    function startSlideshow() {
        const slideTimer = setInterval(() => {
            // 現在のスライドを非アクティブに
            slides[currentSlide].classList.remove('active');
            
            // 次のスライドに移動
            currentSlide++;
            
            // 全スライド終了後の処理
            if (currentSlide >= slides.length) {
                clearInterval(slideTimer);
                setTimeout(showFinalMessage, 500);
                return;
            }
            
            // 次のスライドをアクティブに
            slides[currentSlide].classList.add('active');
        }, slideInterval);
    }
    
    // 最終メッセージとボタンを表示
    function showFinalMessage() {
        slideshowContainer.style.opacity = '0';
        setTimeout(() => {
            slideshowContainer.classList.add('hidden');
            finalMessage.classList.remove('hidden');
            finalMessage.classList.add('show');
        }, 1000);
    }
    
    // 「最高な2日間の旅へ」ボタンのクリック処理
    journeyButton.addEventListener('click', function() {
        passwordModal.classList.remove('hidden');
        passwordInput.focus();
    });
    
    
    // スキップボタン（スタート画面）のクリック処理
    skipButtonStart.addEventListener('click', function() {
        passwordModal.classList.remove('hidden');
        passwordInput.focus();
    });
    
    // パスワード確認ボタンのクリック処理
    passwordSubmit.addEventListener('click', function() {
        checkPassword();
    });
    
    // Enterキーでパスワード確認
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    
    // パスワード確認処理
    function checkPassword() {
        const inputPassword = passwordInput.value.trim();
        
        if (inputPassword === correctPassword) {
            // パスワード正解
            passwordModal.classList.add('hidden');
            startScreen.classList.add('hidden');
            openingScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            document.body.style.overflow = 'auto';
        } else {
            // パスワード不正解
            passwordError.classList.remove('hidden');
            passwordInput.value = '';
            passwordInput.style.borderColor = '#ff4444';
            
            // エラーメッセージを3秒後に非表示
            setTimeout(() => {
                passwordError.classList.add('hidden');
                passwordInput.style.borderColor = '#ddd';
            }, 3000);
        }
    }
    
    // 背景動画の音量を0に（ミュート）
    const backgroundVideo = document.getElementById('background-video');
    backgroundVideo.volume = 0;
    
    // 背景音楽の設定
    backgroundMusic.volume = 0.7; // 音量を70%に設定
    backgroundMusic.preload = 'auto'; // 事前読み込み
    
    // 音楽を事前に読み込み準備
    backgroundMusic.addEventListener('canplaythrough', function() {
        console.log('音楽の読み込みが完了しました');
    });
    
    // 音楽再生の開始（即座に開始）
    function startBackgroundMusic() {
        // 音楽を即座に開始
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('音楽が開始されました');
            }).catch(error => {
                console.log('音楽の自動再生が無効です:', error);
                // 自動再生が失敗した場合の代替処理
                backgroundMusic.muted = true;
                backgroundMusic.play().then(() => {
                    setTimeout(() => {
                        backgroundMusic.muted = false;
                    }, 100);
                });
            });
        }
    }
    
    // Let's Go ボタンのクリック処理
    letsGoBtn.addEventListener('click', function() {
        // 音楽を最優先で開始（ユーザー操作によるものなので確実に再生される）
        backgroundMusic.currentTime = 0; // 最初から再生
        backgroundMusic.play();
        
        // 短い遅延後にUI変更
        setTimeout(() => {
            // スタート画面を非表示
            startScreen.classList.add('hidden');
            
            // オープニング画面を表示
            openingScreen.classList.remove('hidden');
            
            // 動画を開始
            const backgroundVideo = document.getElementById('background-video');
            backgroundVideo.play();
            
            // スライドショー開始
            setTimeout(startSlideshow, 200);
        }, 50);
    });
    
    // 開発用スキップボタンの処理（削除）
    // devSkipBtn.addEventListener('click', function() {
    //     // 直接旅程ページを表示
    //     startScreen.classList.add('hidden');
    //     openingScreen.classList.add('hidden');
    //     mainContent.classList.remove('hidden');
    //     document.body.style.overflow = 'auto';
    //     
    //     // 音楽を停止
    //     backgroundMusic.pause();
    //     backgroundMusic.currentTime = 0;
    //     
    //     console.log('開発用：旅程ページへスキップしました');
    // });
    
    // 背景画像のランダムな動きを追加
    function animateBackgroundImages() {
        const bgImages = document.querySelectorAll('.bg-img');
        
        bgImages.forEach((img, index) => {
            // ランダムな遅延で各画像をアニメーション
            setTimeout(() => {
                img.style.animationDelay = `${Math.random() * 2}s`;
            }, index * 500);
        });
    }
    
    // 背景画像アニメーション開始
    setTimeout(animateBackgroundImages, 5000);
    
    // 旅程ページのスクロールアニメーション
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // 旅程ページが表示された時にアニメーション設定
        const mainContent = document.getElementById('main-content');
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'class' && 
                    !mainContent.classList.contains('hidden')) {
                    
                    // アニメーション要素にスタイル設定
                    const animateElements = mainContent.querySelectorAll('.day-card, .timeline-item, .message-box');
                    animateElements.forEach((el, index) => {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(30px)';
                        el.style.transition = 'all 0.6s ease';
                        el.style.transitionDelay = `${index * 0.1}s`;
                        observer.observe(el);
                    });
                    
                    mutationObserver.disconnect();
                }
            });
        });

        mutationObserver.observe(mainContent, { attributes: true });
    }

    // スクロールアニメーション初期化
    initScrollAnimations();
    
    // ナビゲーション機能の初期化
    function initNavigation() {
        const fixedNav = document.getElementById('fixed-nav');
        const backToTopBtn = document.getElementById('back-to-top');
        const progressFill = document.querySelector('.progress-fill');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // スクロール監視
        function updateNavigation() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            // 固定ナビゲーションの表示/非表示
            if (scrollTop > 200) {
                fixedNav.classList.add('visible');
                backToTopBtn.classList.add('visible');
            } else {
                fixedNav.classList.remove('visible');
                backToTopBtn.classList.remove('visible');
            }
            
            // プログレスバーの更新
            progressFill.style.width = `${scrollPercent}%`;
            
            // アクティブセクションの更新
            updateActiveNavLink();
        }
        
        // アクティブナビリンクの更新
        function updateActiveNavLink() {
            const sections = ['top', 'day1', 'day2', 'checklist', 'qna', 'message'];
            let currentSection = 'top';
            
            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        currentSection = sectionId;
                    }
                }
            });
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href').substring(1);
                if (href === currentSection) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
        
        // スムーススクロール
        function smoothScrollTo(targetId) {
            const target = document.getElementById(targetId);
            if (target) {
                const offsetTop = targetId === 'top' ? 0 : target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        
        // イベントリスナーの設定
        window.addEventListener('scroll', updateNavigation);
        
        // ナビリンクのクリック処理
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                smoothScrollTo(targetId);
            });
        });
        
        // トップに戻るボタンのクリック処理
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // 旅程ページが表示された時にナビゲーション初期化
        const mainContent = document.getElementById('main-content');
        const navMutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'class' && 
                    !mainContent.classList.contains('hidden')) {
                    
                    // ナビゲーション要素を表示
                    fixedNav.classList.remove('hidden');
                    backToTopBtn.classList.remove('hidden');
                    
                    // 初期状態の更新
                    updateNavigation();
                    
                    navMutationObserver.disconnect();
                }
            });
        });

        navMutationObserver.observe(mainContent, { attributes: true });
    }
    
    // ナビゲーション機能を初期化
    initNavigation();
    
    // チェックリスト機能の初期化
    function initChecklist() {
        const checkboxes = document.querySelectorAll('.item-checkbox');
        const progressPercentage = document.getElementById('progress-percentage');
        const progressBarFill = document.getElementById('progress-bar-fill');
        const resetButton = document.getElementById('reset-checklist');
        
        // 進捗更新関数
        function updateProgress() {
            const totalItems = checkboxes.length;
            const checkedItems = document.querySelectorAll('.item-checkbox:checked').length;
            const percentage = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
            
            progressPercentage.textContent = percentage;
            progressBarFill.style.width = `${percentage}%`;
            
            // ローカルストレージに保存
            const checkedStates = Array.from(checkboxes).map(cb => cb.checked);
            localStorage.setItem('checklistStates', JSON.stringify(checkedStates));
        }
        
        // チェックボックス変更時の処理
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', updateProgress);
            
            // チェック時のアニメーション
            checkbox.addEventListener('change', function() {
                const item = this.closest('.checklist-item');
                if (this.checked) {
                    item.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        item.style.transform = 'scale(1)';
                    }, 200);
                }
            });
        });
        
        // リセットボタン
        resetButton.addEventListener('click', function() {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            updateProgress();
            
            // リセットアニメーション
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // ローカルストレージから状態を復元
        function loadChecklistStates() {
            const savedStates = localStorage.getItem('checklistStates');
            if (savedStates) {
                const states = JSON.parse(savedStates);
                checkboxes.forEach((checkbox, index) => {
                    if (states[index] !== undefined) {
                        checkbox.checked = states[index];
                    }
                });
                updateProgress();
            }
        }
        
        // 旅程ページが表示された時にチェックリスト機能を初期化
        const mainContent = document.getElementById('main-content');
        const checklistMutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'class' && 
                    !mainContent.classList.contains('hidden')) {
                    
                    loadChecklistStates();
                    checklistMutationObserver.disconnect();
                }
            });
        });

        checklistMutationObserver.observe(mainContent, { attributes: true });
    }
    
    // チェックリスト機能を初期化
    initChecklist();
    
    // アクティビティ詳細の展開機能
    function initActivityDetails() {
        const clickableCards = document.querySelectorAll('.activity-card.clickable');
        
        clickableCards.forEach(card => {
            // data-listenerを使って重複を防ぐ
            if (!card.dataset.listener) {
                card.addEventListener('click', function() {
                    const detailId = this.getAttribute('data-detail-id');
                    const detailElement = document.getElementById(detailId);
                    
                    if (detailElement) {
                        // 詳細の表示/非表示を切り替え
                        if (detailElement.classList.contains('hidden')) {
                            // 詳細を表示
                            detailElement.classList.remove('hidden');
                            this.classList.add('expanded');
                            
                            // スムーズにスクロール
                            setTimeout(() => {
                                detailElement.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'nearest'
                                });
                            }, 100);
                        } else {
                            // 詳細を非表示
                            detailElement.classList.add('hidden');
                            this.classList.remove('expanded');
                        }
                    }
                });
                card.dataset.listener = 'true';
            }
        });
    }
    
    // 旅程ページが表示された時にアクティビティ詳細機能を初期化
    const activityMutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && 
                mutation.attributeName === 'class' && 
                !mainContent.classList.contains('hidden')) {
                
                // アクティビティ詳細機能を初期化
                setTimeout(initActivityDetails, 100);
                activityMutationObserver.disconnect();
            }
        });
    });

    activityMutationObserver.observe(mainContent, { attributes: true });
    
    // 質問コーナーの展開機能
    function initQnA() {
        const qnaQuestions = document.querySelectorAll('.qna-question');
        
        qnaQuestions.forEach(question => {
            if (!question.dataset.qnaListener) {
                question.addEventListener('click', function() {
                    const qnaId = this.getAttribute('data-qna-id');
                    const answerElement = document.getElementById(qnaId);
                    
                    if (answerElement) {
                        // 回答の表示/非表示を切り替え
                        if (answerElement.classList.contains('hidden')) {
                            // 回答を表示
                            answerElement.classList.remove('hidden');
                            this.classList.add('expanded');
                        } else {
                            // 回答を非表示
                            answerElement.classList.add('hidden');
                            this.classList.remove('expanded');
                        }
                    }
                });
                question.dataset.qnaListener = 'true';
            }
        });
    }
    
    // 旅程ページが表示された時に質問コーナー機能を初期化
    const qnaMutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && 
                mutation.attributeName === 'class' && 
                !mainContent.classList.contains('hidden')) {
                
                setTimeout(initQnA, 100);
                qnaMutationObserver.disconnect();
            }
        });
    });

    qnaMutationObserver.observe(mainContent, { attributes: true });
    
    // 質問の回答保存機能
    function initAnswerSaving() {
        const answerInputs = document.querySelectorAll('.answer-input');
        
        answerInputs.forEach(input => {
            const questionId = input.getAttribute('data-question');
            
            // 保存された回答を読み込み
            const savedAnswer = localStorage.getItem(`qna-${questionId}`);
            if (savedAnswer) {
                input.value = savedAnswer;
            }
            
            // 入力時に保存
            input.addEventListener('input', function() {
                localStorage.setItem(`qna-${questionId}`, this.value);
            });
        });
    }
    
    // 旅程ページが表示された時に回答保存機能を初期化
    const answerMutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && 
                mutation.attributeName === 'class' && 
                !mainContent.classList.contains('hidden')) {
                
                setTimeout(initAnswerSaving, 100);
                answerMutationObserver.disconnect();
            }
        });
    });

    answerMutationObserver.observe(mainContent, { attributes: true });
    
    // 回答共有機能
    function initShareAnswers() {
        const shareButton = document.getElementById('share-answers-btn');
        
        if (shareButton) {
            shareButton.addEventListener('click', function() {
                // 全ての回答を取得
                const answers = {
                    'q1': localStorage.getItem('qna-q1') || '未回答',
                    'q2': localStorage.getItem('qna-q2') || '未回答',
                    'q3': localStorage.getItem('qna-q3') || '未回答',
                    'q4': localStorage.getItem('qna-q4') || '未回答',
                    'q5-restaurant': localStorage.getItem('qna-q5-restaurant') || '未回答',
                    'q5-reason': localStorage.getItem('qna-q5-reason') || '未回答'
                };
                
                // 既存の回答表示エリアを探す
                let answersDisplay = document.getElementById('answers-display');
                
                // 回答表示エリアがなければ作成
                if (!answersDisplay) {
                    answersDisplay = document.createElement('div');
                    answersDisplay.id = 'answers-display';
                    answersDisplay.className = 'answers-display';
                    shareButton.parentNode.insertBefore(answersDisplay, shareButton.nextSibling);
                }
                
                // 回答内容をHTMLで生成
                const answersHTML = `
                    <div class="answers-content">
                        <h4>美優ちゃんの誕生日旅行 - 質問への回答 📝</h4>
                        <div class="answer-item">
                            <div class="answer-question">🚗 運転はしたいですか？（ちょっとでも）</div>
                            <div class="answer-text">→ ${answers['q1']}</div>
                        </div>
                        <div class="answer-item">
                            <div class="answer-question">🍺 お酒は飲みたいですか？</div>
                            <div class="answer-text">→ ${answers['q2']}</div>
                        </div>
                        <div class="answer-item">
                            <div class="answer-question">👍 体調管理は万全ですか？</div>
                            <div class="answer-text">→ ${answers['q3']}</div>
                        </div>
                        <div class="answer-item">
                            <div class="answer-question">😊 楽しみですか？</div>
                            <div class="answer-text">→ ${answers['q4']}</div>
                        </div>
                        <div class="answer-item">
                            <div class="answer-question">🍽️ 二日目の夜ご飯は美優が考えてください</div>
                            <div class="answer-text">→ お店：${answers['q5-restaurant']}</div>
                            <div class="answer-text">→ 理由：${answers['q5-reason']}</div>
                        </div>
                        <div class="answer-footer">このメッセージは美優ちゃんの誕生日旅行サイトから生成されました 💕</div>
                    </div>
                `;
                
                // 回答表示エリアに内容を設定
                answersDisplay.innerHTML = answersHTML;
                
                // 表示を切り替える
                if (answersDisplay.style.display === 'none' || !answersDisplay.style.display) {
                    answersDisplay.style.display = 'block';
                    shareButton.textContent = '📋 回答を隠す';
                } else {
                    answersDisplay.style.display = 'none';
                    shareButton.textContent = '📋 回答を共有する';
                }
            });
        }
    }
    
    // 旅程ページが表示された時に回答共有機能を初期化
    const shareMutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && 
                mutation.attributeName === 'class' && 
                !mainContent.classList.contains('hidden')) {
                
                setTimeout(initShareAnswers, 100);
                shareMutationObserver.disconnect();
            }
        });
    });

    shareMutationObserver.observe(mainContent, { attributes: true });
    
    // ルートアニメーション機能
    function initRouteAnimation() {
        const routeOverview = document.querySelector('.route-overview');
        if (routeOverview) {
            // スクロール時にルート線のアニメーションをトリガー
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const pathLine = entry.target.querySelector('.path-line');
                        if (pathLine) {
                            pathLine.style.animation = 'none';
                            setTimeout(() => {
                                pathLine.style.animation = '';
                            }, 100);
                        }
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(routeOverview);
        }
    }
    
    // ルートアニメーション初期化
    initRouteAnimation();
    
    // 日本地図インタラクティブ機能
    function initJapanMap() {
        const mapPins = document.querySelectorAll('.map-pin');
        const japanOutline = document.querySelector('.japan-outline');
        
        // ピンにツールチップ効果
        mapPins.forEach(pin => {
            pin.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
            });
            
            pin.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            pin.addEventListener('click', function() {
                // クリック時のパルス効果
                const pulseCircle = this.querySelector('.pin-pulse');
                if (pulseCircle) {
                    pulseCircle.style.animation = 'none';
                    setTimeout(() => {
                        pulseCircle.style.animation = 'pinPulse 2s ease-in-out infinite';
                    }, 100);
                }
            });
        });
        
        // 地図がビューに入った時のアニメーション
        const mapContainer = document.querySelector('.japan-map-container');
        if (mapContainer) {
            const mapObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // 地図のフェードイン
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(20px)';
                        entry.target.style.transition = 'all 1s ease-out';
                        
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 100);
                        
                        // 車のアニメーションを再開始
                        const movingCar = document.querySelector('.moving-car');
                        if (movingCar) {
                            const animation = movingCar.querySelector('animateMotion');
                            if (animation) {
                                animation.beginElement();
                            }
                        }
                        
                        mapObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            mapObserver.observe(mapContainer);
        }
    }
    
    // 日本地図機能を初期化
    initJapanMap();
    
    // デバッグ用：パスワードをコンソールに表示（本番では削除）
    console.log('パスワード（デバッグ用）:', correctPassword);
});