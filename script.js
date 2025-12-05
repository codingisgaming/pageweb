document.addEventListener('DOMContentLoaded', function () {
    const startContainer = document.getElementById('start-container');
    const startButton = document.getElementById('start-button');
    const chatContainer = document.getElementById('chat-container');
    const chatMessages = document.getElementById('chat-messages');
    const optionsContainer = document.getElementById('options-container');
    const exercisesContent = document.getElementById('exercises-content');

    let currentQuestionIndex = 0;
    let scores = { musculation: 0, pilates: 0, yoga: 0 };
    let quizStarted = false;
    let selectedAnswers = [];
    let recommendedCategory = '';

    const questionsData = {
        "questions": [
            {
                "question": "Quel est votre principal objectif sportif ?",
                "options": [
                    {
                        "text": "Je veux prendre du muscle et devenir plus fort",
                        "value": { "musculation": 3, "pilates": 1, "yoga": 0 }
                    },
                    {
                        "text": "Je cherche à améliorer ma posture et mon équilibre",
                        "value": { "musculation": 1, "pilates": 3, "yoga": 2 }
                    },
                    {
                        "text": "Je veux me détendre et réduire mon stress",
                        "value": { "musculation": 0, "pilates": 2, "yoga": 3 }
                    },
                    {
                        "text": "Je veux un peu de tout : force, souplesse et bien-être",
                        "value": { "musculation": 2, "pilates": 2, "yoga": 2 }
                    }
                ]
            },
            {
                "question": "Combien de temps pouvez-vous consacrer à l'entraînement par semaine ?",
                "options": [
                    {
                        "text": "1-2 fois par semaine",
                        "value": { "musculation": 1, "pilates": 2, "yoga": 3 }
                    },
                    {
                        "text": "3-4 fois par semaine",
                        "value": { "musculation": 3, "pilates": 2, "yoga": 1 }
                    },
                    {
                        "text": "5 fois ou plus par semaine",
                        "value": { "musculation": 2, "pilates": 3, "yoga": 2 }
                    },
                    {
                        "text": "Je préfère des séances courtes mais quotidiennes",
                        "value": { "musculation": 1, "pilates": 2, "yoga": 3 }
                    }
                ]
            },
            {
                "question": "Quelle est votre expérience en sport ?",
                "options": [
                    {
                        "text": "Débutant complet",
                        "value": { "musculation": 1, "pilates": 3, "yoga": 2 }
                    },
                    {
                        "text": "J'ai déjà pratiqué occasionnellement",
                        "value": { "musculation": 2, "pilates": 2, "yoga": 2 }
                    },
                    {
                        "text": "Je pratique régulièrement depuis quelques années",
                        "value": { "musculation": 3, "pilates": 2, "yoga": 1 }
                    },
                    {
                        "text": "Je suis un sportif confirmé",
                        "value": { "musculation": 3, "pilates": 1, "yoga": 0 }
                    }
                ]
            },
            {
                "question": "Quel type d'environnement préférez-vous ?",
                "options": [
                    {
                        "text": "Une salle de sport bien équipée",
                        "value": { "musculation": 3, "pilates": 1, "yoga": 0 }
                    },
                    {
                        "text": "Un espace calme avec des tapis",
                        "value": { "musculation": 1, "pilates": 3, "yoga": 2 }
                    },
                    {
                        "text": "En plein air ou dans mon salon",
                        "value": { "musculation": 1, "pilates": 2, "yoga": 3 }
                    },
                    {
                        "text": "Peu importe tant que je peux bouger",
                        "value": { "musculation": 2, "pilates": 2, "yoga": 2 }
                    }
                ]
            },
            {
                "question": "Que recherchez-vous principalement dans une séance ?",
                "options": [
                    {
                        "text": "Un bon défi physique et transpirer",
                        "value": { "musculation": 3, "pilates": 1, "yoga": 0 }
                    },
                    {
                        "text": "Un travail précis sur la posture et le contrôle",
                        "value": { "musculation": 1, "pilates": 3, "yoga": 1 }
                    },
                    {
                        "text": "De la relaxation et un bien-être mental",
                        "value": { "musculation": 0, "pilates": 2, "yoga": 3 }
                    },
                    {
                        "text": "Un mélange équilibré d'effort et de détente",
                        "value": { "musculation": 2, "pilates": 2, "yoga": 2 }
                    }
                ]
            }
        ]
    };

    setTimeout(() => {
        if (typeof mouvementsData !== 'undefined') {
            displayDefaultExercises();
        } else {
            console.error('mouvementsData n\'est pas défini');
            displayFallbackExercises();
        }
    }, 100);

    startButton.addEventListener('click', startQuiz);

    function addCoachMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message coach';

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = '<div class="obelix-icon-2"></div>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        const textP = document.createElement('p');
        textP.textContent = text;

        contentDiv.appendChild(textP);
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.textContent = '👤';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        const textP = document.createElement('p');
        textP.textContent = text;

        contentDiv.appendChild(textP);
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function displayFallbackExercises() {
        exercisesContent.innerHTML = `
            <div class="exercises-default">
                <h2 class="exercises-subtitle">Exercices de démonstration</h2>
                <div class="exercises-simple-list">
                    <div class="exercise-simple">
                        <div class="exercise-simple-header">
                            <span class="exercise-icon">💪</span>
                            <span class="exercise-title">Pompes</span>
                            <span class="exercise-category">Musculation</span>
                        </div>
                        <div class="exercise-simple-desc">
                            Exercice classique pour renforcer les pectoraux et les bras
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function displayDefaultExercises() {
        if (!mouvementsData) {
            displayFallbackExercises();
            return;
        }

        exercisesContent.innerHTML = '';

        const defaultContainer = document.createElement('div');
        defaultContainer.className = 'exercises-default';

        const subtitle = document.createElement('h2');
        subtitle.className = 'exercises-subtitle';
        subtitle.textContent = 'Découvrez ces exercices populaires !';
        defaultContainer.appendChild(subtitle);

        const exercisesList = document.createElement('div');
        exercisesList.className = 'exercises-simple-list';

        if (mouvementsData.musculation && mouvementsData.musculation.length > 0) {
            displaySimpleExercise(mouvementsData.musculation[0], 'musculation', exercisesList);
        }
        
        if (mouvementsData.pilates && mouvementsData.pilates.length > 0) {
            displaySimpleExercise(mouvementsData.pilates[0], 'pilates', exercisesList);
        }
        
        if (mouvementsData.yoga && mouvementsData.yoga.length > 0) {
            displaySimpleExercise(mouvementsData.yoga[0], 'yoga', exercisesList);
        }

        defaultContainer.appendChild(exercisesList);
        exercisesContent.appendChild(defaultContainer);
    }

    function displaySimpleExercise(exercise, category, container) {
        if (!exercise) return;

        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'exercise-simple';

        const categoryIcons = {
            'musculation': '💪',
            'pilates': '🧘',
            'yoga': '🌸'
        };

        const categoryNames = {
            'musculation': 'Musculation',
            'pilates': 'Pilates',
            'yoga': 'Yoga'
        };

        const headerDiv = document.createElement('div');
        headerDiv.className = 'exercise-simple-header';
        headerDiv.innerHTML = `<span class="exercise-icon">${categoryIcons[category]}</span>
                              <span class="exercise-title">${exercise.name || 'Exercice'}</span>
                              <span class="exercise-category">${categoryNames[category]}</span>`;
        exerciseDiv.appendChild(headerDiv);

        if (exercise.description) {
            const descDiv = document.createElement('div');
            descDiv.className = 'exercise-simple-desc';
            descDiv.textContent = exercise.description;
            exerciseDiv.appendChild(descDiv);
        }

        if (exercise.difficulty || exercise.sets || exercise.duration) {
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'exercise-simple-details';

            if (exercise.difficulty) {
                const difficultySpan = document.createElement('span');
                difficultySpan.className = 'exercise-detail';
                difficultySpan.textContent = `Difficulté : ${getDifficultyText(exercise.difficulty)}`;
                detailsDiv.appendChild(difficultySpan);
            }

            if (category === 'yoga' && exercise.duration) {
                const durationSpan = document.createElement('span');
                durationSpan.className = 'exercise-detail';
                durationSpan.textContent = `Durée : ${exercise.duration}`;
                detailsDiv.appendChild(durationSpan);
            } else if (exercise.sets) {
                const setsSpan = document.createElement('span');
                setsSpan.className = 'exercise-detail';
                setsSpan.textContent = `Séries : ${exercise.sets}`;
                detailsDiv.appendChild(setsSpan);
            }

            exerciseDiv.appendChild(detailsDiv);
        }

        if (exercise.instructions) {
            const instructionsDiv = document.createElement('div');
            instructionsDiv.className = 'exercise-simple-instructions';

            if (exercise.instructions.position_initiale) {
                const positionTitle = document.createElement('div');
                positionTitle.className = 'instruction-title';
                positionTitle.textContent = 'Position initiale :';
                instructionsDiv.appendChild(positionTitle);

                const positionText = document.createElement('div');
                positionText.className = 'instruction-text';
                positionText.textContent = exercise.instructions.position_initiale;
                instructionsDiv.appendChild(positionText);
            }

            if (exercise.instructions.execution) {
                const executionTitle = document.createElement('div');
                executionTitle.className = 'instruction-title';
                executionTitle.textContent = 'Exécution :';
                instructionsDiv.appendChild(executionTitle);

                const executionText = document.createElement('div');
                executionText.className = 'instruction-text';
                executionText.textContent = exercise.instructions.execution;
                instructionsDiv.appendChild(executionText);
            }

            exerciseDiv.appendChild(instructionsDiv);
        }

        if (exercise.media) {
            createExerciseMedia(exercise, exerciseDiv);
        }

        container.appendChild(exerciseDiv);
    }

    function createExerciseMedia(exercise, container) {
        if (!exercise.media || !exercise.media.src) return;

        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'exercise-media-container';

        const mediaTitle = document.createElement('div');
        mediaTitle.className = 'media-title';
        
        if (exercise.media.type === 'video') {
            mediaTitle.textContent = '🎬 Démonstration vidéo :';
            createVideoMedia(exercise, mediaContainer);
        } else if (exercise.media.type === 'image') {
            mediaTitle.textContent = '🖼️ Illustration :';
            createImageMedia(exercise, mediaContainer);
        }
        
        mediaContainer.appendChild(mediaTitle);
        container.appendChild(mediaContainer);
    }

    function createVideoMedia(exercise, container) {
        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'media-wrapper video-wrapper';

        const video = document.createElement('video');
        video.className = 'exercise-video';
        video.src = exercise.media.src;
        video.preload = 'auto';
        video.playsInline = true;
        video.muted = false;
        video.volume = 0.7;
        video.controls = true;

        const loadingText = document.createElement('div');
        loadingText.className = 'media-loading';
        loadingText.textContent = 'Chargement de la vidéo...';
        videoWrapper.appendChild(loadingText);

        video.addEventListener('loadeddata', function () {
            loadingText.style.display = 'none';
            videoWrapper.appendChild(video);
        });

        video.addEventListener('error', function () {
            loadingText.textContent = 'Vidéo non disponible pour le moment';
            loadingText.style.color = '#ff6b6b';
        });

        container.appendChild(videoWrapper);

        const restartButton = document.createElement('button');
        restartButton.className = 'media-restart-button';
        restartButton.textContent = '🔄 Revoir la démonstration';
        restartButton.addEventListener('click', () => {
            video.currentTime = 0;
            video.play();
        });

        container.appendChild(restartButton);
    }

    function createImageMedia(exercise, container) {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'media-wrapper image-wrapper';

        const img = document.createElement('img');
        img.className = 'exercise-image';
        img.src = exercise.media.src;
        img.alt = `Illustration de l'exercice ${exercise.name}`;
        img.loading = 'lazy';

        const loadingText = document.createElement('div');
        loadingText.className = 'media-loading';
        loadingText.textContent = 'Chargement de l\'image...';
        imageWrapper.appendChild(loadingText);

        img.addEventListener('load', function () {
            loadingText.style.display = 'none';
            imageWrapper.appendChild(img);
        });

        img.addEventListener('error', function () {
            loadingText.textContent = 'Image non disponible pour le moment';
            loadingText.style.color = '#ff6b6b';
        });

        container.appendChild(imageWrapper);

        const enlargeButton = document.createElement('button');
        enlargeButton.className = 'media-enlarge-button';
        enlargeButton.textContent = '🔍 Agrandir l\'image';
        enlargeButton.addEventListener('click', () => {
            enlargeImage(img.src, exercise.name);
        });

        container.appendChild(enlargeButton);
    }

    function enlargeImage(src, title) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const closeButton = document.createElement('span');
        closeButton.className = 'modal-close';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = title;
        img.className = 'modal-image';
        
        const caption = document.createElement('div');
        caption.className = 'modal-caption';
        caption.textContent = title;
        
        modalContent.appendChild(closeButton);
        modalContent.appendChild(img);
        modalContent.appendChild(caption);
        modal.appendChild(modalContent);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        document.body.appendChild(modal);
    }

    function startQuiz() {
        if (quizStarted) return;

        quizStarted = true;
        currentQuestionIndex = 0;
        scores = { musculation: 0, pilates: 0, yoga: 0 };
        selectedAnswers = [];

        startContainer.style.display = 'none';
        chatContainer.style.display = 'block';

        chatMessages.innerHTML = '';
        optionsContainer.innerHTML = '';

        setTimeout(() => {
            addCoachMessage("Bonjour ! Je suis Obélix, votre coach sportif IA. Répondez à ces quelques questions pour que je puisse vous recommander les meilleurs exercices.");
            
            setTimeout(() => {
                showQuestion();
            }, 1000);
        }, 500);
    }

    function showQuestion() {
        if (!questionsData || !questionsData.questions) {
            addCoachMessage("Erreur : Les questions ne sont pas disponibles.");
            return;
        }

        if (currentQuestionIndex < questionsData.questions.length) {
            const currentQuestion = questionsData.questions[currentQuestionIndex];
            
            setTimeout(() => {
                addCoachMessage(currentQuestion.question);
                
                setTimeout(() => {
                    displayOptions(currentQuestion.options);
                }, 800);
            }, 500);
        } else {
            finishQuiz();
        }
    }

    function displayOptions(options) {
        if (!options || !Array.isArray(options)) {
            console.error('Options invalides:', options);
            return;
        }

        optionsContainer.innerHTML = '';
        optionsContainer.style.display = 'grid';

        options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option.text || 'Option';
            button.dataset.index = index;

            button.addEventListener('click', function() {
                handleOptionClick(option, this);
            });

            optionsContainer.appendChild(button);
        });
    }

    function handleOptionClick(option, button) {
        document.querySelectorAll('.option-button').forEach(btn => {
            btn.classList.remove('selected');
            btn.style.pointerEvents = 'none';
        });

        button.classList.add('selected');
        
        addUserMessage(option.text || 'Option');
        selectedAnswers[currentQuestionIndex] = option.text;
        
        if (option.value) {
            updateScores(option.value);
        }
        
        setTimeout(() => {
            currentQuestionIndex++;
            
            if (currentQuestionIndex < questionsData.questions.length) {
                showQuestion();
            } else {
                finishQuiz();
            }
        }, 1000);
    }

    function updateScores(optionValue) {
        if (!optionValue) return;
        
        if (optionValue.musculation !== undefined) scores.musculation += optionValue.musculation;
        if (optionValue.pilates !== undefined) scores.pilates += optionValue.pilates;
        if (optionValue.yoga !== undefined) scores.yoga += optionValue.yoga;
    }

    function finishQuiz() {
        optionsContainer.style.display = 'none';

        let highestScore = Math.max(scores.musculation, scores.pilates, scores.yoga);
        let recommendedCategories = [];

        if (scores.musculation === highestScore) recommendedCategories.push('musculation');
        if (scores.pilates === highestScore) recommendedCategories.push('pilates');
        if (scores.yoga === highestScore) recommendedCategories.push('yoga');

        if (recommendedCategories.length === 3) {
            recommendedCategory = 'all';
        } else if (recommendedCategories.length === 1) {
            recommendedCategory = recommendedCategories[0];
        } else {
            recommendedCategory = recommendedCategories[0];
        }

        setTimeout(() => {
            let resultMessage = "";
            const categoryNames = {
                'musculation': 'MUSCULATION',
                'pilates': 'PILATES',
                'yoga': 'YOGA',
                'all': 'TOUTES LES ACTIVITÉS'
            };

            resultMessage = `D'après vos réponses, vous êtes plutôt orienté vers la ${categoryNames[recommendedCategory]} !`;
            addCoachMessage(resultMessage);

            setTimeout(() => {
                displayScoresInChat();

                setTimeout(() => {
                    addCoachMessage("Voici vos exercices recommandés ! 👇");
                    displayRecommendedExercises();

                    setTimeout(() => {
                        addRestartButton();
                    }, 1000);
                }, 1500);
            }, 1500);
        }, 1000);
    }

    function displayScoresInChat() {
        const scoresDiv = document.createElement('div');
        scoresDiv.className = 'scores-summary';

        const scoresTitle = document.createElement('div');
        scoresTitle.className = 'scores-title';
        scoresTitle.textContent = 'Vos scores :';
        scoresDiv.appendChild(scoresTitle);

        const scoresGrid = document.createElement('div');
        scoresGrid.className = 'scores-grid';

        const createScoreItem = (label, value, icon) => {
            const item = document.createElement('div');
            item.className = 'score-item';

            const iconSpan = document.createElement('span');
            iconSpan.className = 'score-icon';
            iconSpan.textContent = icon;

            const labelSpan = document.createElement('span');
            labelSpan.className = 'score-label';
            labelSpan.textContent = label;

            const valueSpan = document.createElement('span');
            valueSpan.className = 'score-value';
            valueSpan.textContent = value;

            item.appendChild(iconSpan);
            item.appendChild(labelSpan);
            item.appendChild(valueSpan);

            return item;
        };

        scoresGrid.appendChild(createScoreItem('Musculation', scores.musculation, '💪'));
        scoresGrid.appendChild(createScoreItem('Pilates', scores.pilates, '🧘'));
        scoresGrid.appendChild(createScoreItem('Yoga', scores.yoga, '🌸'));

        scoresDiv.appendChild(scoresGrid);

        const coachMessage = document.createElement('div');
        coachMessage.className = 'message coach';

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.textContent = '📊';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.appendChild(scoresDiv);

        coachMessage.appendChild(avatarDiv);
        coachMessage.appendChild(contentDiv);

        chatMessages.appendChild(coachMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function displayRecommendedExercises() {
        exercisesContent.innerHTML = '';

        if (!mouvementsData) {
            addCoachMessage("Les données d'exercices ne sont pas disponibles.");
            return;
        }

        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'exercises-results';

        const resultsTitle = document.createElement('h2');
        resultsTitle.className = 'results-title';

        if (recommendedCategory === 'all') {
            resultsTitle.textContent = '🎯 VOUS AIMEZ TOUT ! Exercices variés recommandés :';
        } else if (recommendedCategory === 'musculation') {
            resultsTitle.textContent = '💪 VOUS ÊTES MUSCULATION ! Exercices recommandés :';
        } else if (recommendedCategory === 'pilates') {
            resultsTitle.textContent = '🧘 VOUS ÊTES PILATES ! Exercices recommandés :';
        } else if (recommendedCategory === 'yoga') {
            resultsTitle.textContent = '🌸 VOUS ÊTES YOGA ! Postures recommandées :';
        }

        resultsContainer.appendChild(resultsTitle);

        if (recommendedCategory === 'all') {
            ['musculation', 'pilates', 'yoga'].forEach(category => {
                if (mouvementsData[category]) {
                    const categoryTitle = document.createElement('h3');
                    categoryTitle.className = 'category-subtitle';

                    if (category === 'musculation') categoryTitle.textContent = '💪 EXERCICES DE MUSCULATION';
                    else if (category === 'pilates') categoryTitle.textContent = '🧘 EXERCICES DE PILATES';
                    else if (category === 'yoga') categoryTitle.textContent = '🌸 POSTURES DE YOGA';

                    resultsContainer.appendChild(categoryTitle);

                    mouvementsData[category].forEach(exercise => {
                        displaySimpleExercise(exercise, category, resultsContainer);
                    });
                }
            });
        } else if (mouvementsData[recommendedCategory]) {
            mouvementsData[recommendedCategory].forEach(exercise => {
                displaySimpleExercise(exercise, recommendedCategory, resultsContainer);
            });
        } else {
            resultsContainer.innerHTML += '<p>Aucun exercice disponible pour cette catégorie.</p>';
        }

        exercisesContent.appendChild(resultsContainer);

        setTimeout(() => {
            exercisesContent.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }

    function addRestartButton() {
        const restartDiv = document.createElement('div');
        restartDiv.className = 'restart-container';

        const restartButton = document.createElement('button');
        restartButton.className = 'restart-button';
        restartButton.textContent = '🔄 Recommencer le Quiz';
        restartButton.addEventListener('click', restartQuiz);

        restartDiv.appendChild(restartButton);
        chatMessages.appendChild(restartDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        scores = { musculation: 0, pilates: 0, yoga: 0 };
        quizStarted = false;
        selectedAnswers = [];
        recommendedCategory = '';

        document.querySelectorAll('.exercise-video').forEach(video => {
            video.pause();
            video.currentTime = 0;
        });

        document.querySelectorAll('.image-modal').forEach(modal => {
            modal.remove();
        });

        chatMessages.innerHTML = '';
        optionsContainer.innerHTML = '';
        exercisesContent.innerHTML = '';

        chatContainer.style.display = 'none';
        startContainer.style.display = 'block';

        displayDefaultExercises();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function getDifficultyText(difficulty) {
        switch (difficulty) {
            case 'beginner': return 'Débutant';
            case 'intermediate': return 'Intermédiaire';
            case 'advanced': return 'Avancé';
            default: return difficulty || 'Non spécifiée';
        }
    }
});